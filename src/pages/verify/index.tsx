import { GetServerSidePropsContext } from "next"

import { NextPageWithLayout } from "@pages/_app"

import ExternalLayout from "@layouts/External"

import EmailVerificationModal from "@modals/EmailVerification"

import { show } from "@services/ModalManager"

const EmailVerification: NextPageWithLayout = (props) => {
  // @ts-ignore
  show(EmailVerificationModal, {
    canBeClosed: false,
    ...props,
  })

  return null
}

EmailVerification.getLayout = (page: React.ReactElement) => (
  <ExternalLayout>{page}</ExternalLayout>
)

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => ({
  props: {
    query,
  },
})

export default EmailVerification
