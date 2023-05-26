import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"

import withAuth from "@utils/withAuth"

const DefaultSetting: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push("/settings/edit-profile")
  }, [])

  return <></>
}

export default withAuth(DefaultSetting)
