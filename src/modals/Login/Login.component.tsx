import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import Alert from "@components/Alert"
import BaseModal, { BaseModalProps } from "@components/BaseModal"
import Button from "@components/Button"
import Input from "@components/Input"

import RegistrationModal from "@modals/Registration"

import useAuth from "@services/Auth"
import { create, show, useModal } from "@services/ModalManager"

import { email, password } from "@utils/validation"

type LoginModalProps = Pick<BaseModalProps, "canBeClosed">

const FormSchema = z.object({ email, password })

const LoginModal = create(({ canBeClosed }: LoginModalProps) => {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>
  const modal = useModal()
  const { login, isLoginLoading, loginError, isAuthValid } = useAuth()
  const isAuthvalid = isAuthValid()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    shouldFocusError: false,
  })
  const [formValue, setFormValue] = useState<z.infer<typeof FormSchema>>()

  useEffect(() => {
    if (formValue) {
      login(formValue)
    }
  }, [formValue])

  useEffect(() => {
    if (isAuthvalid) {
      modal.hide()
    }
  }, [isAuthvalid])

  useEffect(() => {
    if (!modal.isVisible) {
      reset()
    }
  }, [modal.isVisible])

  return (
    <BaseModal
      title="Login"
      modal={modal}
      canBeClosed={canBeClosed}
      className="space-y-5 sm:space-y-6 max-w-[384px] w-full"
    >
      <div className="relative w-full bg-blue-300 h-px">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs font-medium text-blue-600">
          OR
        </span>
      </div>

      <form
        ref={formRef}
        className="space-y-[14px]"
        onSubmit={handleSubmit(setFormValue)}
      >
        <Input
          id="email"
          labelText="Email"
          errorText={errors.email?.message}
          isInvalid={!!errors.email?.message}
          {...register("email")}
        />
        <Input
          id="password"
          type="password"
          labelText="Password"
          errorText={errors.password?.message}
          isInvalid={!!errors.password?.message}
          {...register("password")}
        />

        {loginError && (
          <Alert>
            Sorry, that email or password doesn’t match our records. Please try
            again.
          </Alert>
        )}

        <Button
          type="submit"
          className="w-full !mt-6"
          isLoading={isLoginLoading}
        >
          Log in with email
        </Button>
      </form>

      {/* TODO: Hardcoded colour */}
      <div className="bg-[#D9D9D9] w-full h-px" />

      <Button
        variant="outline"
        colourScheme="white"
        className="w-full"
        onClick={() => {
          modal.hide()

          // @ts-ignore
          show(RegistrationModal, { canBeClosed })
        }}
      >
        Sign up
      </Button>
    </BaseModal>
  )
})

export default LoginModal
