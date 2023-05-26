import LoadingIcon from "@public/icons/load-static.svg"

const LinkedinLoading: React.FC = () => (
  <div className="bg-[#F3F6F8] rounded-lg h-60 w-full flex flex-col items-center justify-center">
    {/* TODO: Hardcoded colour above */}
    <LoadingIcon />
    <div className="w-7/12 text-center font-medium text-sm text-blue-600 leading-5 mt-4">
      Please wait while we check your LinkedIn details
    </div>
  </div>
)

export default LinkedinLoading
