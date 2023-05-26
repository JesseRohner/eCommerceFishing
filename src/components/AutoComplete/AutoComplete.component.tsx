import cx from "classnames"
import Image from "next/image"

export type AutocompleteItem = {
  id: number
  icon: string
  title: string
  description: string
}

export type AutoCompleteProps = {
  size?: "sm" | "md"

  data?: Array<AutocompleteItem>

  onItemClick: Function

  className?: string
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  size = "md",

  data,

  onItemClick,

  className,
}) => (
  <div
    className={cx(
      "bg-white rounded-lg drop-shadow-md",
      "font-medium text-blue-900 text-sm leading-5",
      "overflow-hidden overflow-y-auto",
      "divide-y-[1px] divide-blue-300",
      className,
    )}
  >
    {data?.length ? (
      data?.map((item) => (
        <div
          key={item.id}
          className={cx(
            "flex items-center w-full hover:bg-blue-100 space-x-3",
            {
              "p-2": size === "sm",
              "p-3": size === "md",
              "cursor-pointer": typeof onItemClick !== "undefined",
            },
          )}
          onClick={() => onItemClick(item)}
        >
          <div
            className={cx("relative h-10 shrink-0 self-start", {
              "w-10": item.icon,
            })}
          >
            {item.icon && <Image src={item.icon} alt="logo" layout="fill" />}
          </div>

          <div className="flex flex-col flex-1 overflow-hidden">
            <p>{item.title}</p>

            <p className="font-normal text-blue-600 text-xs leading-4 whitespace-nowrap text-ellipsis">
              {item.description}
            </p>
          </div>
        </div>
      ))
    ) : (
      <span className="block font-normal text-center px-2 py-4">
        No results found
      </span>
    )}
  </div>
)

export default AutoComplete
