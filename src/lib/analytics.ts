type SubscribeFormSubmitPayload = {
  method: string;
};

type CalendarFilterChangePayload = {
  filter_type: string;
  filter_value: string;
  action: "apply" | "clear";
};

type NewsletterClickPayload = {
  newsletter_date: string;
  link_text: string;
};

type EventCardClickPayload = {
  event_name: string;
  event_date: string;
  event_source: string;
  is_free: boolean;
};

type VenueGroupPayload = {
  venue_name: string;
  event_count: number;
};

type VenueGroupEventClickPayload = {
  venue_name: string;
  event_count: number;
  clicked_event: string;
};

type AnalyticsEventMap = {
  subscribe_form_submit: SubscribeFormSubmitPayload;
  calendar_filter_change: CalendarFilterChangePayload;
  newsletter_click: NewsletterClickPayload;
  event_card_click: EventCardClickPayload;
  venue_group_expand: VenueGroupPayload;
  venue_group_collapse: VenueGroupPayload;
  venue_group_event_click: VenueGroupEventClickPayload;
};

type AnalyticsEvent = keyof AnalyticsEventMap;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushEvent<T extends AnalyticsEvent>(
  event: T,
  params: AnalyticsEventMap[T]
) {
  if (typeof window === "undefined" || !window.dataLayer) return;
  window.dataLayer.push({ event, ...params });
}
