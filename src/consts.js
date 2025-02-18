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
	/*
	{
		name: "groups",
		title: "Groups",
		newItemUrl: "/groups/new",
	},
	{
		name: "signup",
		title: "Sign-up forms",
		newItemUrl: "/signups/new",
	},
*/
	/*	{
		name: "alert",
		title: "Event Alerts",
		newItemUrl: "/signups/new",
	},*/
];

export const WidgetsNames = {
	[WT.calendar]: {
		title: "Calendars",
		singular: "Calendar",
	},
	[WT.groups]: {
		title: "Groups",
		singular: "Group",
	},
	[WT.signups]: {
		title: "Sign-up forms",
		singular: "Sign-up form",
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
	["groups"]: [
		{
			template: "card_view",
			label: "Cards",
		},
		{
			template: "two_col",
			label: "Simple list",
		},
		{
			template: "outlined",
			label: "Outlined",
		},
		{
			template: "mosaic",
			label: "Mosaic",
		},
	],
	["signup"]: [
		{
			template: "default",
			label: "Default",
		},
	],
	["alert"]: [
		{
			template: "default",
			label: "Default",
		},
	],
};
