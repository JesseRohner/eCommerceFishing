import cx from "classnames"
import React from "react"
import { FormattedMessage } from "react-intl"

import { show } from "@services/ModalManager"

import Button from "@components/Button"

import LoginModal from "@modals/Login"
import RegistrationModal from "@modals/Registration"

import LockIcon from "@public/icons/lock.svg"

export type SignUpToAccessProps = {
  hasNoDefaultSpacing?: boolean
  hasNoDefaultMaxWidth?: boolean
  hasNoMobileDefaultMaxWidth?: boolean
  isDefaultIconHidden?: boolean

  overrideDefaultActionOnClick?: boolean
  overrideDefaultSecondaryActionOnClick?: boolean

  actionButtonText?: string
  secondaryActionButtonText?: string

  onActionClick?: Function
  onSecondaryActionClick?: Function

  className?: string
}

const SignUpToAccess: React.FC<SignUpToAccessProps> = ({
  hasNoDefaultSpacing,
  hasNoDefaultMaxWidth,
  hasNoMobileDefaultMaxWidth,
  isDefaultIconHidden,

  overrideDefaultActionOnClick,
  overrideDefaultSecondaryActionOnClick,

  actionButtonText,
  secondaryActionButtonText,

  onActionClick,
  onSecondaryActionClick,

  className,
}) => {
  const handleActionButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!overrideDefaultActionOnClick) {
      // @ts-ignore
      show(RegistrationModal)
    }

    if (typeof onActionClick === "function") {
      onActionClick(e)
    }
  }

  const handleSecondaryActionButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (!overrideDefaultSecondaryActionOnClick) {
      // @ts-ignore
      show(LoginModal)
    }

    if (typeof onSecondaryActionClick === "function") {
      onSecondaryActionClick(e)
    }
  }

  return (
    <div
      data-testid="signup-to-access-disclaimer"
      className={cx(
        "bg-white text-center space-y-1 sm:space-y-3 w-full",
        {
          "p-2": !hasNoDefaultSpacing,
          "max-w-[288px]": !hasNoMobileDefaultMaxWidth,
          "sm:max-w-[288px]": !hasNoDefaultMaxWidth,
        },
        className,
      )}
    >
      {!isDefaultIconHidden && (
        <LockIcon
          data-testid="signup-to-access-disclaimer__default-icon"
          className="w-10 h-10 fill-blue-500 mx-auto"
        />
      )}

      <Button className="!mb-1" onClick={handleActionButtonClick}>
        {actionButtonText || (
          <FormattedMessage
            id="disclaimer.signup_to_access.signup_button_text"
            defaultMessage="Sign up to access"
          />
        )}
      </Button>

      <button
        data-testid="signup-to-access-disclaimer__secondary-action"
        className="flex mx-auto text-sm text-blue-600 underline hover:no-underline"
        onClick={handleSecondaryActionButtonClick}
      >
        {secondaryActionButtonText || (
          <FormattedMessage
            id="disclaimer.signup_to_access.signup_link_text"
            defaultMessage="Already have an account?"
          />
        )}
      </button>
    </div>
  )
}

export default SignUpToAccess
