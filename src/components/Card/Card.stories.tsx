import { ComponentMeta, ComponentStory } from "@storybook/react"

import Card from "./Card.component"

export default {
  title: "Components/Card",
  component: Card,
  argTypes: {
    headingText: {
      type: "string",
      defaultValue: "Top projects",
    },
    showMoreURL: {
      type: "string",
      defaultValue: "/test_link",
    },
    size: {
      control: "select",
      options: ["md", "sm"],
      defaultValue: "md",
    },
  },
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => {
  return (
    <div className="h-[250px]">
      <Card {...args}>
        <div className="p-5 border-b border-blue-300">
          <p className="text-sm font-medium text-blue-900">
            120 MWp Salitre Solar Project Approaching RTB
          </p>
          <p className="text-xs leading-5 text-blue-600">
            Salitre Solar Power Plant Project 1...
          </p>
        </div>
        <div className="p-5 border-b border-blue-300">
          <p className="text-sm font-medium text-blue-900">
            120 MWp Salitre Solar Project Approaching RTB
          </p>
          <p className="text-xs leading-5 text-blue-600">
            Salitre Solar Power Plant Project 1...
          </p>
        </div>
        <div className="p-5 border-b border-blue-300">
          <p className="text-sm font-medium text-blue-900">
            120 MWp Salitre Solar Project Approaching RTB
          </p>
          <p className="text-xs leading-5 text-blue-600">
            Salitre Solar Power Plant Project 1...
          </p>
        </div>
        <div className="p-5 border-b border-blue-300">
          <p className="text-sm font-medium text-blue-900">
            120 MWp Salitre Solar Project Approaching RTB
          </p>
          <p className="text-xs leading-5 text-blue-600">
            Salitre Solar Power Plant Project 1...
          </p>
        </div>
        <div className="p-5 border-b border-blue-300">
          <p className="text-sm font-medium text-blue-900">
            120 MWp Salitre Solar Project Approaching RTB
          </p>
          <p className="text-xs leading-5 text-blue-600">
            Salitre Solar Power Plant Project 1...
          </p>
        </div>
        <div className="p-5 border-b border-blue-300">
          <p className="text-sm font-medium text-blue-900">
            120 MWp Salitre Solar Project Approaching RTB
          </p>
          <p className="text-xs leading-5 text-blue-600">
            Salitre Solar Power Plant Project 1...
          </p>
        </div>
      </Card>
    </div>
  )
}

export const MDSelected = Template.bind({})

MDSelected.args = {
  size: "md",
}

export const SMSelected = Template.bind({})

SMSelected.args = {
  size: "sm",
}
