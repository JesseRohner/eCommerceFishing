export type InputProps = {
  /**
   * If `true`, the input will be readonly
   */
  isReadonly?: boolean
  /**
   * If `true`, the input will be disabled
   */
  isDisabled?: boolean
  /**
   * If `true`, the input will have invalid styles
   */
  isInvalid?: boolean
  /**
   * If `true`, no disabled styles will be applied when isDisabled is `true`
   */
  noDisabledStyles?: boolean
  /**
   * If `true`, the outline will be 1px upon focus
   */
  smallFocusOutline?: boolean
  /**
   * The HTML input type
   */
  type?: "text" | "password"
  /**
   * Input size
   */
  size?: "md" | "lg" | "lg-mobile"
  /**
   * Input id used for label linking
   */
  id: string

  /**
   * Controlled `value` value from the parent component
   */
  value?: string
  /**
   * Input name value
   */
  name?: string
  /**
   * Input placeholder
   */

  placeholder?: string
  /**
   * If provided, a label will be rendered above the input
   */
  labelText?: string
  /**
   * If provided, an optional string will be rendered above the input
   */
  optionalText?: string
  /**
   * If provided, a help message will be rendered under the input
   */
  helpText?: string | React.ReactNode
  /**
   * If provided, and isInvalid is `true`, an error message will be rendered under the inpub
   */
  errorText?: string
  /**
   * If added, an icon will be rendered in front of the input field
   */
  leftIcon?: React.ReactElement
  /**
   * If added, an icon will be rendered in front of the input field
   */
  rightIcon?: React.ReactElement
  /**
   * If added, a custom icon will be rendered within a button at the end of the input field
   */
  clearIcon?: React.ReactElement
  /**
   * Custom key down handler
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  /**
   * Custon change handler
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  /**
   * Callback function for the clearIcon button
   */
  onClearClick?: React.MouseEventHandler<HTMLButtonElement>
  /**
   * Callback function for the rightIcon button
   */
  onRightIconClick?: (event?: MouseEvent) => void
  /**
   * Callback function for the leftIcon button
   */
  onLeftIconClick?: (event?: MouseEvent) => void

  className?: string
}
