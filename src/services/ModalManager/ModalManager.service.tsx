import React, { useCallback, useContext, useEffect, useReducer } from "react"
import {
  hideModal,
  initialState,
  ModalManagerAction,
  ModalManagerState,
  ModalManagerStore,
  reducer,
  removeModal,
  setModalFlags,
  showModal,
} from "./ModalManager.store"

type ModalManagerArgs<T> = T extends
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>
  ? Partial<Omit<React.ComponentProps<T>, "id">>
  : Record<string, unknown>

interface ModalManagerCallbacks {
  [modalId: string]: {
    resolve: (args: unknown) => void
    reject: (args: unknown) => void
    promise: Promise<unknown>
  }
}

export interface ModalManagerHandler<Props = Record<string, unknown>>
  extends ModalManagerState {
  isVisible: boolean
  keepMounted: boolean

  show: (args?: Props) => Promise<unknown>
  hide: () => Promise<unknown>
  resolve: (args?: unknown) => void
  reject: (args?: unknown) => void
  remove: () => void
  resolveHide: (args?: unknown) => void
}

export interface ModalManagerHocProps {
  id: string
  defaultVisible?: boolean
  keepMounted?: boolean
}

const symModalId = Symbol("ModalManagerId")
/***
 * Modal registry used in context provider
 */
const MODAL_REGISTRY: {
  [id: string]: { component: React.FC<any>; props?: Record<string, unknown> }
} = {}

export const MOUNTED_MODAL_REGISTRY: { [id: string]: any } = {}

export const ModalManagerContext =
  React.createContext<ModalManagerStore>(initialState)
const ModalManagerIdContext = React.createContext<string | null>(null)

let uiSeed = 0
let dispatch: React.Dispatch<ModalManagerAction> = () => {
  throw new Error(
    "No dispatch method detected, check if app is wrapped with ModalManagerProvider",
  )
}

const getUid = () => `_modal_manager_${uiSeed++}`

const modalCallbacks: ModalManagerCallbacks = {}
const hideModalCallbacks: ModalManagerCallbacks = {}

const getModalId = (modal: string | React.FC<any>): string => {
  if (typeof modal === "string") {
    return modal as string
  }

  // @ts-ignore
  if (!modal[symModalId]) {
    // @ts-ignore
    modal[symModalId] = getUid()
  }

  // @ts-ignore
  return modal[symModalId]
}

export function show<T extends any, C extends React.FC>(
  modal: C,
  args?: Omit<React.ComponentProps<C>, "id">,
): Promise<T>
export function show<T extends any>(
  modal: string,
  args?: Record<string, unknown>,
): Promise<T>
export function show(
  modal: React.FC<any> | string,
  args?: ModalManagerArgs<React.FC<any>> | Record<string, unknown>,
) {
  const modalId = getModalId(modal)

  if (typeof modal !== "string" && !MODAL_REGISTRY[modalId]) {
    register(modalId, modal as React.FC)
  }

  dispatch(showModal(modalId, args))

  if (!modalCallbacks[modalId]) {
    let resolveFn!: (args?: unknown) => void
    let rejectFn!: (args?: unknown) => void

    const promise = new Promise((resolve, reject) => {
      resolveFn = resolve
      rejectFn = reject
    })

    modalCallbacks[modalId] = {
      resolve: resolveFn,
      reject: rejectFn,
      promise,
    }
  }

  return modalCallbacks[modalId].promise
}

export function hide<T>(modal: string | React.FC<any>): Promise<T>
export function hide(modal: string | React.FC<any>) {
  const modalId = getModalId(modal)

  dispatch(hideModal(modalId))

  delete modalCallbacks[modalId]

  if (!hideModalCallbacks[modalId]) {
    let resolveFn!: (args?: unknown) => void
    let rejectFn!: (args?: unknown) => void

    const promise = new Promise((resolve, reject) => {
      resolveFn = resolve
      rejectFn = reject
    })

    hideModalCallbacks[modalId] = {
      resolve: resolveFn,
      reject: rejectFn,
      promise,
    }
  }

  return hideModalCallbacks[modalId].promise
}

export const remove = (modalId: string): void => {
  dispatch(removeModal(modalId))

  delete modalCallbacks[modalId]
  delete hideModalCallbacks[modalId]
}

const setFlags = (modalId: string, flags: Record<string, unknown>): void => {
  dispatch(setModalFlags(modalId, flags))
}

export function useModal(): ModalManagerHandler
export function useModal<T extends string>(
  modal: T,
  args?: Record<string, unknown>,
): ModalManagerHandler
export function useModal<T extends React.FC<any>>(
  modal: T,
  args?: ModalManagerArgs<T>,
): ModalManagerHandler<ModalManagerArgs<T>>
export function useModal(modal?: any, args?: any): any {
  const modalsContext = useContext(ModalManagerContext)
  const modalsIdsContext = useContext(ModalManagerIdContext)

  let modalId: string | null = null

  const isUseComponent = modal && typeof modal !== "string"

  if (!modal) {
    modalId = modalsIdsContext
  } else {
    modalId = getModalId(modal)
  }

  if (!modalId) {
    throw new Error("No modal id found in ModalManager.useModal.")
  }

  const mid = modalId as string

  useEffect(() => {
    if (isUseComponent && !MODAL_REGISTRY[mid]) {
      register(mid, modal as React.FC, args)
    }
  }, [isUseComponent, mid, modal, args])

  const modalInfo = modalsContext[mid]

  const showCallback = useCallback(
    (args?: Record<string, unknown>) => show(mid, args),
    [mid],
  )
  const hideCallback = useCallback(() => hide(mid), [mid])
  const removeCallback = useCallback(() => remove(mid), [mid])
  const resolveCallback = useCallback(
    (args?: unknown) => {
      modalCallbacks[mid]?.resolve(args)

      delete modalCallbacks[mid]
    },
    [mid],
  )
  const rejectCallback = useCallback(
    (args?: unknown) => {
      modalCallbacks[mid]?.reject(args)

      delete modalCallbacks[mid]
    },
    [mid],
  )
  const resolveHideCallback = useCallback(
    (args?: unknown) => {
      hideModalCallbacks[mid]?.resolve(args)

      delete hideModalCallbacks[mid]
    },
    [mid],
  )

  return {
    id: mid,
    args: modalInfo?.args,
    isVisible: !!modalInfo?.isVisible,
    keepMounted: !!modalInfo?.keepMounted,

    show: showCallback,
    hide: hideCallback,
    remove: removeCallback,
    resolve: resolveCallback,
    reject: rejectCallback,
    resolveHide: resolveHideCallback,
  }
}

export const create =
  <P extends {}>(
    Component: React.ComponentType<P>,
  ): React.FC<P & ModalManagerHocProps> =>
  ({ defaultVisible, keepMounted, id, ...props }) => {
    const { args, show } = useModal(id)

    const modalsContext = useContext(ModalManagerContext)
    const shouldMount = !!modalsContext[id]

    useEffect(() => {
      if (defaultVisible) {
        show()
      }

      MOUNTED_MODAL_REGISTRY[id] = true

      return () => {
        delete MOUNTED_MODAL_REGISTRY[id]
      }
    }, [id, show, defaultVisible])

    useEffect(() => {
      if (keepMounted) {
        setFlags(id, { keepMounted: true })
      }
    }, [id, keepMounted])

    const delayVisible = modalsContext[id]?.delayVisible

    useEffect(() => {
      if (delayVisible) {
        show(args)
      }
    }, [delayVisible, args, show])

    if (!shouldMount) {
      return null
    }

    return (
      <ModalManagerIdContext.Provider value={id}>
        <Component {...(props as unknown as P)} {...args} />
      </ModalManagerIdContext.Provider>
    )
  }

/***
 * Adds a modal component to the global modal registry
 */
export const register = <T extends React.FC<any>>(
  id: string,
  component: T,
  props?: ModalManagerArgs<T>,
): void => {
  if (!MODAL_REGISTRY[id]) {
    MODAL_REGISTRY[id] = { component, props }
  } else {
    MODAL_REGISTRY[id].props = props
  }
}

/***
 * Removes a modal component from the global modal registry
 */
export const unregister = (id: string): void => {
  delete MODAL_REGISTRY[id]
}

export const DefineModal: React.FC<{
  id: string
  component: React.FC<any>
}> = ({ id, component }) => {
  useEffect(() => {
    register(id, component)

    return () => {
      unregister(id)
    }
  }, [id, component])

  return null
}

// ModalManager Context Provider - Start

const ModalManagerPlaceholder: React.FC = () => {
  const modals = useContext(ModalManagerContext)

  const visibleModalsIds = Object.keys(modals).filter((id) => !!modals[id])

  visibleModalsIds.forEach((id) => {
    if (!MODAL_REGISTRY[id] && MOUNTED_MODAL_REGISTRY[id]) {
      console.warn(
        `No modal found for id: ${id}. Please check the id or if it is registered or declared via JSX.`,
      )

      return
    }
  })

  const modalsToRender = visibleModalsIds
    .filter((id) => MODAL_REGISTRY[id])
    .map((id) => ({ id, ...MODAL_REGISTRY[id] }))

  return (
    <>
      {modalsToRender.map((modal) => (
        <modal.component key={modal.id} id={modal.id} {...modal.props} />
      ))}
    </>
  )
}

const InnerContextProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const state = useReducer(reducer, initialState)
  const modals = state[0]

  dispatch = state[1]

  return (
    <ModalManagerContext.Provider value={modals}>
      {children}
      <ModalManagerPlaceholder />
    </ModalManagerContext.Provider>
  )
}

export const ModalManagerProvider: React.FC<{
  modals?: ModalManagerStore
  dispatch?: React.Dispatch<ModalManagerAction>
  children: React.ReactElement
}> = ({ modals: givenModals, dispatch: givenDispatch, children }) => {
  if (!givenDispatch || !givenModals) {
    return <InnerContextProvider>{children}</InnerContextProvider>
  }

  dispatch = givenDispatch

  return (
    <ModalManagerContext.Provider value={givenModals}>
      {children}
      <ModalManagerPlaceholder />
    </ModalManagerContext.Provider>
  )
}

// ModalManager Context Provider - End
