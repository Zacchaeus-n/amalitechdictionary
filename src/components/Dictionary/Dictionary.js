import { Container, TextField } from "@material-ui/core";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDictionary } from "../../ducks/rapidApi.duck";
import Definitions from "../Definitions/Definitions";

const Dictionary = () => {
  const searchWordRef = useRef();

  const dispatch = useDispatch();
  const { dictionary } = useSelector((state) => state.api);

  // console.log(dictionary);

  const searchWordHandler = (searchWord) => {
    dispatch(fetchDictionary(searchWord));
  };

  return (
    <div className="dictionary">
      <Container maxWidth="md">
        <span className="title">AmaliTech Dictionary</span>
        <div className="inputs">
          <TextField
            className="search"
            id="standard-basic"
            label="Search"
            placeholder="Search"
            ref={searchWordRef}
            onChange={(e) => searchWordHandler(e.target.value)}
          />
        </div>

        <Definitions dictionary={dictionary} />
      </Container>
    </div>
  );
};

export default Dictionary;
