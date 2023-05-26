import { MOUNTED_MODAL_REGISTRY } from "./ModalManager.service"

export interface ModalManagerState {
  id: string
  args?: Record<string, unknown>

  isVisible?: boolean
  delayVisible?: boolean
  keepMounted?: boolean
}

export interface ModalManagerStore {
  [key: string]: ModalManagerState
}

export type ModalManagerActionType =
  | "modal_manager/show"
  | "modal_manager/hide"
  | "modal_manager/remove"
  | "modal_manager/set-flags"

export interface ModalManagerAction {
  type: ModalManagerActionType
  payload: {
    modalId: string
    args?: Record<string, unknown>
    flags?: Record<string, unknown>
  }
}

export const initialState: ModalManagerStore = {}

/***
 * Modal Manager Reducer
 */
export const reducer = (
  state: ModalManagerStore = initialState,
  action: ModalManagerAction,
): ModalManagerStore => {
  switch (action.type) {
    case "modal_manager/show": {
      const { modalId, args } = action.payload

      return {
        ...state,
        [modalId]: {
          ...state[modalId],
          id: modalId,
          args,
          // If modal is not mounted, it needs to be mounted first then make it visible
          // The logic is inside the HOC wrapper
          isVisible: !!MOUNTED_MODAL_REGISTRY[modalId],
          delayVisible: !MOUNTED_MODAL_REGISTRY[modalId],
        },
      }
    }

    case "modal_manager/hide": {
      const { modalId } = action.payload

      if (!state[modalId]) {
        return state
      }

      return {
        ...state,
        [modalId]: {
          ...state[modalId],
          isVisible: false,
        },
      }
    }

    case "modal_manager/remove": {
      const { modalId } = action.payload
      const nextState = { ...state }

      delete nextState[modalId]

      return nextState
    }

    case "modal_manager/set-flags": {
      const { modalId, flags } = action.payload

      return {
        ...state,
        [modalId]: {
          ...state[modalId],
          ...flags,
        },
      }
    }

    default:
      return state
  }
}

/***
 * Modal Manager Action Creators
 */
export const showModal = (
  modalId: string,
  args?: Record<string, unknown>,
): ModalManagerAction => ({
  type: "modal_manager/show",
  payload: { modalId, args },
})

export const hideModal = (modalId: string): ModalManagerAction => ({
  type: "modal_manager/hide",
  payload: { modalId },
})

export const removeModal = (modalId: string): ModalManagerAction => ({
  type: "modal_manager/remove",
  payload: { modalId },
})

export const setModalFlags = (
  modalId: string,
  flags: Record<string, unknown>,
): ModalManagerAction => ({
  type: "modal_manager/set-flags",
  payload: { modalId, flags },
})
