import Alert from "@components/Alert"
import BaseModal from "@components/BaseModal"
import Button from "@components/Button"
import Checkbox from "@components/Checkbox"

import { create, useModal } from "@services/ModalManager"

const SubmitForApproval = create(() => {
  const modal = useModal()

  return (
    <BaseModal
      spacing="md"
      title="Submit for approval?"
      modal={modal}
      titlePosition="left"
      showCloseButton
      className="max-w-[640px] w-full"
    >
      <div className="mt-6">
        <Alert type="info">
          You can no longer update information after submitting a project
        </Alert>
      </div>

      <Checkbox
        id="confirm"
        label="I confirm all the details I’ve entered are correct and figures are well-researched"
        className="mt-8"
      />

      <Checkbox
        id="understand"
        label="I understand I will not be able to make further updates once I submit this project"
        className="mt-5"
      />

      <div className="flex justify-end border-t mt-8 border-blue-300 pt-4 sm:pt-6">
        <Button variant="outline" colourScheme="white">
          Cancel
        </Button>
        <Button className="ml-4">Submit for approval</Button>
      </div>
    </BaseModal>
  )
})

export default SubmitForApproval
