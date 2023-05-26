import Modal from "react-modal"

import { ModalManagerHandler } from "./ModalManager.service"

export const reactBaseModal = (modal: ModalManagerHandler): Modal.Props => ({
  isOpen: modal.isVisible,
  onRequestClose: modal.hide,
})
