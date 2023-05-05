import { Routes, Route } from "react-router-dom";
import React, { useRef, useState } from "react";
import Home from "./components/Home";
import Navber from "./components/Navber";
import Footer from "./components/Footer";
import Favourites from "./components/Favourites";
import NotFoundPage from "./components/NotFoundPage";
import Receipe from "./components/Receipe";
import RececipeItem from "./components/ReceipeItem";
import ReceipeItem from "./components/ReceipeItem";

const App = () => {
  const [searchQuery, setsearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputField = useRef(null);

  const searchHandler = (e) => {
    e.preventDefault();

    getData(searchQuery);

    setsearchQuery("");
    inputField.current.blur();
    setRecipes([]);
  };

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${searchQuery}`
      );
      if (!res.ok) throw new Error("No recipe found!");
      const data = await res.json();
      console.log(data);
      setRecipes(data.recipes);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div className="app min-h-screen bg-rose-50 text-gray-600 text-lg">
        <Navber
          searchQuery={searchQuery}
          setsearchQuery={setsearchQuery}
          inputField={inputField}
          searchHandler={searchHandler}
        />
        <Routes>
          <Route
            path="/"
            element={<Home recipes={recipes} loading={loading} error={error} />}
          ></Route>
          <Route path="/recipe" element={<Home />}></Route>
          <Route path="/Favourites" element={<Favourites />}></Route>
          <Route path="/recipe-item/:id" element={<ReceipeItem />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
