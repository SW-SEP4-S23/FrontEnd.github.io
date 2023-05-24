import "../css/PlantManagement.css";
import PlantContainer from "../components/PlantContainer";
import PlantRegister from "../components/PlantRegister";
import React, { useState, useEffect } from "react";
import registerPlant from "../services/registerPlant";
import editPlant from "../services/editPlant";
import plantFormInputValidation from "../utils/plantFormInputValidation";
import fetchPlants from "../services/fetchPlants";

export default function PlantManagement() {
  const testPlants = [
    { plantName: "Tomat", optimalTemp: "20", optimalHumidity: "50", optimalCo2: "1000", stock: "10", },
    { plantName: "Agurk", optimalTemp: "23", optimalHumidity: "70", optimalCo2: "573", stock: "12", },
    { plantName: "Kartoffel", optimalTemp: "15", optimalHumidity: "40", optimalCo2: "1000", stock: "5", },
  ];
  const [state, setState] = useState({ plantName: "", optimalTemp: "", optimalHumidity: "", optimalCo2: "", stock: "", });
  const [formToggle, setFormToggle] = useState(false);
  const [errors, setErrors] = useState({ plantName: "", optimalTemp: "", optimalHumidity: "", optimalCo2: "", stock: "", });
  const [plantOptions, setPlantOptions] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const [data, setData] = useState([]);
  const [mode, setMode] = useState(null);

  useEffect(() => {
    setPlantOptions(testPlants);
    fetchPlants(setData);
  }, []);

  function onChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    if (name === "plantName") {
      const filteredOptions = plantOptions.filter((plant) =>
        plant.plantName.toLowerCase().includes(value.toLowerCase())
      );

      if (filteredOptions.length > 0) {
        const selectedPlant = filteredOptions.find(
          (plant) => plant.plantName.toLowerCase() === value.toLowerCase()
        );

        setState((prevState) => ({
          ...prevState, [name]: value, optimalTemp: selectedPlant ? selectedPlant.optimalTemp : "", optimalHumidity: selectedPlant ? selectedPlant.optimalHumidity : "", optimalCo2: selectedPlant ? selectedPlant.optimalCo2 : "", stock: selectedPlant ? selectedPlant.stock : "",
        }));
      } else {
        setState((prevState) => ({
          ...prevState, [name]: value, optimalTemp: "", optimalHumidity: "", optimalCo2: "", stock: "",
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState, [name]: value,
      }));
    }
  }


  function onSubmit(e) {
    e.preventDefault();

    const response = plantFormInputValidation(state);

    if (Object.keys(response).length !== 0) {
      setErrors(response);
      return;
    }

    if (mode === "register") {
      registerPlant(state);
    } else if (mode === "edit") {
      editPlant(state);
    }

    setState({
      plantName: "", optimalTemp: "", optimalHumidity: "", optimalCo2: "", stock: "",
    });
  }

  function openForm(buttonType) {
    setMode(buttonType);
    setFormToggle(true);

    const formTitle =
      buttonType === "register" ? "Registrer Plante" : "Rediger Plante";
    setFormTitle(formTitle);
  }

  function closeForm() {
    setFormToggle(false);
  }

  function onSearch(value) {
    const result = data.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });
    setData(result);
  }

  /*useEffect(() => {
    async function fetchData() {
      const options = await fetchPlants();
      setPlantOptions(options);
    }
    fetchData();
    }, []);*/

  return (
    <>
      <div className="plant-management-container top-container">
        <div>
          <PlantContainer onButtonClick={openForm} onSearch={onSearch} />
        </div>

        <div>
          <PlantRegister
            mode={mode}
            formTitle={formTitle}
            filteredOptions={plantOptions}
            onChange={onChange}
            state={state}
            onSubmit={onSubmit}
            errors={errors}
            closeForm={closeForm}
            toggleForm={formToggle}
          />
        </div>
      </div>
    </>
  );
}
