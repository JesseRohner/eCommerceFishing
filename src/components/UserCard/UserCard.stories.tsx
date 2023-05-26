import { ComponentMeta, ComponentStory } from "@storybook/react"

import UserCard from "./UserCard.component"

export default {
  title: "Components/UserCard",
  component: UserCard,
  argTypes: {
    variant: {
      control: "select",
      options: ["compact", "compact-2", "card"],
      defaultValue: "compact",
    },
    colourScheme: {
      control: "select",
      options: ["dark-blue", "white"],
      defaultValue: "dark-blue",
    },
    borderStyle: {
      control: "select",
      options: ["top", "full"],
      defaultValue: "full",
    },
    isRounded: {
      control: "boolean",
      defaultValue: false,
    },
    isBordered: {
      control: "boolean",
      defaultValue: false,
    },
    displayBadge: {
      control: "boolean",
      defaultValue: false,
    },
    displayLinkedIn: {
      control: "boolean",
      defaultValue: false,
    },
    disableHover: {
      control: "boolean",
      defaultValue: false,
    },
    className: {
      control: "text",
      defaultValue: "",
    },
    onClick: { action: "clicked" },
  },

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof UserCard>

const Template: ComponentStory<typeof UserCard> = (args) => (
  <div className="flex flex-col space-y-2">
    <div className="max-w-xs mx-auto">
      <UserCard {...args} />
    </div>

    <div className="flex space-x-2">
      <UserCard
        {...args}
        colourScheme="dark-blue"
        displayBadge={false}
        displayLinkedIn={false}
      />
      <UserCard
        {...args}
        colourScheme="white"
        displayBadge={false}
        displayLinkedIn={false}
      />
    </div>

    <div className="flex space-x-2">
      <UserCard
        {...args}
        colourScheme="dark-blue"
        displayBadge
        displayLinkedIn={false}
      />
      <UserCard
        {...args}
        colourScheme="white"
        displayBadge
        displayLinkedIn={false}
      />
    </div>

    <div className="flex space-x-2">
      <UserCard
        {...args}
        colourScheme="dark-blue"
        displayBadge
        displayLinkedIn
      />
      <UserCard {...args} colourScheme="white" displayBadge displayLinkedIn />
    </div>
  </div>
)

export const Compact = Template.bind({})

Compact.args = {
  variant: "compact",
}

export const Compact2 = Template.bind({})

Compact2.args = {
  variant: "compact-2",
}

export const Card = Template.bind({})

Card.args = {
  variant: "card",
}

export const Round = Template.bind({})

Round.args = {
  isRounded: true,
}

export const WithBorder = Template.bind({})

WithBorder.args = {
  isBordered: true,
}

export const WithBorderTop = Template.bind({})

WithBorderTop.args = {
  borderStyle: "top",

  isBordered: true,
}
