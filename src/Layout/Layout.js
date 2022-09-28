
import React from 'react';
import { BrowserRouter as Router ,Routes ,Route, Link } from 'react-router-dom';
import PropertiesList from "../propertiesList/propertiesList";
import CreateProperty from '../CreateProperty/CreateProperty';

export default function Layout(){
    return (
        <Router>
         <nav>
            <h1>Auction list</h1>
            <Link to= "/">Home</Link>
            <Link to= "/createproperty">Add property</Link>
        </nav>   
        <Routes>
            <Route exact path = "/" element = {<PropertiesList/>}/>
            <Route exact path = "/createproperty" element = {<CreateProperty/>}/>
            

            
        </Routes>
        </Router>
        

    );
}