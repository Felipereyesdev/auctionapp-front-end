import React, { useEffect, useState } from "react";
import {listproperties} from "./utilities/api";


function App() {
  const [properties, setProperties] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  function loadProperties(){
    const abortController = new AbortController();
    setTablesError(null);
    listproperties(abortController.signal)
    .then(setProperties)
    .catch(setTablesError);
    return () => abortController.abort();

  }

  useEffect(loadProperties, [])

  

  const land = properties.map((pro) =>{
    return (
      <div key = {pro.properties_id}>
        <p><b>auction_id:</b>{pro.auction_id}</p>
        <p><b>address:</b>{pro.address}</p>
        <p><b>owner:</b>{pro.owner}</p>
        <p><b>debt:</b>{pro.address}</p>
        <p><b>rating:</b>{pro.rating}</p>
        <p>
        <img
            alt={`${pro.address}`}
            className="rounded"
            src={pro.image_url}
            style={{ width: "100%" }}
          />
          </p>
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

export default App;
