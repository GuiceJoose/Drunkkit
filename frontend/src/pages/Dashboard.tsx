import { ReactNode, useEffect, useState } from "react";
import DrinkForm from "../components/DrinkForm";
import DrinkCard from "../components/DrinkCard";
import Modal from "../components/Modal";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { getDrinks, reset } from "../features/drinks/drinkSlice";
import { AppDispatch } from "../app/store";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [drinkModalOpen, setDrinkModalOpen] = useState(false);

  const { user } = useSelector((state: any) => state.auth);
  const { drinks, isLoading, isError, message } = useSelector(
    (state: any) => state.drinks
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getDrinks());
    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, dispatch]);

  const addDrinkHandler = () => {
    if (!drinkModalOpen) {
      setDrinkModalOpen(true);
    } else {
      setDrinkModalOpen(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <button onClick={addDrinkHandler}>Add a custom drink</button>
      {drinkModalOpen ? (
        <Modal
          content={<DrinkForm setDrinkModalOpen={setDrinkModalOpen} />}
          onClick={addDrinkHandler}
        />
      ) : (
        ""
      )}
      <ul>
        {drinks.map((drink: any) => {
          return (
            <li key={drink._id}>
              <DrinkCard drink={drink} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dashboard;
