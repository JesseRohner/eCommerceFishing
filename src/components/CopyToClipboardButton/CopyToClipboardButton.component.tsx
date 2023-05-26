import cx from "classnames"
import { useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { toast } from "react-toastify"

import Button, { ButtonProps } from "@components/Button"

import LinkIcon from "@public/icons/link.svg"

export type CopyToClipboardButtonProps = Partial<ButtonProps> & {
  defaultIconClassName?: string

  toastAutoCloseDelay?: number
  textToCopy?: string
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
  defaultIconClassName,

  toastAutoCloseDelay = 2500,
  textToCopy = typeof window !== "undefined" ? window.location.href : "",

  children,
  ...rest
}) => {
  const [hasCopied, setHasCopied] = useState(false)

  const handleOnCopy = () => {
    if (!hasCopied) {
      setHasCopied(true)

      toast("Link copied to clipboard", {
        autoClose: toastAutoCloseDelay,
      })
    }
  }

  toast.onChange((v) => {
    if (v.status === "removed") {
      setHasCopied(false)
    }
  })

  return (
    <CopyToClipboard text={textToCopy} onCopy={handleOnCopy}>
      <Button
        variant="outline"
        colourScheme="white"
        className="px-2"
        noVerticalPadding
        {...rest}
      >
        {children ?? (
          <LinkIcon className={cx("fill-blue-600", defaultIconClassName)} />
        )}
      </Button>
    </CopyToClipboard>
  )
}

export default CopyToClipboardButton
