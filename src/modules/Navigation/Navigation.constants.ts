import { NavigationSection } from "./Navigation.types"

//import Lists from "@public/icons/bookmark.svg"
import Developers from "@public/icons/database.svg"
import Home from "@public/icons/home.svg"
import Investors from "@public/icons/investors.svg"
import Lenders from "@public/icons/lenders.svg"
import LiveProjects from "@public/icons/live-projects.svg"
import Projects from "@public/icons/projects.svg"

export const NAVIGATION_ITEMS: Array<NavigationSection> = [
  {
    header: {
      id: "navbar.section.your_account.header",
      defaultMessage: "Your account",
    },
    items: [
      {
        href: "/",
        icon: Home,
        label: {
          id: "navbar.section.your_account.item.home",
          defaultMessage: "Home",
        },
      },
      {
        href: "/your-projects",
        icon: Projects,
        label: {
          id: "navbar.section.your_account.item.your_projects",
          defaultMessage: "Your projects",
        },
      },
      // {
      //   href: "/lists",
      //   icon: Lists,
      //   label: {
      //     id: "navbar.section.your_account.item.lists",
      //   },
      // },
    ],
  },
  {
    header: {
      id: "navbar.section.database.header",
      defaultMessage: "Database",
    },
    items: [
      {
        icon: LiveProjects,
        label: {
          id: "navbar.section.database.item.live_projects",
          defaultMessage: "Live projects",
        },
        subItems: [
          {
            href: "/database/live-projects",
            label: {
              id: "navbar.section.database.item.live_projects.all_live_projects",
              defaultMessage: "All Live Projects",
            },
          },
          {
            href: "/database/live-projects?r.from=early_stage&p.page=1",
            matchStr: "early_stage",
            label: {
              id: "navbar.section.database.item.live_projects.early_stage",
              defaultMessage: "Early Stage & RTB",
            },
          },
          {
            href: "/database/live-projects?r.from=equity_raises&p.page=1",
            matchStr: "equity_raises",
            label: {
              id: "navbar.section.database.item.live_projects.equity_raises",
              defaultMessage: "Equity raises & M&A",
            },
          },
          {
            href: "/database/live-projects?r.from=debt_raises&p.page=1",
            matchStr: "debt_raises",
            label: {
              id: "navbar.section.database.item.live_projects.debt_raises",
              defaultMessage: "Debt raises",
            },
          },
          {
            href: "/database/live-projects?r.from=europe&p.page=1",
            matchStr: "europe",
            label: {
              id: "navbar.section.database.item.live_projects.europe",
              defaultMessage: "Europe",
            },
          },
          {
            href: "/database/live-projects?r.from=frontier_markets&p.page=1",
            matchStr: "frontier_markets",
            label: {
              id: "navbar.section.database.item.live_projects.frontier_markets",
              defaultMessage: "Frontier Markets",
            },
          },
        ],
      },
      {
        icon: Developers,
        label: {
          id: "navbar.section.database.item.developers",
          defaultMessage: "Developers",
        },
        subItems: [
          {
            href: "/database/developers",
            label: {
              id: "navbar.section.database.item.developers.sub_item.all_developers",
              defaultMessage: "All Developers",
            },
          },
          {
            href: `/database/developers?f.founded=2010%2C${new Date().getFullYear()}&f.headcount=0%2C1%2C2&f.technologies=0%2C1&r.from=early_stage_rtb&p.page=1`,
            matchStr: "early_stage_rtb",
            label: {
              id: "navbar.section.database.item.developers.sub_item.early_stage",
              defaultMessage: "Early Stage & RTB",
            },
          },
          {
            href: "/database/developers?f.headcount=5%2C6%2C7%2C8&f.technologies=0%2C1&r.from=renewable_majors&p.page=1",
            matchStr: "renewable_majors",
            label: {
              id: "navbar.section.database.item.developers.sub_item.renewable_majors",
              defaultMessage: "Renewable Majors",
            },
          },
          {
            href: "/database/developers?f.technologies=0&r.from=solar_pv&p.page=1",
            matchStr: "solar_pv",
            label: {
              id: "navbar.section.database.item.developers.sub_item.solar_pv",
              defaultMessage: "Solar PV",
            },
          },
          {
            href: "/database/developers?f.technologies=1%2C2%2C3%2C4%2C5&r.from=other_renewables&p.page=1",
            matchStr: "other_renewables",
            label: {
              id: "navbar.section.database.item.developers.sub_item.other_renewables",
              defaultMessage: "Other Renewables",
            },
          },
        ],
      },
      {
        icon: Investors,
        label: {
          id: "navbar.section.database.item.investors",
          defaultMessage: "Investors",
        },
        subItems: [
          {
            href: "/database/investors",
            label: {
              id: "navbar.section.database.item.investors",
              defaultMessage: "Investors",
            },
          },
        ],
      },
      {
        icon: Lenders,
        label: {
          id: "navbar.section.database.item.lenders",
          defaultMessage: "Lenders",
        },
        subItems: [
          {
            href: "/database/lenders",
            label: {
              id: "navbar.section.database.item.lenders",
              defaultMessage: "Investors",
            },
          },
        ],
      },
    ],
  },
]
