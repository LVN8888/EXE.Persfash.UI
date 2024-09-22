import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

export const NotFoundPage = () => {
  return (
    <section className="min-h-screen text-center flex flex-col justify-center items-center h-96 bg-gradient-to-r from-white to-[#4949e9]">
      <FaExclamationTriangle className="text-[#b3ff00] text-6xl mb-4" />
      <h1 className="text-6xl font-bold mb-4 text-gray-800">404 Not Found</h1>
      <p className="text-xl mb-5 text-gray-800">This page does not exist</p>
      <Link
        to="/Home"
        className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
      >
        Go Back
      </Link>
    </section>
  );
};
