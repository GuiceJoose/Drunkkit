import { ChangeEvent } from "react";

interface Props {
  ingredientNumber: number;
  handleInputChange: (
    i: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleDelete: (i: number, e: React.MouseEvent<HTMLButtonElement>) => void;
}

const IngredientsFormField = ({
  ingredientNumber,
  handleInputChange,
  handleDelete,
}: Props) => {
  return (
    <div>
      <input
        type="text"
        className="form-item"
        id={`quantity${ingredientNumber}`}
        name="quantity"
        placeholder="Quantity"
        onChange={(e) => handleInputChange(ingredientNumber, e)}
      ></input>
      <input
        type="text"
        className="form-item"
        id={`ingredient${ingredientNumber}`}
        name="ingredient"
        placeholder="Ingredient"
        onChange={(e) => handleInputChange(ingredientNumber, e)}
      ></input>
      <button onClick={(e) => handleDelete(ingredientNumber, e)}>
        Delete ingredient
      </button>
    </div>
  );
};

export default IngredientsFormField;
