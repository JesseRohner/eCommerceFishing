import { useEffect, useState } from "react"

import Alert from "@components/Alert"
import BaseModal, { BaseModalProps } from "@components/BaseModal"
import Button from "@components/Button"

import useAuth from "@services/Auth/Auth.context"
import { create, useModal } from "@services/ModalManager"

import {
  useEmailVerificationRequest,
  useSessionCheck,
} from "@hooks/api/useUserAccess"

import SignUpIcon from "@public/icons/sign-up.svg"

export type ConfirmEmailModalProps = Pick<BaseModalProps, "canBeClosed"> & {
  email?: string
}

const ConfirmEmail = create(
  ({ email, canBeClosed }: ConfirmEmailModalProps) => {
    const modal = useModal()
    const { user } = useAuth()
    const { mutate, isLoading, isError, reset } = useEmailVerificationRequest()
    const [refetchIntervalMs, setRefetchIntervalMs] = useState<
      number | false | Function
    >(false)
    const _ = useSessionCheck({
      refetchInterval: refetchIntervalMs,
    })

    useEffect(() => {
      if (!user.emailverified || user.emailverified !== "Yes") {
        return
      }

      modal.hide()
    }, [user.emailverified])

    useEffect(() => () => reset(), [])

    const handleTriggerEmailVerificationRequest = () => {
      if (!email) {
        return
      }

      mutate(undefined, {
        onSuccess: () => {
          if (!user.emailverified || user.emailverified === "No") {
            setRefetchIntervalMs(
              () => () => user.emailverified === "Yes" ? false : 5000,
            )
          }
        },
      })
    }

    return (
      <BaseModal
        spacing="lg"
        title="Please confirm your email address to continue"
        titleIcon={
          <SignUpIcon className="[&_rect]:fill-purple-400 fill-white w-[52px] h-[52px]" />
        }
        modal={modal}
        canBeClosed={canBeClosed}
        className="space-y-3 max-w-[384px] w-full text-center text-blue-600 text-sm leading-5"
      >
        {isError && (
          <Alert iconPosition="start" className="text-left">
            There has been an unexpected error, please try again after waiting
            for a short time. We kindly apologise for this inconvenience.
          </Alert>
        )}

        {email && <p>A verification email has been sent to {email}.</p>}

        <Button
          variant="outline"
          colourScheme="white"
          className="!mt-4"
          onClick={handleTriggerEmailVerificationRequest}
          isLoading={isLoading}
        >
          Resend verification email
        </Button>
      </BaseModal>
    )
  },
)

export default ConfirmEmail
