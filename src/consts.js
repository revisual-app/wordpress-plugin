export const WT = {
  calendar: "calendar",
  groups: "groups",
  signups: "signup",
};

export const AvailableWidgets = [
  {
    name: WT.calendar,
    title: "Calendars",
    newItemUrl: "/calendar/new",
  },
];

export const WidgetsNames = {
  [WT.calendar]: {
    title: "Calendars",
    singular: "Calendar",
  },
};

export const AvailableTemplates = {
  [WT.calendar]: [
    {
      template: "monthly_view",
      label: "Monthly view",
    },
    {
      template: "events_list",
      label: "Events list",
    },
    {
      template: "card_view",
      label: "Cards (grid)",
    },
    {
      template: "card_list",
      label: "Cards (list)",
    },
    {
      template: "card_slider",
      label: "Slider",
    },
    {
      template: "weekly_view",
      label: "Weekly view",
    },
    {
      template: "detailed_list",
      label: "Detailed list",
    },
    {
      template: "bubble",
      label: "Tiles",
    },
  ],
  ["alert"]: [
    {
      template: "default",
      label: "Default",
    },
  ],
};
