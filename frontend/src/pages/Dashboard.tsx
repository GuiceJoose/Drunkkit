import { ReactNode, useState } from "react";
import DrinkForm from "../components/DrinkForm";
import Modal from "../components/Modal";

const Dashboard = () => {
  const [drinkModalOpen, setDrinkModalOpen] = useState(false);

  const addDrinkHandler = () => {
    if (!drinkModalOpen) {
      setDrinkModalOpen(true);
    } else {
      setDrinkModalOpen(false);
    }
  };
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
    </div>
  );
};

export default Dashboard;
