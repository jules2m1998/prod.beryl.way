export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  svgIcon?: string;
  fontIcon?: string;
  sub?: Array<MenuItem>;
}

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "dashboard",
        route: "/dashboard",
        svgIcon: "/media/icons/duotune/art/art002.svg",
        fontIcon: "bi-app-indicator",
      },
      {
        heading: "unboardingRequest",
        route: "/onboarding-request",
        svgIcon: "/media/icons/duotune/arrows/arr033.svg",
        fontIcon: "bi-layers",
      },
      {
        heading: "credit",
        route: "/credit",
        svgIcon: "/media/icons/duotune/finance/fin002.svg",
        fontIcon: "bi-layers",
      },
      {
        heading: "agency",
        route: "/agency",
        svgIcon: "/media/icons/duotune/maps/map008.svg",
        fontIcon: "bi-layers",
      },
      {
        heading: "complaint",
        route: "/complaints",
        svgIcon: "/media/icons/duotune/medicine/med010.svg",
        fontIcon: "bi-layers",
      },
      {
        heading: "user",
        route: "/users",
        svgIcon: "/media/icons/duotune/communication/com014.svg",
        fontIcon: "bi-layers",
      },
      {
        sectionTitle: "zone",
        route: "/zone",
        svgIcon: "/media/icons/duotune//maps/map002.svg",
        fontIcon: "bi-archive",
        sub: [
          {
            heading: "List",
            route: "/zone",
          },
          {
            heading: "Create",
            route: "/zone/create",
          },
          {
            sectionTitle: "type zone",
            route: "/zone/type",
            sub: [
              {
                heading: "List",
                route: "/zone/type",
              },
              {
                heading: "Create",
                route: "/zone/type/create",
              },
            ],
          },
        ],
      },
      {
        heading: "serviceTitle",
        route: "/services",
        svgIcon: "/media/icons/duotune/medicine/med010.svg",
        fontIcon: "bi-layers",
      },
      {
        sectionTitle: "Dates",
        route: "/calendar",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi-archive",
        sub: [
          {
            heading: "calendar",
            route: "/calendar",
          },
          {
            heading: "Slots list",
            route: "/slot-list",
          },
          {
            heading: "Appointment list",
            route: "/appointment-list",
          },
        ],
      },
      {
        heading: "question",
        route: "/questions",
        svgIcon: "/media/icons/duotune/general/gen046.svg",
        fontIcon: "bi-layers",
      },
      {
        heading: "chat",
        route: "/chat",
        svgIcon: "/media/icons/duotune/communication/com007.svg",
        fontIcon: "bi-layers",
      },
    ],
  },
];

export default MainMenuConfig;
