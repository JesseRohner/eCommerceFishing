import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import BaseModal, { BaseModalProps } from "@components/BaseModal"
import Button from "@components/Button"
import CompanyComboboxSelector from "@components/CompanyComboboxSelector"
import Input from "@components/Input"

import RiskWarningModal from "@modals/RiskWarning"

import { create, show, useModal } from "@services/ModalManager"

import {
  REGISTRATION_UPDATE_PAYLOAD,
  useUpdateRegistration,
} from "@hooks/api/useUserAccess"

import { companyNameWithServerValidation, jobTitle } from "@utils/validation"

const FormSchema = z.object({
  companyName: companyNameWithServerValidation,
  companyId: z.number({ invalid_type_error: "Invalid company" }),
  jobTitle,
})

export type FormSchemaType = z.infer<typeof FormSchema>

const formDataToPayload = (
  formData: FormSchemaType,
): REGISTRATION_UPDATE_PAYLOAD => ({
  companyid: formData.companyId,
  jobtitle: formData.jobTitle,
})

export type CompanyDetailsModalProps = Pick<BaseModalProps, "canBeClosed"> & {
  email: string
}

const CompanyDetailsModal = create(
  ({ email, canBeClosed }: CompanyDetailsModalProps) => {
    const formRef = useRef() as React.MutableRefObject<HTMLFormElement>
    const modal = useModal()
    const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
      setValue,
      setError,
      resetField,
      trigger,
      reset,
    } = useForm<FormSchemaType>({
      resolver: zodResolver(FormSchema, { async: true }),
      shouldFocusError: false,
    })
    const { mutate } = useUpdateRegistration()

    useEffect(() => {
      reset()
    }, [modal.isVisible])

    const onSubmit = (formData: FormSchemaType) => {
      const formDataAsPayload = formDataToPayload(formData)

      mutate(formDataAsPayload, {
        onSuccess: () => {
          modal.hide()

          // @ts-ignore
          show(RiskWarningModal, { email, canBeClosed })
        },
      })
    }

    return (
      <BaseModal
        title="Company details"
        modal={modal}
        canBeClosed={canBeClosed}
        className="space-y-5 sm:space-y-6 max-w-[384px] w-full"
      >
        <form
          ref={formRef}
          className="space-y-[14px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CompanyComboboxSelector
            id="company-details"
            getValue={() => getValues("companyName")}
            setFormValue={(i) => {
              if (i?.id && i?.title) {
                setValue("companyName", i.title, { shouldValidate: true })
                setValue("companyId", i.id, { shouldValidate: true })
              } else {
                setValue("companyName", "", { shouldValidate: true })
                // @ts-ignore
                setValue("companyId", undefined)
              }
            }}
            triggerUpdate={() => trigger("companyName")}
            resetError={() => {
              setError("companyName", {})
              resetField("companyId")
            }}
            isInvalid={
              !!errors.companyName?.message || !!errors.companyId?.message
            }
            errorText={errors.companyName?.message || errors.companyId?.message}
            modalObj={modal}
            nextModalPayload={{
              email,
              canBeClosed,
              onSuccess: (data: { id: number; name: string }) => {
                setValue("companyName", data.name, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
                setValue("companyId", data.id, { shouldValidate: true })
              },
            }}
            {...register("companyName")}
          />

          <Input
            id="jobTitle"
            labelText="Your job title"
            errorText={errors.jobTitle?.message}
            isInvalid={!!errors.jobTitle?.message}
            {...register("jobTitle")}
          />

          <Button type="submit" className="w-full !mt-6">
            Next
          </Button>
        </form>
      </BaseModal>
    )
  },
)

export default CompanyDetailsModal
