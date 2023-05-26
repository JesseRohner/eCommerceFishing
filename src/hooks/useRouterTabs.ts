import { useRouter } from "next/router"

export const PROFILE_TAB_QUERY_PARAM_KEY = "t.show"

const useRouterTabs = (
  tabList: Array<string>,

  onTabChange: (
    queryParamKey: typeof PROFILE_TAB_QUERY_PARAM_KEY,
    nextValue: typeof tabList[number] | number,
  ) => string,

  defaultValueIndex = 0,
): [Array<string>, string, (newValue: string | number) => void] => {
  const router = useRouter()

  let currentTab = router.query[PROFILE_TAB_QUERY_PARAM_KEY] as string

  if (!currentTab || !tabList.includes(currentTab)) {
    currentTab = tabList[defaultValueIndex]
  }

  const handleTabChange = (newValue: typeof tabList[number] | number) => {
    let nextValue = newValue

    if (!isNaN(Number(newValue))) {
      if (newValue < 0 || newValue >= tabList.length) {
        nextValue = 0
      } else {
        nextValue = newValue as number
      }

      nextValue = tabList[nextValue]
    }

    const nextURL = onTabChange(PROFILE_TAB_QUERY_PARAM_KEY, nextValue)

    if (!nextURL || !nextURL.length) {
      return
    }

    router.push(nextURL)
  }

  return [tabList, currentTab, handleTabChange]
}

export default useRouterTabs
