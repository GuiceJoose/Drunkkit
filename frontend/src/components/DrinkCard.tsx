import { v4 as uuidv4 } from "uuid";

const DrinkCard = ({ drink }: any) => {
  return (
    <div className="drinkCard">
      <div>{drink.glass}</div>
      <h3 className="drinkName">{drink.name}</h3>
      <ul>
        {drink.recipe.map((ingredient: any) => {
          const keyID = uuidv4();
          return (
            <li key={keyID}>
              {ingredient.quantity} {ingredient.ingredient}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DrinkCard;
