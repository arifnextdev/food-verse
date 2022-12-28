import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const Navber = ({ searchHandler, searchQuery, setsearchQuery, inputField }) => {
  const navActive = ({ isActive }) => {
    return {
      color: isActive ? "#f43f5e" : null,
    };
  };

  return (
    <div className="navber flex justify-between items-center container mx-auto py-8 flex-col lg:flex-row gap-5">
      <h2 className="logo text-2xl font-bold lowercase italic font-sans">
        Food <span className="text-rose-500">Verse</span>
      </h2>
      <form className="search-ber" onSubmit={searchHandler}>
        <input
          ref={inputField}
          value={searchQuery}
          onChange={(e) => setsearchQuery(e.target.value)}
          type="search"
          placeholder="Search recipe..."
          required
          className="bg-white/75 p-3 px-8 lg:w-96 rounded-full outline-none shadow-lg shadow-rose-100 focus:shadow-rose-200 duration-300"
        />
      </form>
      <ul className="menu flex gap-5">
        <li>
          <NavLink
            style={navActive}
            end
            to="/"
            className=" text-gray-400 hover:text-gray-600 duration-300"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            style={navActive}
            to="/favourites"
            className=" text-gray-400 hover:text-gray-600 duration-300"
          >
            Favourites{" "}
            <span className="favourited-count  font-bold text-sky-400">
              (10)
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navber;
