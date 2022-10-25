import axios from "axios";

const API_URL = "/api/drinks/";

const createDrink = async (drinkData: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, drinkData, config);
  return response.data;
};

const getDrinks = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const drinkService = { createDrink, getDrinks };

export default drinkService;
