import { ComponentMeta, ComponentStory } from "@storybook/react"

import NavigationItem from "./NavigationItem.component"

import Home from "@public/icons/home.svg"

export default {
  title: "Components/NavigationItem",
  component: NavigationItem,
  argTypes: {
    variant: {
      options: ["default", "compact"],
      control: { type: "radio" },
    },
    state: {
      options: ["normal", "active"],
      control: { type: "radio" },
    },
  },

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof NavigationItem>

const Template: ComponentStory<typeof NavigationItem> = (args) => (
  <div className="bg-blue-900 w-56 p-5">
    <NavigationItem {...args} />
  </div>
)

export const Default = Template.bind({})

Default.args = {
  href: "/",
  icon: Home,
  label: {
    id: "navbar.section.your_account.item.home",
    defaultMessage: "Home",
  },

  variant: "default",
  state: "normal",

  hasChevron: false,
  hasChevronFlipped: false,
}

export const Active = Template.bind({})

Active.args = {
  href: "/",
  icon: Home,
  label: {
    id: "navbar.section.your_account.item.home",
    defaultMessage: "Home",
  },

  variant: "default",
  state: "active",

  hasChevron: false,
  hasChevronFlipped: false,
}

export const WithChevron = Template.bind({})

WithChevron.args = {
  href: "/",
  icon: Home,
  label: {
    id: "navbar.section.your_account.item.home",
    defaultMessage: "Home",
  },

  variant: "default",
  state: "normal",

  hasChevron: true,
  hasChevronFlipped: false,
}

export const WithChevronFlipped = Template.bind({})

WithChevronFlipped.args = {
  href: "/",
  icon: Home,
  label: {
    id: "navbar.section.your_account.item.home",
    defaultMessage: "Home",
  },

  variant: "default",
  state: "normal",

  hasChevron: true,
  hasChevronFlipped: true,
}

export const Compact = Template.bind({})

Compact.args = {
  href: "/",
  label: {
    id: "navbar.section.your_account.item.home",
    defaultMessage: "Home",
  },

  variant: "compact",
  state: "normal",

  hasChevron: false,
  hasChevronFlipped: false,
}
