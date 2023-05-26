import { ComponentMeta, ComponentStory } from "@storybook/react"

import BellIcon from "@public/icons/bell.svg"
import FiltersIcon from "@public/icons/filters.svg"

import Button from "./Button.component"

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    shape: {
      options: ["rectangle", "rectangle-2", "pill", "tab"],
      control: "select",
    },
    variant: {
      options: ["solid", "outline", "ghost"],
      control: "select",
    },
    colourScheme: {
      options: ["teal", "blue", "red", "white", "purple", "yellow", "darkBlue"],
      control: "select",
    },
    isLoading: {
      control: "boolean",
      defaultValue: false,
    },
    isDisabled: {
      control: "boolean",
      defaultValue: false,
    },
    onClick: {
      action: "clicked",
    },
    onCloseClick: {
      action: "clicked",
    },
  },

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = ({
  // @ts-ignore
  label = "Button",
  ...args
}) => (
  <div className="space-y-4 flex flex-col items-center">
    <Button {...args}>{label}</Button>

    <div style={{ width: "100%", height: 1, background: "#cfcfcf" }} />

    <div className="space-x-4">
      <Button {...args} colourScheme="teal" variant="solid">
        {label}
      </Button>

      <Button {...args} colourScheme="blue" variant="solid">
        {label}
      </Button>

      <Button {...args} colourScheme="red" variant="solid">
        {label}
      </Button>

      <Button {...args} colourScheme="purple" variant="solid">
        {label}
      </Button>

      <Button {...args} colourScheme="yellow" variant="solid">
        {label}
      </Button>

      <Button {...args} colourScheme="white" variant="solid">
        {label}
      </Button>

      <Button {...args} colourScheme="darkBlue" variant="solid">
        {label}
      </Button>
    </div>

    <div className="space-x-4">
      <Button {...args} colourScheme="teal" variant="outline">
        {label}
      </Button>

      <Button {...args} colourScheme="blue" variant="outline">
        {label}
      </Button>

      <Button {...args} colourScheme="red" variant="outline">
        {label}
      </Button>

      <Button {...args} colourScheme="purple" variant="outline">
        {label}
      </Button>

      <Button {...args} colourScheme="yellow" variant="outline">
        {label}
      </Button>

      <Button {...args} colourScheme="white" variant="outline">
        {label}
      </Button>

      <Button {...args} colourScheme="darkBlue" variant="outline">
        {label}
      </Button>
    </div>

    <div className="space-x-4">
      <Button {...args} colourScheme="teal" variant="ghost">
        {label}
      </Button>

      <Button {...args} colourScheme="blue" variant="ghost">
        {label}
      </Button>

      <Button {...args} colourScheme="red" variant="ghost">
        {label}
      </Button>

      <Button {...args} colourScheme="purple" variant="ghost">
        {label}
      </Button>

      <Button {...args} colourScheme="yellow" variant="ghost">
        {label}
      </Button>

      <Button {...args} colourScheme="white" variant="ghost">
        {label}
      </Button>
      <Button {...args} colourScheme="darkBlue" variant="ghost">
        {label}
      </Button>
    </div>

    <div className="space-x-4">
      <Button {...args} colourScheme="teal" variant="tab">
        {label}
      </Button>

      <Button {...args} colourScheme="blue" variant="tab">
        {label}
      </Button>

      <Button {...args} colourScheme="red" variant="tab">
        {label}
      </Button>

      <Button {...args} colourScheme="purple" variant="tab">
        {label}
      </Button>

      <Button {...args} colourScheme="yellow" variant="tab">
        {label}
      </Button>

      <Button {...args} colourScheme="white" variant="tab">
        {label}
      </Button>
      <Button {...args} colourScheme="darkBlue" variant="tab">
        {label}
      </Button>
    </div>
  </div>
)

export const Rectangle = Template.bind({})

Rectangle.args = {
  shape: "rectangle",
  variant: "solid",
  colourScheme: "teal",
  onCloseClick: undefined,
}

export const Rectangle2 = Template.bind({})

Rectangle2.args = {
  shape: "rectangle-2",
  variant: "solid",
  colourScheme: "teal",
  // @ts-ignore
  label: "Filter name",
  onCloseClick: undefined,
}

export const Pill = Template.bind({})

Pill.args = {
  shape: "pill",
  variant: "solid",
  colourScheme: "teal",
  onCloseClick: undefined,
}

export const Tab = Template.bind({})

Tab.args = {
  shape: "rectangle",
  variant: "tab",
  colourScheme: "teal",
  onCloseClick: undefined,
}

export const Loading = Template.bind({})

Loading.args = {
  shape: "rectangle",
  variant: "solid",
  colourScheme: "teal",
  isLoading: true,
  onCloseClick: undefined,
}

export const Disabled = Template.bind({})

Disabled.args = {
  shape: "rectangle",
  variant: "solid",
  colourScheme: "teal",
  isDisabled: true,
  onCloseClick: undefined,
}

export const IconLeft = Template.bind({})

IconLeft.args = {
  shape: "rectangle",
  variant: "solid",
  colourScheme: "teal",
  leftIcon: <FiltersIcon />,
  onCloseClick: undefined,
}

export const IconRight = Template.bind({})

IconRight.args = {
  shape: "rectangle",
  variant: "solid",
  colourScheme: "teal",
  rightIcon: <FiltersIcon />,
  onCloseClick: undefined,
}

export const IconLeftAndRight = Template.bind({})

IconLeftAndRight.args = {
  shape: "rectangle",
  variant: "solid",
  colourScheme: "teal",
  leftIcon: <FiltersIcon />,
  rightIcon: <FiltersIcon />,
  onCloseClick: undefined,
}

export const PillIconLeft = Template.bind({})

PillIconLeft.args = {
  shape: "pill",
  variant: "solid",
  colourScheme: "teal",
  leftIcon: <BellIcon />,
  onCloseClick: undefined,
}

export const PillIconRight = Template.bind({})

PillIconRight.args = {
  shape: "pill",
  variant: "solid",
  colourScheme: "teal",
  rightIcon: <BellIcon />,
  onCloseClick: undefined,
}

export const PillIconLeftAndRight = Template.bind({})

PillIconLeftAndRight.args = {
  shape: "pill",
  variant: "solid",
  colourScheme: "teal",
  leftIcon: <BellIcon />,
  rightIcon: <BellIcon />,
  onCloseClick: undefined,
}

export const PillWithCloseButton = Template.bind({})

PillWithCloseButton.args = {
  shape: "pill",
  variant: "solid",
  colourScheme: "teal",
  onClick: undefined,
}
