import cx from "classnames"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import BaseModal, { BaseModalProps } from "@components/BaseModal"
import Button from "@components/Button"

import { create, useModal } from "@services/ModalManager"

import {
  useEmailVerificationRequest,
  useEmailVerificationTokenRequest,
} from "@hooks/api/useUserAccess"

import { email } from "@utils/validation"

import DangerIcon from "@public/icons/danger.svg"
import LoadingIcon from "@public/icons/load-static.svg"
import TickCircleIcon from "@public/icons/tick-circle.svg"

export type EmailVerificationProps = Pick<BaseModalProps, "canBeClosed"> & {
  query: { email?: string; token?: string }

  showOverlayBackground?: boolean
}

const EmailVerification = create(
  ({ query, showOverlayBackground, canBeClosed }: EmailVerificationProps) => {
    const modal = useModal()
    const router = useRouter()
    const emailVerificationTokenMutation = useEmailVerificationTokenRequest()
    const emailVerificationMutation = useEmailVerificationRequest()
    const [redirectLoading, setRedirectLoading] = useState(false)

    const resetComponentState = () => {
      setRedirectLoading(false)

      emailVerificationTokenMutation.reset()
    }

    useEffect(() => {
      if (!emailVerificationTokenMutation.isLoading) {
        emailVerificationTokenMutation.mutate({
          email: query.email!,
          token: query.token!,
        })
      }

      return () => resetComponentState()
    }, [])

    const isLoading =
      emailVerificationTokenMutation.isIdle ||
      emailVerificationTokenMutation.isLoading ||
      redirectLoading
    const isSuccess = emailVerificationTokenMutation.isSuccess

    const title = isLoading
      ? "Verifying email"
      : isSuccess
      ? "Email verified"
      : "Email verification failed"

    const titleIcon = isLoading ? undefined : isSuccess ? (
      <TickCircleIcon className="mb-[10px] w-[32px] h-[32px] fill-green-500 [&_circle]:fill-blue-900" />
    ) : (
      <DangerIcon className="mb-[10px] fill-red-600 w-[26px] h-[26px]" />
    )

    const handleNewVerificationMutationRequest = () => {
      {
        const showErrorToast = () =>
          toast(
            `There was an unexpected error when sending the verification email to ${query.email}.`,
          )

        if (!email.safeParse(query.email).success) {
          showErrorToast()

          return
        }

        emailVerificationMutation.mutate(
          { email: query.email },
          {
            onSuccess: () => {
              toast(
                "New verification email sent. Please check your inbox to complete signup.",
              )
            },
            onError: () => {
              showErrorToast()
            },
          },
        )
      }
    }

    const buttonCallback = isSuccess
      ? () => {
          setRedirectLoading(true)

          router.push("/", undefined).then((_) => {
            modal.hide()

            resetComponentState()
          })
        }
      : () => {
          handleNewVerificationMutationRequest()
        }

    return (
      <BaseModal
        modal={modal}
        title={title}
        titleIcon={titleIcon}
        className={cx(
          "max-w-[384px] w-full text-center text-blue-600 text-sm leading-5",
          {
            "space-y-4": isLoading,
            "space-y-3": !isLoading,
          },
        )}
        overlayClassName={showOverlayBackground ? "" : "!bg-transparent"}
        canBeClosed={canBeClosed}
      >
        {isLoading ? (
          <div className="h-[240px] bg-gray-100 rounded-lg p-2 flex items-center justify-center flex-col space-y-4">
            <LoadingIcon className="w-6 stroke-blue-500 stroke-2 animate-spin" />

            <p className="w-2/3">
              {redirectLoading
                ? "Please wait to be redirected"
                : "Please wait while we check your account"}
            </p>
          </div>
        ) : (
          <>
            <p>
              {isSuccess
                ? "You can now begin enjoying your account."
                : "You token has expired. Please send a new verification email to complete signup."}
            </p>

            <Button className="!mt-6" onClick={buttonCallback}>
              {isSuccess ? "Go to Account home" : "New verification email"}
            </Button>
          </>
        )}
      </BaseModal>
    )
  },
)

export default EmailVerification
