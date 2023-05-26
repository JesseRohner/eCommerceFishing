import { MessageDescriptor } from "react-intl"

export type NavigationItem = {
  href?: string
  icon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  label: MessageDescriptor
  subItems?: Array<NavigationSubItem>
}

export type NavigationSubItem = Omit<
  RequireKeys<NavigationItem, "label" | "href">,
  "icon" | "subItems"
> & {
  matchStr?: string
}

export type NavigationSection = {
  header: MessageDescriptor
  items: Array<RequireOnlyOne<NavigationItem, "href" | "subItems">>
}
