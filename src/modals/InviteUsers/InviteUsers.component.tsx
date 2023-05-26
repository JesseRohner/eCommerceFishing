import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

import BaseModal from "@components/BaseModal"
import Button from "@components/Button"
import Input from "@components/Input"

import { create, useModal } from "@services/ModalManager"

import { useUserCreateInvites } from "@hooks/api/useUser"

import { email } from "@utils/validation"

const EMAIL_LIST_LENGTH_BOUNDARY = 5

const FormSchema = z.object({ email })

export type FormSchemaType = z.infer<typeof FormSchema>

export type ShareProjectModalProps = {}

const InviteUsers = create(({}: ShareProjectModalProps) => {
  const modal = useModal()
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>
  const [emailList, setEmailList] = useState<Array<string>>([])
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    shouldFocusError: false,
  })
  const createInvitesMutation = useUserCreateInvites()

  const addEmailToList = ({ email }: { email: string }) => {
    const emailAlreadyInList = emailList
      .map((v) => v.toLowerCase())
      .includes(email.toLowerCase())

    if (!emailAlreadyInList && emailList.length < EMAIL_LIST_LENGTH_BOUNDARY) {
      setEmailList((prevList) => [...prevList, email])
      reset()
    }
  }

  const onSubmit = () => {
    createInvitesMutation.mutate(
      { invites: emailList },
      {
        onSuccess: () => {
          modal.hide()

          toast(
            `${emailList.length} user invite${
              emailList.length > 1 ? "s" : ""
            } sent`,
          )
        },
        onError: () => {
          toast("There has been an unexpected error, please try again.")
        },
      },
    )
  }

  return (
    <BaseModal
      spacing="sm"
      title="Invite users"
      titlePosition="left"
      modal={modal}
      className="max-w-[440px] w-full text-blue-600 text-sm leading-5 tracking-[0.17px]"
      showCloseButton
      onAfterClose={() => {
        setEmailList([])
        reset()
      }}
    >
      <form
        ref={formRef}
        className="space-y-6"
        onSubmit={handleSubmit(addEmailToList)}
      >
        <p className="!mt-5 !-mb-1">Invite users to PF Nexus via email.</p>

        <Input
          id="introduction-email"
          labelText="Emails"
          errorText={errors.email?.message}
          isInvalid={!!errors.email?.message}
          helpText="Press Enter between emails"
          {...register("email")}
        />

        {!!emailList.length && (
          <div className="!mt-3 flex flex-wrap gap-2">
            {emailList.map((email) => (
              <Button
                key={`${email}-share-item`}
                shape="pill"
                colourScheme="blue"
                onCloseClick={(e) => {
                  setEmailList((prevList) => [
                    ...prevList.filter((v) => v !== email),
                  ])
                }}
              >
                {email}
              </Button>
            ))}
          </div>
        )}

        <Button
          variant="outline"
          colourScheme="white"
          onClick={onSubmit}
          isDisabled={!emailList.length}
        >
          Invite users
        </Button>
      </form>
    </BaseModal>
  )
})

export default InviteUsers
