import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo, useRef } from "react"
import { useForm } from "react-hook-form"
import { FormattedMessage, useIntl } from "react-intl"
import { z } from "zod"

import Alert from "@components/Alert"
import BaseModal, { BaseModalProps } from "@components/BaseModal"
import Button from "@components/Button"
import Dropdown from "@components/Dropdown"
import Input from "@components/Input"

import CompanyDetailsModal from "@modals/CompanyDetails"
import LoginModal from "@modals/Login"

import { create, show, useModal } from "@services/ModalManager"

import { REGISTRATION_PAYLOAD, useRegistration } from "@hooks/api/useUserAccess"

import { countryList } from "@utils/getCountries"
import {
  countryISO,
  email,
  firstName,
  lastName,
  linkedinProfileURL,
  password,
} from "@utils/validation"

const FormSchema = z.object({
  email,
  password,
  firstName,
  lastName,
  countryISO,
  linkedinURL: linkedinProfileURL,
})

export type FormSchemaType = z.infer<typeof FormSchema>

const formDataToPayload = (formData: FormSchemaType): REGISTRATION_PAYLOAD => ({
  firstname: formData.firstName,
  lastname: formData.lastName,
  email: formData.email,
  password: formData.password,
  linkedinurl: formData.linkedinURL,
  country: formData.countryISO,
})

type RegisterModalProps = Pick<BaseModalProps, "canBeClosed">

const Registration = create(({ canBeClosed }: RegisterModalProps) => {
  const intl = useIntl()
  const modal = useModal()
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  })
  const { mutate, error: serverError } = useRegistration()

  useEffect(() => {
    if (!modal.isVisible) {
      reset()
    }
  }, [modal.isVisible])

  const contryListAsDropdownOptions = useMemo(
    () =>
      countryList.map((c) => ({
        value: c.value,
        label: intl.formatMessage(c.label),
      })),
    [intl],
  )

  const onSubmit = (formData: FormSchemaType) => {
    const formDataAsPayload = formDataToPayload(formData)

    mutate(formDataAsPayload, {
      onSuccess: () => {
        modal.hide()

        // @ts-ignore
        show(CompanyDetailsModal, {
          email: formDataAsPayload.email,
          canBeClosed: false,
        })
      },
    })
  }

  return (
    <BaseModal
      title="Sign up for instant access"
      modal={modal}
      canBeClosed={canBeClosed}
      className="max-w-[384px] w-full space-y-4"
    >
      {/* @ts-ignore */}
      {serverError?.response?.data?.message && (
        // @ts-ignore
        <Alert>{serverError?.response?.data?.message}</Alert>
      )}
      <form
        ref={formRef}
        className="space-y-[14px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-6">
          <Input
            id="firstName"
            size="md"
            className="w-full"
            labelText="First name"
            errorText={errors?.firstName?.message}
            isInvalid={!!errors?.firstName?.message}
            {...register("firstName")}
          />
          <Input
            id="lastName"
            size="md"
            className="w-full"
            labelText="Last name"
            errorText={errors?.lastName?.message}
            isInvalid={!!errors?.lastName?.message}
            {...register("lastName")}
          />
        </div>

        <Input
          id="email"
          size="md"
          className="w-full"
          labelText="Work email"
          errorText={errors?.email?.message}
          isInvalid={!!errors?.email?.message}
          {...register("email")}
        />

        <Input
          id="password"
          size="md"
          className="w-full"
          labelText="Password"
          errorText={errors?.password?.message}
          isInvalid={!!errors?.password?.message}
          type="password"
          {...register("password")}
        />

        <Dropdown
          labelText="Country"
          options={contryListAsDropdownOptions}
          setFormValue={setValue}
          errorText={errors?.countryISO?.message}
          isInvalid={!!errors?.countryISO?.message}
          {...register("countryISO")}
        />

        <Input
          id="linkedinURL"
          size="md"
          className="w-full"
          labelText="LinkedIn profile URL"
          errorText={errors?.linkedinURL?.message}
          isInvalid={!!errors?.linkedinURL?.message}
          helpText="We use this to verify your identity"
          {...register("linkedinURL")}
        />

        <Button type="submit" className="uppercase w-full !mt-6">
          Sign up
        </Button>
      </form>

      <button
        data-testid="registration-modal__already-have-an-account"
        type="button"
        onClick={() => {
          modal.hide()

          // @ts-ignore
          show(LoginModal, { canBeClosed })
        }}
        className="flex mx-auto text-sm text-blue-600 underline hover:no-underline"
      >
        <FormattedMessage
          id="disclaimer.signup_to_access.signup_link_text"
          defaultMessage="Already have an account?"
        />
      </button>
    </BaseModal>
  )
})

export default Registration
