import LogoSymbol from "@public/logo-symbol.svg"

const ExternalLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="flex h-screen bg-gradient-to-r from-blue-900 to-[#5229A3]">
    <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden">
      <LogoSymbol className="w-[400px] fill-white/10 absolute -left-32 sm:left-16 -top-32" />

      <LogoSymbol className="w-[400px] fill-white/10 absolute -right-32 sm:right-16 -bottom-32" />
    </div>

    {children}
  </div>
)

export default ExternalLayout
