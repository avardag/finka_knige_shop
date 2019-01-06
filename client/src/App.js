import React, { Component } from 'react';
import axios from "axios";

class App extends Component {
   componentDidMount() {
        axios.get("/api/product/brands")
          .then(brands => console.log(brands))
      }
      
      render() {
    return (
      <div className="App">
     
      
        <h1>FLINKA</h1>
      </div>
    );
  }
}

export default App;
