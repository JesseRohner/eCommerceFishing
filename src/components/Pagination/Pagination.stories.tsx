import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"

import Pagination from "./Pagination.component"

export default {
  title: "Components/Pagination",
  component: Pagination,

  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Pagination>

const Template: ComponentStory<typeof Pagination> = (args) => {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={(page: number) => setCurrentPage(page)}
    />
  )
}

export const Default = Template.bind({})

Default.args = {
  itemsPerPage: 25,
  totalItems: 250,
  offsetItemsNumber: 1,
}
