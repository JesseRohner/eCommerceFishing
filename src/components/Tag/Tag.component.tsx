import cx from "classnames"

export type TagProps = {
  colourScheme?: "purple" | "green"

  value: string
}

const Tag: React.FC<TagProps> = ({ value, colourScheme = "purple" }) => (
  <span
    className={cx(
      "px-1 py-px",
      "rounded-b-sm",
      "text-[10px] text-white font-medium uppercase leading-3 tracking-[0.4px]",
      {
        "bg-purple-500": colourScheme === "purple",
        "bg-green-600": colourScheme === "green",
      },
    )}
  >
    {value}
  </span>
)

export default Tag
