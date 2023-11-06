import React, { useState, useEffect } from "react";
import "./App.css";
import Widget from "./component/Widget";
import Card from "./component/Card";
import axios from "axios";

const App = () => {
  const [results, setResults] = useState([]);
  const [category, setCategory] = useState([]);

  const makeAJAXcall = (category, searchQuery) => {
    let results = [];
    let categoryStates = [];
    let categoriesList = ["Buses", "Flights", "Hotels"];
    axios
      .get("bookmytrip-service.json")
      .then((response) => {
        if (category !== "All") {
          var bmtServices = response.data[category];
          bmtServices.forEach((elem) => {
            if (elem.serviceName.toLowerCase().includes(searchQuery.toLowerCase())) {
              results.push(elem);
              categoryStates.push(category);
            }
          });
          setResults(results);
          setCategory(categoryStates);
        } else {
          categoriesList.forEach((cate) => {
            var bmtServices = response.data[cate];
            bmtServices.forEach((elem) => {
              if (elem.serviceName.toLowerCase().includes(searchQuery.toLowerCase())) {
                results.push(elem);
                categoryStates.push(cate);
              }
            });
            setResults(results);
            setCategory(categoryStates);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    setResults([]);
    let category = document.querySelector("input[type=radio]:checked").value;
    let searchQuery = document.querySelector("#search").value;
    makeAJAXcall(category, searchQuery);
  };

  return (
    <React.Fragment>
      <header>
        <div className="grid1200">
          <Widget onSubmit={handleSubmit}> </Widget>
        </div>
      </header>
      <main>
        <div className="grid1200">
          {results.map((res, ind) => (
            <Card
              key={res.serviceID}
              stype={category[ind]}
              sname={res.serviceName}
              sloc={res.locations}
            />
          ))}
        </div>
      </main>
    </React.Fragment>
  );
};

export default App;
