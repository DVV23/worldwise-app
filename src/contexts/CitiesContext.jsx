import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const CitiesContext = createContext();
const instance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-type": "application/json",
  },
});

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "cities/loaded": {
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    }
    case "cities/loaded/id": {
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    }
    case "city/created": {
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    }
    case "city/deleted": {
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    }
    case "rejected": {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function getCities() {
      dispatch({ type: "loading" });
      try {
        const response = await instance.get(`cities`);
        dispatch({ type: "cities/loaded", payload: response.data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities",
        });
      }
    }
    getCities();
  }, []);

  const getCityById = useCallback(
    async function getCityById(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const response = await instance.get(`cities/${id}`);
        dispatch({ type: "cities/loaded/id", payload: response.data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city.",
        });
      }
    },
    [currentCity.id]
  );

  async function addCity(cityName, country, emoji, date, notes, [lat, lng]) {
    dispatch({ type: "loading" });

    try {
      const response = await instance.post(`cities/`, {
        cityName,
        country,
        emoji,
        date,
        notes,
        position: { lat, lng },
        headers: { "Content-type": "application/json" },
      });
      dispatch({ type: "city/created", payload: response.data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating a city.",
      });
    }
  }

  async function handleDeleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await instance.delete(`cities/${id}`);
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city.",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCityById,
        currentCity,
        addCity,
        handleDeleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Context was used outside of Provider");
  return context;
}

export { CitiesProvider, useCities };
