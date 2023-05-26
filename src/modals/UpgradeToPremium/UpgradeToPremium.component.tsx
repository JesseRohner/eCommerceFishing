import BaseModal from "@components/BaseModal"
import Button from "@components/Button"
import Checkbox from "@components/Checkbox"

import { create, useModal } from "@services/ModalManager"

import LockIcon from "@public/icons/lock.svg"

export type UpgradeToPremiumProps = {
  title?: string
  subtitle?: string
}

const UpgradeToPremium = create(
  ({
    title = "Upgrade to Premium",
    subtitle = "Send unlimited introductions.",
  }: UpgradeToPremiumProps) => {
    const modal = useModal()

    return (
      <BaseModal
        spacing="sm"
        title={title}
        titleIcon={<LockIcon className="w-10 h-10 fill-white" />}
        titleIconBackground="purple"
        modal={modal}
        className="max-w-[440px] w-full text-blue-600 text-sm leading-5 tracking-[0.17px] !px-[60px]"
      >
        <div className="space-y-4">
          <p className="text-center !mt-1">{subtitle}</p>

          {/* Divider */}
          <div className="w-full h-px bg-blue-300" />

          <Checkbox
            id="utp-1"
            label="Get unlimited introductions to 200+ renewable energy and infrastructure projects already seeking investment."
            className="leading-6"
            shape="circle"
            checked
            isReadonly
          />

          <Checkbox
            id="utp-1"
            label="Get unlimited access to 4,000+ renewable investors & developers, with search filtering and downloads included."
            className="leading-6"
            shape="circle"
            checked
            isReadonly
          />

          <Checkbox
            id="utp-1"
            label="Unlock Featured Projects and get more views on your projects looking for investment."
            className="leading-6"
            shape="circle"
            checked
            isReadonly
          />

          {/* Divider */}
          <div className="w-full h-px bg-blue-300" />

          <div className="text-center space-y-3">
            <Button onClick={modal.hide}>Upgrade to Premium</Button>

            <a
              className="inline-block cursor-pointer underline hover:no-underline"
              onClick={modal.hide}
            >
              Stay on the Free Plan
            </a>
          </div>
        </div>
      </BaseModal>
    )
  },
)

export default UpgradeToPremium
