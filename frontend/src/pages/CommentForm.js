export default function CommentForm() {
  return (
    <div className="flex items-center justify-center max-w-lg mx-8 mx-auto mt-12 mb-4 rounded-md shadow-lg">
      <form className="w-full max-w-xl px-4 pt-2 bg-white rounded-lg">
        <div className="flex flex-wrap mb-6 -mx-3">
          <h2 className="px-4 pt-3 pb-2 text-lg text-gray-800">
            Add a new comment
          </h2>
          <div className="w-full px-3 mt-2 mb-2 md:w-full">
            <textarea
              className="w-full h-20 px-3 py-2 font-medium leading-normal placeholder-gray-700 bg-gray-100 border border-gray-400 rounded resize-none focus:outline-none focus:bg-white"
              name="body"
              placeholder="Type Your Comment"
              required
            ></textarea>
          </div>
          <div className="flex items-start w-full px-3 md:w-full">
            <div className="flex items-start w-1/2 px-2 mr-auto text-gray-700">
              <svg
                fill="none"
                className="w-5 h-5 mr-1 text-gray-600"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="pt-px text-xs md:text-sm">Some HTML is okay.</p>
            </div>
            <button className="group relative  h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow float-right bottom-0 right-0">
              <div className="absolute inset-0 w-3 bg-blue-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span className="relative text-black group-hover:text-white">
                Post Comment
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
