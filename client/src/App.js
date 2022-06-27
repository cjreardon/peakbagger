import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [peakName, setPeakName] = useState("");
  const [days, setDays] = useState(0);
  const [newHikeName, setNewName] = useState("");
  const [peakList, setPeakList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setPeakList(response.data);
    });
  }, []);
  const addToList = () => {
    Axios.post("http://localhost:3001/insert", { peakName, days });
  };

  const updateName = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      newHikeName: newHikeName,
    });
  };

  const deletePeak = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
  }
  return (
    <div className="App">
      <h1>PeakBagger</h1>
      <label>Peak Name</label>
      <input
        type="text"
        onChange={(event) => {
          setPeakName(event.target.value);
        }}
      />
      <label>Days hiked ago</label>
      <input
        type="number"
        onChange={(event) => {
          setDays(event.target.value);
        }}
      />
      <button onClick={addToList}>Add to list</button>
      <h1>Peaks Hiked</h1>
      {peakList.map((val, key) => {
        return (
          <div className="peak">
            <h1 className="peakName"> Peak Hiked: {val.peakName} </h1>{" "}
            <h1 className="days"> Hiked {val.daysAgoHiked} Days Ago </h1>{" "}
            <input
              type="text"
              placeholder="Updated hike name"
              onChange={(event) => {
                setNewName(event.target.value);
              }}
            />
            <button onClick={() => updateName(val._id)}>Update</button>
            <button onClick={() => deletePeak(val._id)}>Delete</button>
          </div>
        );
      })}
      ;
    </div>
  );
}

export default App;
