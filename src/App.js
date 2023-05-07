import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Home from "./components/Home";
import Navber from "./components/Navber";
import Footer from "./components/Footer";
import Favourites from "./components/Favourites";
import NotFoundPage from "./components/NotFoundPage";
import ReceipeItem from "./components/ReceipeItem";

const App = () => {
  const [searchQuery, setsearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedItems, setSavedItems] = useState(() => {
    const localData = localStorage.getItem("recipes");
    return localData ? JSON.parse(localData) : [];
  });
  const inputField = useRef(null);
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    getData(searchQuery);

    setsearchQuery("");
    inputField.current.blur();
    setRecipes([]);
    setError("");
    navigate("/");
  };

  const getData = async (searchQuery) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchQuery}`
      );
      if (!res.ok) throw new Error("Something went worng!");
      const data = await res.json();
      if (data.results === 0) throw new Error("No recipe found!");
      setRecipes(data?.data?.recipes);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const checkLocalData = (data) => {
    const localData = JSON.parse(localStorage.getItem("recipes"));
    const existedData = localData?.some((item) => item.id === data.id);

    if (!existedData) {
      setSavedItems([...savedItems, data]);
    } else {
      const filteredData = localData.filter((item) => item.id !== data.id);
      setSavedItems(filteredData);
    }
  };

  const favouriteHandler = (id) => {
    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => checkLocalData(data.data.recipe));

    navigate("/favourites");
  };

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(savedItems));
  }, [savedItems]);

  return (
    <>
      <div className="app min-h-screen bg-rose-50 text-gray-600 text-lg">
        <Navber
          searchQuery={searchQuery}
          setsearchQuery={setsearchQuery}
          inputField={inputField}
          searchHandler={searchHandler}
          savedItems={savedItems}
        />
        <Routes>
          <Route
            path="/"
            element={<Home recipes={recipes} loading={loading} error={error} />}
          ></Route>
          <Route path="/recipe" element={<Home />}></Route>
          <Route
            path="/favourites"
            element={<Favourites savedItems={savedItems} />}
          ></Route>
          <Route
            path="/recipe-item/:id"
            element={
              <ReceipeItem
                favouriteHandler={favouriteHandler}
                savedItems={savedItems}
              />
            }
          ></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
