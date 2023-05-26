import debounce from "lodash.debounce"
import { forwardRef, useEffect, useMemo, useState } from "react"

import { AutocompleteItem } from "@components/AutoComplete"
import ComboBox, { ComboBoxProps } from "@components/ComboBox"

import CreateCompanyModal from "@modals/CreateCompany"

import { ModalManagerHandler, show } from "@services/ModalManager"

import { useFindCompaniesByName } from "@hooks/api/useCompanies"

import { __DEV__ } from "@utils/env"

export type CompanyComboboxSelectorProps = Pick<
  ComboBoxProps<AutocompleteItem>,
  | "id"
  | "name"
  | "labelText"
  | "errorText"
  | "isInvalid"
  | "onChange"
  | "className"
> & {
  modalObj?: ModalManagerHandler
  nextModalPayload?: { [key in string]: any }

  getValue: () => string
  setFormValue: (item?: AutocompleteItem) => void
  triggerUpdate: () => void
  resetError: () => void

  debounceWait?: number
}

const CompanyComboboxSelector = forwardRef<
  HTMLInputElement,
  CompanyComboboxSelectorProps
>(
  (
    {
      id,

      modalObj,
      nextModalPayload,

      getValue,
      setFormValue,
      triggerUpdate,
      resetError,

      labelText = "Company",
      errorText,

      isInvalid,

      className,

      onChange: _onChange,

      ...rest
    },
    ref,
  ) => {
    const [companySearchValue, setCompanySearchValue] = useState("")
    const { data: { data: { list = [] } = {} } = {}, isLoading } =
      useFindCompaniesByName(companySearchValue, companySearchValue.length > 1)

    const comboboxData = useMemo(
      () =>
        list.map((i) => ({
          id: i.id,
          icon: i.icon_url,
          title: i.name,
          description: i.description,
        })),
      [list],
    )

    const debouncedChangeEvent = useMemo(
      () =>
        debounce((e: React.KeyboardEvent<HTMLInputElement>) => {
          if (_onChange) {
            _onChange(e)
          }

          const {
            target: { value },
          } = e

          setCompanySearchValue(value)

          triggerUpdate()
        }, 500),
      [],
    )

    useEffect(() => () => debouncedChangeEvent.cancel(), [])

    return (
      <ComboBox
        id={`country-combobox__${id}`}
        ref={ref}
        size="sm"
        data={comboboxData as Array<AutocompleteItem>}
        labelText={labelText}
        errorText={errorText}
        helpText={
          <>
            Can’t find your company?{" "}
            <a
              className="cursor-pointer underline hover:no-underline"
              onClick={() => {
                modalObj?.hide()

                // @ts-ignore
                show(CreateCompanyModal, nextModalPayload)
              }}
            >
              Add yours
            </a>
          </>
        }
        isLoading={isLoading}
        isInvalid={isInvalid}
        hasValue={Boolean(getValue())}
        className={className}
        autocompleteClassName="-mt-5"
        onChange={debouncedChangeEvent}
        onItemClick={(i) => {
          setCompanySearchValue(i.title)
          setFormValue(i)
        }}
        onClearClick={() => {
          setCompanySearchValue("")
          setFormValue()
          resetError()
        }}
        {...rest}
      />
    )
  },
)

if (__DEV__) {
  CompanyComboboxSelector.displayName = "CompanyComboboxSelector"
}

export default CompanyComboboxSelector
