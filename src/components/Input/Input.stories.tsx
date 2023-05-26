import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useEffect, useRef } from "react"

import EyeIcon from "@public/icons/eye.svg"
import SearchIcon from "@public/icons/search.svg"

import Input from "./Input.component"

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    id: {
      defaultValue: "input-story",
    },
    size: {
      control: "select",
      options: ["md", "lg"],
      defaultValue: "md",
    },
    value: {
      control: "text",
      defaultValue: "",
    },
    placeholder: {
      control: "text",
      defaultValue: "",
    },
    labelText: {
      control: "text",
      defaultValue: "",
    },
    optionalText: {
      control: "text",
      defaultValue: "",
    },
    helpText: {
      control: "text",
      defaultValue: "",
    },
    errorText: {
      control: "text",
      defaultValue: "",
    },
    isReadonly: {
      control: "boolean",
      defaultValue: false,
    },
    isDisabled: {
      control: "boolean",
      defaultValue: false,
    },
    isInvalid: {
      control: "boolean",
      defaultValue: false,
    },
    noDisabledStyles: {
      control: "boolean",
      defaultValue: false,
    },
    smallFocusOutline: {
      control: "boolean",
      defaultValue: false,
    },
    onChange: {
      action: "change",
    },
    onClearClick: {
      action: "change",
    },
  },

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

const FocusTemplate: ComponentStory<typeof Input> = (args) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return <Input ref={inputRef} {...args} />
}

export const Default = Template.bind({})

Default.args = {
  onClearClick: undefined,
}

export const Large = Template.bind({})

Large.args = {
  size: "lg",
  onClearClick: undefined,
}

export const Focused = FocusTemplate.bind({})

Focused.args = {
  onClearClick: undefined,
}

export const FocusedTinyOutline = FocusTemplate.bind({})

FocusedTinyOutline.args = {
  smallFocusOutline: true,
  onClearClick: undefined,
}

export const Readonly = Template.bind({})

Readonly.args = {
  isReadonly: true,
  value: "Test",
  onClearClick: undefined,
}

export const Disabled = Template.bind({})

Disabled.args = {
  isDisabled: true,
  onClearClick: undefined,
}

export const DisabledWithoutDisabledStyles = Template.bind({})

DisabledWithoutDisabledStyles.args = {
  isDisabled: true,
  noDisabledStyles: true,
  onClearClick: undefined,
}

export const Invalid = Template.bind({})

Invalid.args = {
  isInvalid: true,
  onClearClick: undefined,
}

export const WithValue = Template.bind({})

WithValue.args = {
  value: "Search",
  onClearClick: undefined,
}

export const WithPlaceholder = Template.bind({})

WithPlaceholder.args = {
  placeholder: "Search",
  onClearClick: undefined,
}

export const WithLeftIcon = Template.bind({})

WithLeftIcon.args = {
  leftIcon: <SearchIcon />,
  onClearClick: undefined,
}

export const WithRightIcon = Template.bind({})

WithRightIcon.args = {
  rightIcon: <EyeIcon />,
  onClearClick: undefined,
}

export const WithClearButton = Template.bind({})

export const WithLeftIconAndClearButton = Template.bind({})

WithLeftIconAndClearButton.args = {
  leftIcon: <SearchIcon />,
}

export const WithRightIconAndClearButton = Template.bind({})

WithRightIconAndClearButton.args = {
  rightIcon: <EyeIcon />,
}

export const WithLabel = Template.bind({})

WithLabel.args = {
  labelText: "Click me",
  onClearClick: undefined,
}

export const WithOptionalText = Template.bind({})

WithOptionalText.args = {
  optionalText: "Optional",
  onClearClick: undefined,
}

export const WithHelpText = Template.bind({})

WithHelpText.args = {
  helpText: "Help text",
  onClearClick: undefined,
}

export const WithErrorText = Template.bind({})

WithErrorText.args = {
  isInvalid: true,
  errorText: "Error text",
  onClearClick: undefined,
}

export const WithHelpAndErrorText = Template.bind({})

WithHelpAndErrorText.args = {
  isInvalid: true,
  helpText: "Help text",
  errorText: "Error text",
  onClearClick: undefined,
}

export const PasswordInput = Template.bind({})

PasswordInput.args = {
  type: "password",
  onClearClick: undefined,
}
