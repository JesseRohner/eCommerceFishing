import { zodResolver } from "@hookform/resolvers/zod"
import cx from "classnames"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import Alert from "@components/Alert"
import BaseModal, { BaseModalProps } from "@components/BaseModal"
import Button from "@components/Button"
import Checkbox from "@components/Checkbox"
import ExternalLink from "@components/ExternalLink"

import ConfirmEmailModal from "@modals/ConfirmEmail"

import { create, show, useModal } from "@services/ModalManager"

import {
  REGISTRATION_UPDATE_PAYLOAD,
  useUpdateRegistration,
} from "@hooks/api/useUserAccess"

import { booleanRequiredTrue } from "@utils/validation"

export const FormSchema = z.object({
  riskWarning: booleanRequiredTrue,
  termsAndPrivacy: booleanRequiredTrue,
})

export type FormSchemaType = z.infer<typeof FormSchema>

const formDataToPayload = (
  formData: FormSchemaType,
): REGISTRATION_UPDATE_PAYLOAD => ({
  acceptedterms: formData.termsAndPrivacy ? "Yes" : "No",
  acceptedrisk: formData.riskWarning ? "Yes" : "No",
})

export type RiskWarningModalProps = Pick<BaseModalProps, "canBeClosed"> & {
  email: string
}

const RiskWarning = create(({ email, canBeClosed }: RiskWarningModalProps) => {
  const modal = useModal()
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>
  const {
    trigger,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: { riskWarning: false, termsAndPrivacy: false },
  })
  const { mutate, error: serverError } = useUpdateRegistration()

  const onSubmit = (formData: FormSchemaType) => {
    const formDataAsPayload = formDataToPayload(formData)

    mutate(formDataAsPayload, {
      onSuccess: () => {
        modal.hide()

        // @ts-ignore
        show(ConfirmEmailModal, { email, canBeClosed: false })
      },
    })
  }

  return (
    <BaseModal
      title="RISK WARNING"
      modal={modal}
      canBeClosed={canBeClosed}
      className="space-y-5 sm:space-y-6 max-w-[384px] w-full"
    >
      <>
        {serverError && (
          <Alert iconPosition="start">
            There has been an unexpected error, please try again after waiting
            for a short time. We kindly apologise for this inconvenience.
          </Alert>
        )}
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <div
            className={cx(
              "w-full h-40 overflow-y-auto px-3 py-2",
              "border border-blue-300 rounded",
              "font-sans text-sm text-black leading-5 font-medium [&_p_strong]:font-bold",
            )}
          >
            <div className="border border-black px-2 py-1 space-y-3">
              <p>
                The content of this website and/or the Platform, and any
                promotion it contains or refers to, has not been approved by an
                authorised person within the meaning of the Financial Services
                and Markets Act 2000 (FSMA). Reliance on this website and/or the
                Platform or any material or promotion contained on it for the
                purpose of engaging in any investment activity may expose an
                individual to a significant risk of losing all of the property
                or other assets invested, or of incurring additional liability.
              </p>
              <p>
                This website and the Platform must only be accessed by persons
                who qualify as follows: (i) a person as is described in Article
                19 (investment professionals), (b) Article 48 (certified high
                net worth individuals), (c) Article 49 (high net worth
                companies, unincorporated associations etc.), (d) Article 50
                (sophisticated investors), (e) Article 50A (self-certified
                sophisticated investors) or (f) Article 51 (associations of high
                net worth or sophisticated investors) or other relevant Articles
                of the Financial Services and Markets Act 2000 (Financial
                Promotions) Order 2005 (<strong>FPO</strong>
                ), or is a person to whom unapproved financial promotions may
                otherwise lawfully be distributed (
                <strong>relevant persons</strong>
                ).
              </p>
              <p>
                The communication to which this website and/or the Platform
                relates is exempt from the general restriction in Section 21 of
                FSMA on making financial promotions where the promoter is not an
                authorised and regulated person for the purposes of FSMA on the
                grounds that it will only be made to relevant persons. Neither
                this website and/or the Platform nor any of its contents may be
                acted on or relied on by persons who are not relevant persons,
                the investment opportunities to which they relate are available
                only to relevant persons and no investment or investment
                activity will be accepted by the Platform or any other User from
                or with any person who is not a relevant person.
              </p>
              <p>
                <strong>
                  Any person who is in any doubt about any investment
                  opportunity referred to on this website and/or the Platform
                  should consult an authorised person specialising in advising
                  on investments of the kind in question.
                </strong>
              </p>
              <p>
                An investment professional is a person who has professional
                experience in matters relating to investments and who falls
                within those categories of persons set out in Article 19(5) of
                the FPO, being (a) an authorised person, (b) an exempt person
                where the communication relates to a controlled activity which
                is a regulated activity in relation to which the person is
                exempt, (c) any other person (i) whose ordinary activities
                involve him in carrying on the controlled activity to which the
                communication relates for the purposes of a business carried on
                by him; or (ii) who it is reasonable to expect will carry on
                such activity for the purposes of a business carried on by him,
                (d) a government, local authority or an international
                organisation or (e) to certain restricted persons who are
                directors, officers or employees of a person falling within
                categories (a) to (d).
              </p>
              <p>
                A certified high net worth individual is any individual who has
                signed, within the period of 12 months ending on the date on
                which this communication is made, a statement, complying with
                Part I of Schedule 5 of the FPO, that he is a high net worth
                individual.
              </p>
              <p>
                A high net worth individual is a person who (1) had, during the
                financial year immediately preceding the date on which the
                certificate is signed, an annual income of not less than
                £100,000; or (2) held, throughout the financial year immediately
                preceding the date on which the certificate is signed, net
                assets to the value of not less than £250,000. In determining
                the net assets of an individual, no account shall be taken of:
                (a) the main residence of the individual; (b) the value of any
                life insurance policy of the individual; or (c) the pension
                benefits of the individual.
              </p>
              <p>
                High net worth companies, unincorporated associations etc.
                falling within Article 49 are: (a) any body corporate which has,
                or which is a member of the same group as an undertaking which
                has, a called-up share capital or net assets of not less than
                (i) if the body corporate has more than 20 members or is a
                subsidiary undertaking of an undertaking which has more than 20
                members, £500,000; or (ii) otherwise £5 million, (b) any
                unincorporated association or partnership which has net assets
                of not less than £5 million, (c) the trustee of a high value
                trust (as defined in the FPO), (d) any person (“A”) whilst
                acting in the capacity of director, officer or employee of a
                person (“B”) falling within any of subparagraphs (a) to (c)
                where A’s responsibilities, when acting in that capacity,
                involve him in B’s engaging in investment activity, (e) any
                person to whom the communication may otherwise lawfully be made.
              </p>
              <p>
                A sophisticated investor is any individual who has a current
                certificate signed by an authorised person to the effect that he
                or she is sufficiently knowledgeable to understand the risks
                associated with that type of investment and who has himself or
                herself, within the period of 12 months ending with the date on
                which the communication is made, signed a statement complying
                with Article 50(1)(b) of the FPO.
              </p>
              <p>
                A self-certified sophisticated investor is any individual who
                has signed, within the period of 12 months ending with the day
                on which the communication is made, a statement complying with
                Part II of Schedule 5 of the FPO. In that statement, the
                individual must confirm, inter alia, that he or she is (a) a
                member of a network or syndicate of business angels and has been
                so for at least the last six months, or (b) has made more than
                one investment in an unlisted company in the two years prior to
                the date of signature, or (c) is working or has worked in the
                two years prior to the date of signature in a professional
                capacity in the private equity sector or in the provision of
                finance for small and medium enterprises; or (d) is currently or
                has been in the two years prior to the date of signature a
                director of a company with an annual turnover of at least £1
                million.
              </p>
              <p>
                Associations of high net worth or sophisticated investors means
                an association or a member of an association comprising wholly
                or predominantly of persons falling within Articles 48, 49, 50
                or 50A.
              </p>
              <p>
                <strong className="uppercase">
                  NO OTHER PERSONS SHOULD ACCESS ANY PART OF THE WEBSITE OR THE
                  PLATFORM.
                </strong>
              </p>
              <p>
                Persons in jurisdictions outside the UK should inform themselves
                about and observe all applicable legal requirements in their
                jurisdictions. In particular, the viewing of this website and/or
                the Platform or its content in certain jurisdictions may be
                restricted by law. No investment arrangements or activity will
                be entered into with any person outside the UK unless such
                arrangements or activity are lawful in all applicable
                jurisdictions.
              </p>
            </div>
          </div>

          <Checkbox
            id="risk-warning"
            label="I’ve acknowledged the RISK WARNING"
            className="mt-6"
            errorText={errors.riskWarning?.message}
            isInvalid={!!errors.riskWarning?.message}
            onChange={(_, __, newValue) => {
              setValue("riskWarning", Boolean(newValue))

              trigger("riskWarning")
            }}
          />
          <Checkbox
            id="privacy-policy"
            className="mt-4 [&_a]:underline hover:[&_a]:no-underline"
            checkboxAlign="top"
            errorText={errors.termsAndPrivacy?.message}
            isInvalid={!!errors.termsAndPrivacy?.message}
            onChange={(_, __, newValue) => {
              setValue("termsAndPrivacy", Boolean(newValue))

              trigger("termsAndPrivacy")
            }}
          >
            I agree to the{" "}
            <ExternalLink
              href="https://app.pfnexus.com/legal/terms_of_service.pdf"
              colourScheme="inherit"
              isDefaultIconHidden
            >
              Terms of Service
            </ExternalLink>{" "}
            and{" "}
            <ExternalLink
              href="https://app.pfnexus.com/legal/privacy_policy.pdf"
              colourScheme="inherit"
              isDefaultIconHidden
            >
              Privacy Policy
            </ExternalLink>
          </Checkbox>

          <Button type="submit" className="uppercase w-full mt-5">
            Create account
          </Button>
        </form>
      </>
    </BaseModal>
  )
})

export default RiskWarning
