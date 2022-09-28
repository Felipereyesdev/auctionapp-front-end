import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import {listproperties} from "../utilities/api";
export default function PropertiesList(){
    // const navigate = useNavigate()
  const [properties, setProperties] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [color,setColor]=useState('white');
  // const [textColor,setTextColor]=useState('white');
  function loadProperties(){
    const abortController = new AbortController();
    setTablesError(null);
    listproperties(abortController.signal)
    .then(setProperties)
    .catch(setTablesError);
    return () => abortController.abort();

  }

  useEffect(loadProperties, [])

  const changeBackgroundColorToRed = () =>{
    setColor('red');
    // navigate(0);


  }
  const changeBackgroundColorToGreen = () =>{
    setColor('green');
    // navigate(0);


  }
  const changeBackgroundColorToYellow = () =>{
    setColor('yellow');
    // navigate(0);


  }

  

  const land = properties.map((pro) =>{
    return (
      <div style={{background:color}} key = {pro.properties_id}>
        <p><b>auction_id:</b>{pro.auction_id}</p>
        <p><b>address:</b>{pro.address}</p>
        <p><b>owner:</b>{pro.owner}</p>
        <p><b>debt:</b>{pro.debt}</p>
        <p><b>rating:</b>{pro.rating}</p>
        <p>
        
        <img
            alt={`${pro.address}`}
            className="rounded"
            src={pro.image_url}
            style={{ width: "100%" }}
          />
          </p>
          <div><p><button onClick={ () =>changeBackgroundColorToRed() }> no se puede comprar</button></p>  </div>
          <div><p><button onClick={ () =>changeBackgroundColorToGreen() }> se puede comprar</button></p>  </div>
          <div><p><button onClick={ () =>changeBackgroundColorToYellow() }> tal vez se puede comprar</button></p>  </div>
          <hr/>

      </div>
    )
  })


  return (
    <>
    {land}
    </>
  );
    

}