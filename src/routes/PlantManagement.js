import "../css/PlantManagement.css";
import PlantContainer from "../components/PlantContainer";
import PlantRegister from "../components/PlantRegister";
import { useState, useEffect } from "react";
import registerPlant from "../services/registerPlant";
import plantFormInputValidation from "../utils/plantFormInputValidation";
import fetchPlants from "../services/fetchPlants";

export default function PlantManagement() {
  const [state, setState] = useState({
    plantName: "",
    optimalTemp: "",
    optimalHumidity: "",
    optimalCo2: "",
    stock: "",
  });

  const [plantOptions, setPlantOptions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = await fetchPlants();
      setPlantOptions(options);
    }
    fetchData();
  }, []);

  const [formToggle, setFormToggle] = useState(false);

  const [errors, setErrors] = useState({
    plantName: "",
    optimalTemp: "",
    optimalHumidity: "",
    optimalCo2: "",
    stock: "",
  });

  function onChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function onSubmit(e) {
    e.preventDefault();

    const response = plantFormInputValidation(state);

    if (Object.keys(response).length !== 0) {
      setErrors(response);
      return;
    }
    registerPlant(state);
  }

  function openForm() {
    setFormToggle(true);
  }

  function closeForm() {
    setFormToggle(false);
  }

  return (
    <>
      <div>
        <PlantContainer openForm={openForm} />
      </div>

      <div>
        <p>{state.plantName}</p>
        <PlantRegister
          plantOptions={plantOptions}
          onChange={onChange}
          state={state}
          onSubmit={onSubmit}
          errors={errors}
          closeForm={closeForm}
          toggleForm={formToggle}
        />
      </div>
    </>
  );
}