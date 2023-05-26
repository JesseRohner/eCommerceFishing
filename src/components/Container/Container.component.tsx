import cx from "classnames"

export type ContainerProps = {
  className?: string

  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ className, children }) => (
  <div className={cx("w-full max-w-[1636px] mx-auto px-4 sm:px-8", className)}>
    {children}
  </div>
)

export default Container
