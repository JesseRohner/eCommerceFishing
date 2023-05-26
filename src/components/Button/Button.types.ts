export type ButtonProps = {
  /**
   * If `true`, the button will show a spinner.
   */
  isLoading?: boolean
  /**
   * If `true`, the button will be disabled.
   */
  isDisabled?: boolean
  /**
   * If `true`, the button will fill the available horizontal space.
   */
  isFullWidth?: boolean
  /**
   * If `true`, the button won't apply disabled classes
   */
  noDisabledStyles?: boolean
  /**
   * If `true`, the button will render without vertical padding for its content
   */
  noVerticalPadding?: boolean
  /**
   * TODO: Get INTL String
   */
  loadingText?: string
  /**
   * The HTML button type to use.
   */
  type?: "button" | "reset" | "submit"
  /**
   * Button shape styling.
   */
  shape?: "rectangle" | "rectangle-2" | "pill"
  /**
   * Button and icons colour scheme.
   */
  colourScheme?:
    | "teal"
    | "blue"
    | "red"
    | "white"
    | "purple"
    | "yellow"
    | "darkBlue"
  /**
   * Button styling variant.
   */
  variant?: "solid" | "outline" | "ghost" | "tab"
  /**
   * If added, the button will show an icon before the button's label.
   * @type React.ReactElement
   */
  leftIcon?: React.ReactElement
  /**
   * If added, the button will show an icon after the button's label.
   * @type React.ReactElement
   */
  rightIcon?: React.ReactElement
  /**
   * If added, the button will show an icon as the right most element.
   * @type React.ReactElement
   */
  closeIcon?: React.ReactElement
  /**
   * Replace the spinner component when `isLoading` is set to `true`.
   * @type React.ReactElement
   */
  spinner?: React.ReactElement
  /**
   * The callback function executed when user clicks on the button
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  /**
   * The callback function executed when user clicks on the close icon
   */
  onCloseClick?: React.MouseEventHandler<HTMLButtonElement>
  /**
   * Classes appended to the current styles
   */
  className?: string
  /**
   * Classes applied when button is in disabled state
   */
  disabledClassName?: string

  children: React.ReactNode
}
