import { TextField } from "@material-ui/core";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDictionary } from "../../ducks/rapidApi.duck";

const Header = () => {
  // getting the searched word
  const searchWordRef = useRef();

  const dispatch = useDispatch();
  const { dictionary } = useSelector((state) => state.api);

  console.log(dictionary);

  const searchWordHandler = (searchWord) => {
    dispatch(fetchDictionary(searchWord));
  };

  return (
    <div className="header">
      <span className="title">AmaliTech Dictionary</span>
      <div className="inputs">
        <TextField
          className="search"
          id="standard-basic"
          label="Standard"
          ref={searchWordRef}
          onChange={(e) => searchWordHandler(e.target.value)}
        />
     
      </div>
    </div>
  );
};

export default Header;
