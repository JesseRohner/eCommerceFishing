import { zodResolver } from "@hookform/resolvers/zod"
import cx from "classnames"
import React, { useRef } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import Alert from "@components/Alert"
import BaseModal, { BaseModalProps } from "@components/BaseModal"
import Button from "@components/Button"
import Input from "@components/Input"

import CompanyDetailsModal from "@modals/CompanyDetails"

import { create, show, useModal } from "@services/ModalManager"

import {
  CompanyPersona,
  CompanyRecord,
  COMPANY_CREATE_PAYLOAD,
  useCompanyCreate,
} from "@hooks/api/useCompanies"

import {
  companyDescriptionTags,
  companyName,
  linkedinCompanyURL,
  websiteURL,
} from "@utils/validation"

const FormSchema = z.object({
  companyName,
  websiteURL,
  linkedinURL: linkedinCompanyURL,
  companyDescriptionTags,
})

export type FormSchemaType = z.infer<typeof FormSchema>

const formDataToPayload = (
  formData: FormSchemaType,
): COMPANY_CREATE_PAYLOAD => ({
  name: formData.companyName,
  website: formData.websiteURL,
  linkedin_page: formData.linkedinURL,
  persona: formData.companyDescriptionTags as Array<CompanyPersona>,
})

type CreateCompanyModalProps = Pick<BaseModalProps, "canBeClosed"> & {
  email?: string

  onSuccess?: (
    newCompanyData: { id?: number; name?: string },
    company?: Partial<CompanyRecord>,
  ) => void
}

const CreateCompany = create(
  ({ email, onSuccess, canBeClosed }: CreateCompanyModalProps) => {
    const modal = useModal()
    const formRef = useRef() as React.MutableRefObject<HTMLFormElement>
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      getValues,
      trigger,
      reset,
    } = useForm<FormSchemaType>({
      resolver: zodResolver(FormSchema),
    })
    const companyCreateMutation = useCompanyCreate()

    const onSubmit = (formData: FormSchemaType) => {
      const payload = formDataToPayload(formData)

      companyCreateMutation.mutate(payload, {
        onSuccess: (data) => {
          modal.hide()

          const newCompanyData = {
            id: data.data.company?.id,
            name: data.data.company?.name,
          }

          if (email) {
            // @ts-ignore
            show(CompanyDetailsModal, {
              email,
              canBeClosed,
            })
          }

          if (onSuccess) {
            onSuccess(newCompanyData, data.data.company)
          }
        },
        onSettled: () => {
          reset()
        },
      })
    }

    return (
      <BaseModal
        title="Create company"
        modal={modal}
        canBeClosed={canBeClosed}
        className="space-y-5 sm:space-y-6 max-w-[384px] w-full"
        headingVariant="secondary"
      >
        {companyCreateMutation.isError && (
          <Alert>
            There's been an unexpected error, we apologise for the
            inconvenience. Please try again after waiting for a little.
          </Alert>
        )}
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="!mt-3 space-y-3"
        >
          <Input
            id="companyName"
            size="md"
            className="w-full"
            labelText="Company name"
            errorText={errors?.companyName?.message}
            isInvalid={!!errors?.companyName?.message}
            {...register("companyName")}
          />

          <Input
            id="websiteURL"
            size="md"
            className="w-full"
            labelText="Website URL"
            errorText={errors?.websiteURL?.message}
            isInvalid={!!errors?.websiteURL?.message}
            {...register("websiteURL")}
          />

          <Input
            id="linkedinURL"
            size="md"
            className="w-full"
            labelText="LinkedIn page"
            errorText={errors?.linkedinURL?.message}
            isInvalid={!!errors?.linkedinURL?.message}
            {...register("linkedinURL")}
          />

          {/* TODO: Hardcoded colour */}
          <div className="text-sm leading-5 text-[#4E5466]">
            How would you describe your company?
          </div>

          {/* TODO: Hardcoded colour */}
          <div className="!mt-1 text-xs leading-4 text-[#4E5466]">
            Choose all that apply
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.values(CompanyPersona).map((item) => (
              <React.Fragment key={`company-description-option-${item}`}>
                <Button
                  shape="pill"
                  variant="outline"
                  colourScheme="white"
                  className={cx({
                    "bg-blue-300": (
                      getValues("companyDescriptionTags") || []
                    ).includes(item),
                  })}
                  onClick={() => {
                    const currentVal = getValues("companyDescriptionTags")

                    if (Array.isArray(currentVal)) {
                      const nextVal = currentVal.includes(item)
                        ? currentVal.filter((v) => v !== item)
                        : [...currentVal, item]

                      setValue(
                        "companyDescriptionTags",
                        nextVal as FormSchemaType["companyDescriptionTags"],
                      )
                    } else {
                      setValue("companyDescriptionTags", [item])
                    }

                    trigger("companyDescriptionTags")
                  }}
                >
                  {item}
                </Button>
              </React.Fragment>
            ))}
          </div>
          {!!errors.companyDescriptionTags?.message && (
            <p className="text-xs text-red-800 tracking-[0.17px] !mt-1">
              {errors.companyDescriptionTags?.message}
            </p>
          )}

          <Button type="submit" className="w-full !mt-6">
            Create company
          </Button>

          <Button
            variant="outline"
            colourScheme="white"
            className="w-full"
            onClick={() => {
              modal.hide()

              reset()

              if (email) {
                // @ts-ignore
                show(CompanyDetailsModal, { email, canBeClosed })
              }
            }}
          >
            Cancel
          </Button>
        </form>
      </BaseModal>
    )
  },
)

export default CreateCompany
