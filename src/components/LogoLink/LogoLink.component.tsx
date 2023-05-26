import cx from "classnames"
import Image from "next/image"
import Link from "next/link"

type LogoLinkProps = {
  type: "light" | "dark"
  hasSpacing?: boolean
  hideOnMobile?: boolean
}

const LogoLink: React.FC<LogoLinkProps> = ({
  type,
  hasSpacing,
  hideOnMobile,
}) => (
  <Link href="/">
    <a
      className={cx({
        "px-7 py-4": hasSpacing,
        "hidden sm:inline-flex": hideOnMobile,
        "inline-flex": !hideOnMobile,
      })}
    >
      {type === "light" ? (
        <Image src="/light-theme-logo.svg" width={121} height={22} />
      ) : (
        <Image src="/dark-theme-logo.svg" width={121} height={22} />
      )}
    </a>
  </Link>
)

export default LogoLink
