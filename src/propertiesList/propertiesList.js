import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {listproperties,updatepropertytonobuy,updatepropertytomaybe,updatepropertytobuy } from "../utilities/api";
export default function PropertiesList(){
    const navigate = useNavigate()
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

  const changeBackgroundColorToRed = (event) =>{
    const abortController = new AbortController();
    let propertyId = event.target.value;
    
    // console.log('from the call',properties[propertyId]);
    // console.log("from the map",propertyId.status);
    // if(properties.properties_id ===propertyId ){
    //   console.log('from the call',properties.properties_id);
    //   console.log("from the map",propertyId);
    // }
    updatepropertytonobuy(propertyId, abortController.signal)
    .then(() => navigate(0))
    .catch(console.log('something'))
    

    return () => abortController.abort();

    
    // navigate(0);


  }
  const changeBackgroundColorToGreen = (event) =>{
    const abortController = new AbortController();
    let propertyId = event.target.value;

    updatepropertytobuy(propertyId, abortController.signal)
    .then(() => navigate(0))
    .catch(console.log('something'))
    

    return () => abortController.abort();
    
    // navigate(0);


  }
  const changeBackgroundColorToYellow  = (event) =>{
    const abortController = new AbortController();
    let propertyId = event.target.value;

    updatepropertytomaybe(propertyId, abortController.signal)
    .then(() => navigate(0))
    .catch(console.log('something'))
    

    return () => abortController.abort();
    
    // navigate(0);


  }
  function changecolor(status){
    let color = 'white'

    if(status === 'notbuy'){
      color = 'red'
      
    }

    if(status=== 'buy'){
      color = 'green'
      
    }
    if(status=== 'maybe'){
      color = 'yellow'
      
    }

    return color



  }

  

  const land = properties.map((pro) =>{
    const key =pro.properties_id;
    return (
      <div style={{background:changecolor(pro.status) }} key = {key}>
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
          <div><p><button value ={pro.properties_id} onClick={changeBackgroundColorToRed}> no se puede comprar</button></p>  </div>
          <div><p><button value ={pro.properties_id} onClick={ changeBackgroundColorToGreen }> se puede comprar</button></p>  </div>
          <div><p><button value ={pro.properties_id} onClick={ changeBackgroundColorToYellow }> tal vez se puede comprar</button></p>  </div>
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