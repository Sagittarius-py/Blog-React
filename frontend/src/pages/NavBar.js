import { useContext } from "react";
import SessionContext from "../context";

export default function NavBar() {
  const { session } = useContext(SessionContext);

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 top-0 dark:bg-gray-800  fixed">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <a className="flex-none text-xl font-semibold dark:text-white" href="/">
          Sieniawski - Tomczyszyn Auto Blog
        </a>
        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:pl-5">
          <a className="font-medium text-blue-500" href="/" aria-current="page">
            Main Page
          </a>
          <a
            className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
            href="/createpost"
          >
            Create Post
          </a>
          {session.loggedIn ? (
            <>
              <a
                className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
                href="/userProfile"
              >
                My Profile
              </a>
            </>
          ) : (
            <>
              <a
                className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
                href="/register"
              >
                Sign-Up
              </a>
              <a
                className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
                href="/login"
              >
                Log-In
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
