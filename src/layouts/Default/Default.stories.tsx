import { ComponentMeta, ComponentStory } from "@storybook/react"

import DefaultLayout from "./Default.layout"

export default {
  title: "Layouts/Default",
  component: DefaultLayout,
  argTypes: { onClick: { action: "clicked" } },

  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof DefaultLayout>

const Template: ComponentStory<typeof DefaultLayout> = (args) => (
  <DefaultLayout>
    <div className="w-full">
      {[...new Array(100)].map((_, i) => (
        <h1 key={`dummy-${i}`}>Scrollable Default content {i}</h1>
      ))}
    </div>
  </DefaultLayout>
)

export const Default = Template.bind({})
