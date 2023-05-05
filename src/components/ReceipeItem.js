import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const ReceipeItem = () => {
  const { id } = useParams();
  const { data: recipe, loading, error } = useFetch(id);
  if (recipe.recipe) {
    console.log(recipe.recipe);
  }
  return <div>ReceipeItem</div>;
};

export default ReceipeItem;
