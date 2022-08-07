import React from 'react';
import axios from 'axios';
import { useState } from "react";
import './App.css';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

function App() {


  const [villagerID, setVillagerID] = useState("");
  const [villagerInfo, setVillagerInfo] = useState<undefined | any>(undefined) ;
  
  const AC_VILLAGER_BASE_URL = "http://acnhapi.com/v1/villagers/";


  return (
    

    <body>

      <h1>Meet a Villager!</h1>
        <h2>Enter a number between 1 and 391:</h2>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <br></br>
        <TextField
          id="search-bar"
          className="text"
          value={villagerID}
          onChange={(prop: any) => {
            setVillagerID(prop.target.value);
          }}
          variant="outlined"
          placeholder="Enter here..."
          size="small"
        />
        <IconButton
          aria-label="search"
          onClick={() => {
            search();
          }}
        >
          <SearchIcon style={{ fill: "#778899" }} />
        </IconButton>
      </div>
      
      <div style={{ display: "flex", justifyContent: "center" }}>
      <p>You have entered: {villagerID}</p>
      </div>

      {villagerInfo === undefined ? (
        <div></div>
      ) : (
        <div>
          <img
            src={villagerInfo.image_uri}
            alt = {villagerID}/>

          <p> Hello, my name is {villagerInfo.name["name-USen"]}. Nice to meet you, {villagerInfo["catch-phrase"]}.<br />
          {villagerInfo.saying}<br />
          
          <br></br>
            Gender: {villagerInfo.gender}<br />
            Birthday: {villagerInfo["birthday-string"]}<br />
            Personality: {villagerInfo.personality}<br />
            Hobby: {villagerInfo.hobby}</p>
        </div>
      )}
    </body>
  );
  
  
  
  function search(){
    axios.get(AC_VILLAGER_BASE_URL + villagerID).then((res) =>{
      setVillagerInfo(res.data);
    })

    .catch(() => {
      console.log("Villager not found");
      setVillagerInfo(undefined);
    });
  }

}

export default App;
