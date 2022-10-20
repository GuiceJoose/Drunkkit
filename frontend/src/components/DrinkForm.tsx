import React, { useState, useEffect, ChangeEvent } from "react";
import IngredientsFormField from "./IngredientsFormField";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import { AppDispatch } from "../app/store";
import Spinner from "../components/Spinner";
import { createDrink } from "../features/drinks/drinkSlice";

const DrinkForm = () => {
  interface DrinkInput {
    name: string;
    recipe: { id: string; quantity: string; ingredient: string }[];
    instructions: string;
    glass: string;
  }
  interface Recipe {
    id: string;
    quantity: string;
    ingredient: string;
  }
  const [drinkFormData, setDrinkFormData] = useState<DrinkInput>({
    name: "",
    recipe: [
      { id: uuidv4(), quantity: "0", ingredient: "" },
      { id: uuidv4(), quantity: "0", ingredient: "" },
    ],
    instructions: "",
    glass: "",
  });

  const { name, recipe, instructions, glass } = drinkFormData;

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { drink, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => {
      return state.drinks;
    }
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/");
    }
    dispatch(reset());
  }, [drink, isError, isSuccess, message, navigate, dispatch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDrinkFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleIngredientInputChange = (
    i: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const ingredients: { id: string; quantity: string; ingredient: string }[] =
      drinkFormData.recipe;
    ingredients[i][e.target.name as keyof Recipe] = e.target.value;
    setDrinkFormData((previousState) => ({
      ...previousState,
      recipe: ingredients,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDrinkFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement>) => {
    const ingredients = drinkFormData.recipe;
    ingredients.push({ id: uuidv4(), quantity: "0", ingredient: "" });
    setDrinkFormData((previousState) => ({
      ...previousState,
      recipe: ingredients,
    }));
  };
  const handleDeleteIngredient = (
    i: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const ingredients = drinkFormData.recipe;
    ingredients.splice(i, 1);
    setDrinkFormData((previousState) => ({
      ...previousState,
      recipe: ingredients,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if ('drink already exists' === true) {
    //   do something
    // }
    const drinkData = { name, recipe, instructions, glass };
    dispatch(createDrink(drinkData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Drink name"
          onChange={handleInputChange}
        ></input>
        <div className="recipe-inputs">
          {drinkFormData.recipe.map((ingredient, index) => {
            return (
              <IngredientsFormField
                key={ingredient.id}
                ingredientNumber={index}
                handleInputChange={handleIngredientInputChange}
                handleDelete={handleDeleteIngredient}
              />
            );
          })}
        </div>
        <button type="button" onClick={handleAddIngredient}>
          Add ingredient
        </button>
        <input
          type="text"
          className="form-item"
          id="instructions"
          name="instructions"
          placeholder="Please enter instructions"
          onChange={handleInputChange}
        ></input>
        <select
          name="glass"
          id="glass"
          className="form-select"
          onChange={handleSelectChange}
        >
          <option value="rocks">Rocks Glass</option>
          <option value="martini">Martini Glass</option>
          <option value="highball">Highball Glass</option>
          <option value="shot">Shot Glass</option>
        </select>
        <button type="submit" className="form-btn">
          Submit Drink
        </button>
      </form>
    </div>
  );
};

export default DrinkForm;
