import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

type ClientOnlyPortalProps = {
  selector: string

  children: React.ReactNode
}

// TODO: Test Me!
const ClientOnlyPortal: React.FC<ClientOnlyPortalProps> = ({
  selector,
  children,
}) => {
  const ref = useRef<HTMLElement>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector) as HTMLElement

    if (ref.current) {
      setMounted(true)
    }
  }, [selector])

  return mounted && ref.current ? createPortal(children, ref.current) : null
}

export default ClientOnlyPortal
