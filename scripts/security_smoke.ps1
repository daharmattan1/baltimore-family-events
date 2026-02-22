param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

function Invoke-Check {
  param(
    [string]$Name,
    [scriptblock]$Action,
    [int[]]$ExpectedStatusCodes
  )

  try {
    $statusCode = & $Action
    if ($ExpectedStatusCodes -contains $statusCode) {
      Write-Host "PASS [$statusCode] $Name" -ForegroundColor Green
      return $true
    }

    Write-Host "FAIL [$statusCode] $Name (expected: $($ExpectedStatusCodes -join ', '))" -ForegroundColor Red
    return $false
  }
  catch {
    Write-Host "FAIL [error] $Name :: $($_.Exception.Message)" -ForegroundColor Red
    return $false
  }
}

function Get-StatusCode {
  param(
    [string]$Method,
    [string]$Url,
    [hashtable]$Headers,
    [string]$Body
  )

  try {
    $params = @{
      Method = $Method
      Uri = $Url
      Headers = $Headers
      SkipHttpErrorCheck = $true
    }

    if ($Body) {
      $params["Body"] = $Body
    }

    $response = Invoke-WebRequest @params
    return [int]$response.StatusCode
  }
  catch {
    if ($_.Exception.Response -and $_.Exception.Response.StatusCode) {
      return [int]$_.Exception.Response.StatusCode
    }
    throw
  }
}

$checks = @()

$checks += Invoke-Check -Name "GET /api/debug is not publicly accessible" -ExpectedStatusCodes @(401, 404) -Action {
  Get-StatusCode -Method "GET" -Url "$BaseUrl/api/debug" -Headers @{} -Body $null
}

$checks += Invoke-Check -Name "GET /api/events rejects oversized limit" -ExpectedStatusCodes @(400) -Action {
  Get-StatusCode -Method "GET" -Url "$BaseUrl/api/events?limit=99999" -Headers @{} -Body $null
}

$checks += Invoke-Check -Name "GET /api/events rejects malformed date" -ExpectedStatusCodes @(400) -Action {
  Get-StatusCode -Method "GET" -Url "$BaseUrl/api/events?startDate=not-a-date" -Headers @{} -Body $null
}

$checks += Invoke-Check -Name "GET /api/events rejects impossible date range" -ExpectedStatusCodes @(400) -Action {
  Get-StatusCode -Method "GET" -Url "$BaseUrl/api/events?startDate=2026-03-10&endDate=2026-02-01" -Headers @{} -Body $null
}

$checks += Invoke-Check -Name "POST /api/subscribe enforces JSON content type" -ExpectedStatusCodes @(415) -Action {
  Get-StatusCode -Method "POST" -Url "$BaseUrl/api/subscribe" -Headers @{} -Body "email=test@example.com"
}

$checks += Invoke-Check -Name "POST /api/subscribe rejects honeypot submissions" -ExpectedStatusCodes @(400) -Action {
  $body = @{ email = "test@example.com"; website = "bot-filled" } | ConvertTo-Json -Compress
  Get-StatusCode -Method "POST" -Url "$BaseUrl/api/subscribe" -Headers @{ "Content-Type" = "application/json" } -Body $body
}

$checks += Invoke-Check -Name "POST /api/subscribe throttles repeated abuse" -ExpectedStatusCodes @(429) -Action {
  $last = 0
  for ($i = 0; $i -lt 12; $i++) {
    $body = @{ email = "invalid-email"; website = "" } | ConvertTo-Json -Compress
    $last = Get-StatusCode -Method "POST" -Url "$BaseUrl/api/subscribe" -Headers @{ "Content-Type" = "application/json" } -Body $body
    if ($last -eq 429) {
      break
    }
  }
  $last
}

$passCount = ($checks | Where-Object { $_ -eq $true }).Count
$totalCount = $checks.Count
$failCount = $totalCount - $passCount

Write-Host "`nSecurity smoke summary: $passCount/$totalCount passed, $failCount failed." -ForegroundColor Cyan

if ($failCount -gt 0) {
  exit 1
}

exit 0
