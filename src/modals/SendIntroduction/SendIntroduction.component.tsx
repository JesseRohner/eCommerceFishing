import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { z } from "zod"

import BaseModal from "@components/BaseModal"
import Button from "@components/Button"
import Checkbox from "@components/Checkbox"

import { zodResolver } from "@hookform/resolvers/zod"
import { create, useModal } from "@services/ModalManager"
import { useForm } from "react-hook-form"

const FormSchema = z.object({ dontShowAgain: z.boolean() })

const SendIntroduction = create(() => {
  const modal = useModal()
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>
  const [formValues, setFormValues] = useState<z.infer<typeof FormSchema>>()
  const { register, handleSubmit, reset } = useForm<z.infer<typeof FormSchema>>(
    { resolver: zodResolver(FormSchema), shouldFocusError: false },
  )

  return (
    <BaseModal
      spacing="sm"
      title="Send introduction"
      modal={modal}
      className="max-w-[440px] w-full text-blue-600 text-sm leading-5 tracking-[0.17px]"
    >
      <form
        ref={formRef}
        className="space-y-6"
        onSubmit={handleSubmit(setFormValues)}
      >
        <p className="text-center !mt-2.5">
          The project owner will be sent the following email:
        </p>

        <div className="bg-blue-100 rounded-lg p-4 max-h-[232px] h-full overflow-y-auto">
          Dear [Project owner],
          <br />
          <br />
          I'd like to introduce you to Harry.
          <br />
          <br />
          [Project owner], Harry has looked over the project details you have
          submitted (below) and would like to learn more about the project.
          <br />
          <br />
          High level details Technology: Solar PV Country: GBR Capital sought:
          10.0m USD Type of capital sought: Debt, Project stage: Shovel-Ready
          Offtake: Under negotiation Financial model available: No Background We
          have developed a domestic solar PV with battery storage offering which
          allows us to fit small domestic (up to about 7KW) systems for free in
          exchange for a long term (25 year) PPA with the social landlord or
          private homeowner. All systems are Tier 1 compliant and we have all
          the necessary certifications we would need to roll this out across the
          UK. We are working with several large Housing Associations and, with
          the right contract finance / lender, could install thousands of these
          systems nationally. Seeking $1m facility to begin with, to rapidly
          scale to $10m+. Sital, might you have some initial questions for
          Leigh?
        </div>

        <Checkbox
          id="dont_show_intro_again"
          label="Don’t show this again when introducing projects"
          {...register("dontShowAgain")}
        />

        <div className="space-y-2">
          <Button
            type="submit"
            className="w-full"
            onClick={() => {
              modal.hide()

              toast("Introduction sent")
            }}
          >
            Send Introduction
          </Button>
          <Button
            variant="outline"
            colourScheme="white"
            className="w-full"
            onClick={modal.hide}
          >
            Cancel
          </Button>
        </div>
      </form>
    </BaseModal>
  )
})

export default SendIntroduction
