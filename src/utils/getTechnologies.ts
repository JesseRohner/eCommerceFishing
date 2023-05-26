import { MessageDescriptor } from "react-intl"

import {
  TechnologyFamily,
  TechnologyFamilyEnergy,
  TechnologyFamilyInfra,
  TechnologyFamilyOther,
  TechnologyFamilySolar,
  TechnologyFamilyWind,
} from "@hooks/api/useCompanies"

export type MappedTechnology<T> = {
  value: T
  label: MessageDescriptor
}

export const technologyFamilyList: Array<MappedTechnology<TechnologyFamily>> = [
  {
    value: TechnologyFamily.Solar,
    label: {
      id: "technology_family.solar",
      defaultMessage: "Solar",
    },
  },
  {
    value: TechnologyFamily.Wind,
    label: {
      id: "technology_family.wind",
      defaultMessage: "Wind",
    },
  },
  {
    value: TechnologyFamily.Other,
    label: {
      id: "technology_family.other_renewables",
      defaultMessage: "Other Renewables",
    },
  },
  {
    value: TechnologyFamily.Energy,
    label: {
      id: "technology_family.energy_storage",
      defaultMessage: "Energy Storage",
    },
  },
  {
    value: TechnologyFamily.Infra,
    label: {
      id: "technology_family.infrastructure_and_other",
      defaultMessage: "Infrastructure & Other",
    },
  },
]

export const technologySolarChildrenList: Array<
  MappedTechnology<TechnologyFamilySolar>
> = [
  {
    value: TechnologyFamilySolar.SolPVUti,
    label: {
      id: "technology_family_item.solar_pv_utility_scale",
      defaultMessage: "Solar PV - Utility-scale",
    },
  },
  {
    value: TechnologyFamilySolar.SolPVCIn,
    label: {
      id: "technology_family_item.solar_pv_c_and_i",
      defaultMessage: "Solar PV - C&I",
    },
  },
  {
    value: TechnologyFamilySolar.SolPVRes,
    label: {
      id: "technology_family_item.solar_pv_residential",
      defaultMessage: "Solar PV - Residential",
    },
  },
  {
    value: TechnologyFamilySolar.SolCSPow,
    label: {
      id: "technology_family_item.solar_csp",
      defaultMessage: "Solar CSP",
    },
  },
]

export const technologyWindChildrenList: Array<
  MappedTechnology<TechnologyFamilyWind>
> = [
  {
    value: TechnologyFamilyWind.WinOnsho,
    label: {
      id: "technology_family_item.onshore_wind",
      defaultMessage: "Onshore Wind",
    },
  },
  {
    value: TechnologyFamilyWind.WinOfFix,
    label: {
      id: "technology_family_item.offshore_wind_fixed",
      defaultMessage: "Offshore Wind - Fixed",
    },
  },
  {
    value: TechnologyFamilyWind.WinOfFlo,
    label: {
      id: "technology_family_item.offshore_wind_floating",
      defaultMessage: "Offshore Wind - Floating",
    },
  },
]

export const technologyOtherRenewablesChildrenList: Array<
  MappedTechnology<TechnologyFamilyOther>
> = [
  {
    value: TechnologyFamilyOther.OthGeoth,
    label: {
      id: "technology_family_item.geothermal",
      defaultMessage: "Geothermal",
    },
  },
  {
    value: TechnologyFamilyOther.OthHydPr,
    label: {
      id: "technology_family_item.hydrogen_production",
      defaultMessage: "Hydrogen Production",
    },
  },
  {
    value: TechnologyFamilyOther.OthAnaer,
    label: {
      id: "technology_family_item.anaerobic_digestion",
      defaultMessage: "Anaerobic Digestion",
    },
  },
  {
    value: TechnologyFamilyOther.OthBioga,
    label: {
      id: "technology_family_item.biogas",
      defaultMessage: "Biogas",
    },
  },
  {
    value: TechnologyFamilyOther.OthBioma,
    label: {
      id: "technology_family_item.biomass",
      defaultMessage: "Biomass",
    },
  },
  {
    value: TechnologyFamilyOther.OthCHPow,
    label: {
      id: "technology_family_item.combined_heat_and_power",
      defaultMessage: "Combined Head & Power (CHP)",
    },
  },
  {
    value: TechnologyFamilyOther.OthEfWas,
    label: {
      id: "technology_family_item.energy_from_waste",
      defaultMessage: "Energy from Waste (EfW / WtE)",
    },
  },
  {
    value: TechnologyFamilyOther.OthTidal,
    label: {
      id: "technology_family_item.tidal_or_marine_energy",
      defaultMessage: "Tidal / Marine Energy",
    },
  },
  {
    value: TechnologyFamilyOther.OthHybPl,
    label: {
      id: "technology_family_item.hybrid_plants",
      defaultMessage: "Hybrid Plants",
    },
  },
  {
    value: TechnologyFamilyOther.OthHydPw,
    label: {
      id: "technology_family_item.hydropower",
      defaultMessage: "Hydropower",
    },
  },
  {
    value: TechnologyFamilyOther.OthRenew,
    label: {
      id: "technology_family_item.other_renewables",
      defaultMessage: "Other Renewables",
    },
  },
]

export const technologyEnergyStorageChildrenList: Array<
  MappedTechnology<TechnologyFamilyEnergy>
> = [
  {
    value: TechnologyFamilyEnergy.EneBatSt,
    label: {
      id: "technology_family_item.battery_storage",
      defaultMessage: "Battery Storage",
    },
  },
  {
    value: TechnologyFamilyEnergy.EneFuCel,
    label: {
      id: "technology_family_item.fuel_cells",
      defaultMessage: "Fuel Cells",
    },
  },
  {
    value: TechnologyFamilyEnergy.EneHydro,
    label: {
      id: "technology_family_item.hydrogen_storage",
      defaultMessage: "Hydrogen Storage",
    },
  },
  {
    value: TechnologyFamilyEnergy.EneOther,
    label: {
      id: "technology_family_item.other_energy_storage",
      defaultMessage: "Other Energy Storage",
    },
  },
]

export const technologyInfrastructureAndOtherChildrenList: Array<
  MappedTechnology<TechnologyFamilyInfra>
> = [
  {
    value: TechnologyFamilyInfra.InfEleVe,
    label: {
      id: "technology_family_item.electric_vehicle",
      defaultMessage: "Electric Vehicle (EV)",
    },
  },
  {
    value: TechnologyFamilyInfra.InfEnBal,
    label: {
      id: "technology_family_item.energy_balancing",
      defaultMessage: "Energy Balancing",
    },
  },
  {
    value: TechnologyFamilyInfra.InfEnDis,
    label: {
      id: "technology_family_item.energy_distribution_or_grids",
      defaultMessage: "Energy Distribution / Grids",
    },
  },
  {
    value: TechnologyFamilyInfra.InfEnEff,
    label: {
      id: "technology_family_item.energy_efficiency",
      defaultMessage: "Energy Efficiency",
    },
  },
  {
    value: TechnologyFamilyInfra.InfHeNet,
    label: {
      id: "technology_family_item.heat_networks",
      defaultMessage: "Heat Networks",
    },
  },
  {
    value: TechnologyFamilyInfra.InfOther,
    label: {
      id: "technology_family_item.other_infrastructure",
      defaultMessage: "Other Infrastructure",
    },
  },
]

export const technologiesChildrenWithParentId: Array<
  MappedTechnology<
    | TechnologyFamilyEnergy
    | TechnologyFamilyInfra
    | TechnologyFamilyOther
    | TechnologyFamilySolar
    | TechnologyFamilyWind
  > & { parentId: TechnologyFamily }
> = [
  ...technologySolarChildrenList.map((item) => ({
    ...item,
    parentId: technologyFamilyList[0].value,
  })),
  ...technologyWindChildrenList.map((item) => ({
    ...item,
    parentId: technologyFamilyList[1].value,
  })),
  ...technologyOtherRenewablesChildrenList.map((item) => ({
    ...item,
    parentId: technologyFamilyList[2].value,
  })),
  ...technologyEnergyStorageChildrenList.map((item) => ({
    ...item,
    parentId: technologyFamilyList[3].value,
  })),
  ...technologyInfrastructureAndOtherChildrenList.map((item) => ({
    ...item,
    parentId: technologyFamilyList[4].value,
  })),
]

export const getTechnologyFamilyByValue = (value: TechnologyFamily) =>
  technologyFamilyList.find((t) => t.value === value)

export const getTechnologyByValue = (
  value:
    | TechnologyFamilyEnergy
    | TechnologyFamilyInfra
    | TechnologyFamilyOther
    | TechnologyFamilySolar
    | TechnologyFamilyWind,
) => technologiesChildrenWithParentId.find((t) => t.value === value)
