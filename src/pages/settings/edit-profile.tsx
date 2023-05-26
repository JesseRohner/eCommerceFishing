import { zodResolver } from "@hookform/resolvers/zod"
import type { NextPage } from "next"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

import Button from "@components/Button"
import CompanyComboboxSelector from "@components/CompanyComboboxSelector"
import Input from "@components/Input"
import UserCard from "@components/UserCard"

import UserSettingsLayout from "@layouts/UserSettings"

import useAuth from "@services/Auth/Auth.context"

import { useUserUpdate } from "@hooks/api/useUser"
import { UserRecord } from "@hooks/api/useUserAccess"

import {
  companyNameWithServerValidation,
  firstName,
  jobTitle,
  lastName,
  linkedinProfileURL,
} from "@utils/validation"
import withAuth from "@utils/withAuth"

const FormSchema = z.object({
  firstName,
  lastName,
  linkedinURL: linkedinProfileURL,
  companyName: companyNameWithServerValidation,
  companyId: z.number({ invalid_type_error: "Invalid company" }),
  jobTitle,
})

type FormSchemaType = z.infer<typeof FormSchema>

const userObjBeToFeMapping = (user: UserRecord & { companyid?: number }) => ({
  firstName: user.firstname || "",
  lastName: user.lastname || "",
  linkedinURL: user.linkedinurl || "",
  jobTitle: user.jobtitle || "",
  companyName: user.company || "",
  companyId: user.companyid,
})

const userObjFeToBeMappint = (
  user: ReturnType<typeof userObjBeToFeMapping> & { companyId?: number },
): UserRecord & { companyid?: number } => ({
  firstname: user.firstName,
  lastname: user.lastName,
  linkedinurl: user.linkedinURL,
  jobtitle: user.jobTitle,
  company: user.companyName,
  companyid: user.companyId,
})

const EditProfile: NextPage = () => {
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    getValues,
    setValue,
    setError,
    resetField,
    trigger,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema, { async: true }),
    defaultValues: userObjBeToFeMapping(user),
  })
  const { mutate, isLoading } = useUserUpdate()

  const onSubmit = (userData: FormSchemaType) => {
    if (user && user.id) {
      const formDataAsPayload = userObjFeToBeMappint(userData)

      mutate(
        { id: user.id, ...formDataAsPayload },
        {
          onSuccess: () => {
            toast("Profile settings updated")
          },
          onError: () => {
            toast(
              "There has been an error while updating your settings. Your changes have not been saved",
            )
          },
        },
      )
    }
  }

  return (
    <UserSettingsLayout
      headingText={{
        id: "settings.navigation.edit_profile",
        defaultMessage: "Edit profile",
      }}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="flex-1 order-2 sm:order-1">
          <form className="py-2s space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-[14px]">
              <div className="flex flex-col sm:flex-row gap-[14px] sm:gap-8">
                <div className="flex-1">
                  <Input
                    id="firstName"
                    labelText="First name"
                    isDisabled={isLoading}
                    noDisabledStyles={isLoading}
                    isInvalid={!!errors?.firstName}
                    errorText={errors?.firstName?.message}
                    {...register("firstName")}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    id="lastName"
                    labelText="Last name"
                    isDisabled={isLoading}
                    noDisabledStyles={isLoading}
                    isInvalid={!!errors?.lastName}
                    errorText={errors?.lastName?.message}
                    {...register("lastName")}
                  />
                </div>
              </div>

              <Input
                id="linkedinURL"
                labelText="LinkedIn profile URl"
                helpText="We use this to verify your identify"
                isDisabled={isLoading}
                noDisabledStyles={isLoading}
                isInvalid={!!errors?.linkedinURL}
                errorText={errors?.linkedinURL?.message}
                {...register("linkedinURL")}
              />
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-blue-300" />

            <Input id="email" labelText="Email" value={user.email} isDisabled />

            {/* Divider */}
            <div className="w-full h-px bg-blue-300" />

            <div className="space-y-[14px]">
              <CompanyComboboxSelector
                id="edit-profile"
                className="max-w-none"
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
                errorText={
                  errors.companyName?.message || errors.companyId?.message
                }
                nextModalPayload={{
                  onSuccess: (data: { name: string; id: number }) => {
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
                isDisabled={isLoading}
                noDisabledStyles={isLoading}
                isInvalid={!!errors?.jobTitle}
                errorText={errors?.jobTitle?.message}
                {...register("jobTitle")}
              />
            </div>

            <Button
              shape="rectangle"
              type="submit"
              className="mt-6"
              isLoading={isLoading}
              isDisabled={!isDirty}
            >
              Update Profile
            </Button>
          </form>
        </div>

        <div className="flex flex-1 justify-center order-1 sm:order-2">
          <div className="w-full sm:max-w-[252px] mb-4 sm:ml-8 sm:mb-0">
            <UserCard
              variant="card"
              colourScheme="white"
              isBordered
              isRounded
              displayBadge
              displayLinkedIn
            />
          </div>
        </div>
      </div>
    </UserSettingsLayout>
  )
}

export default withAuth(EditProfile)
