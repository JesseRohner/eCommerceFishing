import { MessageDescriptor } from "react-intl"

export type Region = {
  value: number
  label: MessageDescriptor
}

export const regionList: Array<Region> = [
  {
    value: 0,
    label: {
      id: "region.africa",
      defaultMessage: "Africa",
    },
  },
  {
    value: 1,
    label: {
      id: "region.asia",
      defaultMessage: "Asia",
    },
  },
  {
    value: 2,
    label: {
      id: "region.eurasia",
      defaultMessage: "Eurasia",
    },
  },
  {
    value: 3,
    label: {
      id: "region.europe",
      defaultMessage: "Europe",
    },
  },
  {
    value: 4,
    label: {
      id: "region.usa_and_canada",
      defaultMessage: "USA & Canada",
    },
  },
  {
    value: 5,
    label: {
      id: "region.latam_and_carribean",
      defaultMessage: "LATAM & Caribbean",
    },
  },
  {
    value: 6,
    label: {
      id: "region.oceania",
      defaultMessage: "Oceania",
    },
  },
  {
    value: 7,
    label: {
      id: "region.antarctica",
      defaultMessage: "Antarctica",
    },
  },
]

export const getRegionByValue = (value: number) =>
  regionList.find((region) => region.value === value)
