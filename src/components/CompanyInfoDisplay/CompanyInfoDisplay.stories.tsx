import { ComponentMeta, ComponentStory } from "@storybook/react"

import CompanyInfoDisplay from "./CompanyInfoDisplay.component"

export default {
  title: "Components/CompanyInfoDisplay",
  component: CompanyInfoDisplay,
  argTypes: {
    variant: {
      control: "select",
      options: ["news-post", "company-info"],
      defaultValue: "news-post",
    },
    imageUrl: {
      control: "text",
      defaultValue:
        "https://www.kindpng.com/picc/m/341-3418555_logo-ideas-for-graphic-designers-graphic-design-company.png",
    },
    date: {
      control: "text",
      defaultValue: "",
    },
    companyProfileId: {
      control: "text",
      defaultValue: "",
    },
    linkedInUrl: {
      control: "text",
      defaultValue: "",
    },
    className: {
      control: "text",
      defaultValue: "",
    },
  },

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof CompanyInfoDisplay>

const Template: ComponentStory<typeof CompanyInfoDisplay> = (args) => (
  <div className="bg-blue-100 p-16">
    <CompanyInfoDisplay {...args} />
  </div>
)

export const NewsPost = Template.bind({})

NewsPost.args = {
  heading: "3i Infrastructure Sells a Piece of ESVAGT to Investors",
  date: "25 May",
  externalLink: "https://swfinstitute.org/",
  children: "Soverign Wealth Fund Institute",
}

export const CompanyInfoWithCompanyProfileAction = Template.bind({})

CompanyInfoWithCompanyProfileAction.args = {
  heading: "Acciona Energía",
  subHeading: "DEVELOPER",
  companyProfileId: "test",
  children:
    "Leading the change toward a decarbonized energy model. #NewEnergyforABetterPlanet",
}

export const CompanyInfoWithCompanyLinkedInAction = Template.bind({})

CompanyInfoWithCompanyLinkedInAction.args = {
  heading: "Anesco Holdings",
  subHeading: "DEVELOPER",
  linkedInUrl: "test",
  children:
    "Leading the change toward a decarbonized energy model. #NewEnergyforABetterPlanet",
}
