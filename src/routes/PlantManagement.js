import "../css/PlantManagement.css"
import fetchPlants from "../services/fetchPlants";
import React, { useState, useEffect } from "react";
import StockTable from "../components/StockTable";

export default function PlantManagement(){
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPlants(setData)
  },[]);

  function onSearch(value) 
  {
    const result = data.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });
    setData(result);
  }
  

    return (
        <>
<div id = "PlantCard">
<div id = "PlantHeader">
    <h1> Plantebeholdning</h1>
    <div  id = "PlantSearch"><input onChange={(e)=> onSearch(e.target.value)} placeholder="Søg efter plante.."></input> 
    <button>Søg</button></div>

</div>
<div id = "PlantData" >
<StockTable 
data = {data}
/>
</div>
<div id = "PlantFooter">
<button id = "PlantReg">REGISTRER PLANTE</button>
</div>
</div>

<div id = "Planteformel">
    
<form>
<h3>Registrer Plante</h3>
      <label>Plantenavn
        <input type="text" />
      </label>
      <label>Optimal temperatur
        <input type="number" />
      </label>
      <label>Optimal luftfugtighed
        <input type="number" />
      </label>
      <label>Optimal CO2
        <input type="number" />
      </label>
      <label>Lagerbeholdning
        <input type="number" />
      </label>
      <input type="submit" value = "Tilføj"/>

    </form>

</div>
</>
    )


    
}