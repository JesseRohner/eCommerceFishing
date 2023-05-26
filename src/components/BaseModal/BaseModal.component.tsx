import cx from "classnames"
import Modal from "react-modal"

import { ModalManagerHandler, reactBaseModal } from "@services/ModalManager"

import CloseIcon from "@public/icons/close.svg"

export type BaseModalProps = {
  spacing?: "sm" | "md" | "lg"
  titlePosition?: "left" | "center" | "right"

  title?: string
  titleIcon?: React.ReactNode
  titleIconBackground?: "purple"

  modal: ModalManagerHandler

  canBeClosed?: boolean
  showCloseButton?: boolean

  onAfterClose?: () => void | undefined

  children: React.ReactNode

  className?: string
  overlayClassName?: string

  headingVariant?: string
}

const BaseModal: React.FC<BaseModalProps> = ({
  spacing = "md",
  titlePosition: headingTextPosition = "center",

  title,
  titleIcon,
  titleIconBackground,

  modal,

  canBeClosed = true,
  showCloseButton = false,

  onAfterClose,

  children,

  className,
  overlayClassName,

  headingVariant = "primary",
}) => {
  let reactBaseModalAdaptorProps = reactBaseModal(modal)

  if (!canBeClosed) {
    let { onRequestClose: _onRequestClose, ...rest } =
      reactBaseModalAdaptorProps

    reactBaseModalAdaptorProps = rest
  }

  const handleClose: React.MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation()

    if (reactBaseModalAdaptorProps.onRequestClose) {
      reactBaseModalAdaptorProps.onRequestClose(e)
    }
  }

  return (
    <Modal
      testId="react-modal_base"
      overlayClassName={cx(
        "fixed top-0 left-0 right-0 bottom-0 bg-blue-600/60 flex flex-col justify-center z-50",
        overlayClassName,
      )}
      className="p-4 w-full outline-none"
      shouldFocusAfterRender
      shouldReturnFocusAfterClose
      contentElement={(props, children) => (
        <div {...props} onClick={handleClose}>
          {children}
        </div>
      )}
      onAfterClose={onAfterClose}
      {...reactBaseModalAdaptorProps}
    >
      <div
        className={cx(
          "bg-white rounded-lg mx-auto z-50",
          {
            "p-4 sm:p-6": spacing === "sm",
            "p-6 sm:p-8": spacing === "md",
            "p-6 sm:pb-8 sm:px-14": spacing === "lg",
          },
          className,
        )}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {titleIcon && (
          <div className="flex justify-center">
            <div
              className={cx("flex items-center justify-center", {
                "rounded-lg w-[52px] h-[52px] mb-4": !!titleIconBackground,
                "bg-purple-400": titleIconBackground === "purple",
              })}
            >
              {titleIcon}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          {title && (
            <h1
              className={cx(
                "flex-1 font-normal text-xl text-blue-900 tracking-[0.16px]",
                {
                  "sm:-mt-1": spacing === "sm",
                  "sm:-mt-3": spacing === "md",

                  "text-left": headingTextPosition === "left",
                  "text-center": headingTextPosition === "center",
                  "text-right": headingTextPosition === "right",

                  "leading-7": !showCloseButton || headingVariant === "primary",
                  "leading-5": showCloseButton,

                  "text-xl": headingVariant === "primary",
                  "text-lg leading-6": headingVariant === "secondary",
                },
              )}
            >
              {title}
            </h1>
          )}

          {showCloseButton && (
            <button onClick={handleClose}>
              <CloseIcon className="fill-blue-500 w-6 h-6 -mt-2 -mr-2" />
            </button>
          )}
        </div>

        {children}
      </div>
    </Modal>
  )
}

export default BaseModal
