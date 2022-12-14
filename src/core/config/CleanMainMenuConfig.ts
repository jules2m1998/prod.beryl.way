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
        route: "/unboarding-request",
        svgIcon: "/media/icons/duotune/general/gen026.svg",
        fontIcon: "bi-layers",
      },
      {
        heading: "credit",
        route: "/builder",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-layers",
      },
      {
        heading: "agency",
        route: "/builder",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-layers",
      },
      {
        heading: "complaint",
        route: "/builder",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-layers",
      },
      {
        heading: "user",
        route: "/builder",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-layers",
      },
      {
        heading: "question",
        route: "/builder",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-layers",
      },
    ],
  },
];

export default MainMenuConfig;
