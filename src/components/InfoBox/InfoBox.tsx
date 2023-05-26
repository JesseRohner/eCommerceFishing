import cx from "classnames"

type InfoBoxProps = {
  colourScheme?: "green" | "red"

  children?: React.ReactNode

  className?: string
}

const InfoBox: React.FC<InfoBoxProps> = ({
  colourScheme = "green",

  children,

  className,
}) => (
  <div
    className={cx(
      "text-center text-sm leading-6 tracking-[0.16px] p-[6px]",
      {
        "bg-green-500 text-blue-900": colourScheme === "green",
        "bg-red-600 text-white": colourScheme === "red",
      },
      className,
    )}
  >
    {children}
  </div>
)

export default InfoBox
