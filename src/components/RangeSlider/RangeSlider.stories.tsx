import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"

import RangeSlider from "./RangeSlider.component"

export default {
  title: "Components/RangeSlider",
  component: RangeSlider,
  argTypes: {
    step: {
      control: "number",
      min: 1,
      defaultValue: 10,
    },
    min: {
      control: "number",
      min: 1,
      defaultValue: 1900,
    },
    max: {
      control: "number",
      defaultValue: 2020,
    },
    hasThumbLabel: {
      control: "boolean",
      defaultValue: false,
    },
    hasMark: {
      control: "boolean",
      defaultValue: false,
    },
  },
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof RangeSlider>

const Template: ComponentStory<typeof RangeSlider> = (args) => {
  const [values, setValues] = useState([args.min!, args.max!])

  return (
    <div className="w-[301px]">
      <RangeSlider {...args} values={values} onChange={setValues} />
      <br />
      <div className="text-center">values: {JSON.stringify(values)}</div>
    </div>
  )
}

export const Default = Template.bind({})

export const WithStepMarks = Template.bind({})

WithStepMarks.args = {
  hasMark: true,
}

export const WithThumbLabels = Template.bind({})

WithThumbLabels.args = {
  hasThumbLabel: true,
}
