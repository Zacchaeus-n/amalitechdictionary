import React from "react";

const Definitions = ({ dictionary }) => {
  return (
    <div className="definitions">
    <div className="searchWord">
      <span className="info">
        {dictionary[0]?.word} :
        <span className="phonetics">
          {dictionary[0]
            ? dictionary[0].phonetics[0]
              ? dictionary[0].phonetics[0].text
              : ""
            : null}
        </span>
      </span>
      {dictionary[0] && (
        <audio
          className="audio"
          src={dictionary[0].phonetics[0] && dictionary[0].phonetics[0].audio}
          controls
        >
          Your browser does not this functionality!
        </audio>
        )}
        </div>
      <div className="meaning">
        {dictionary.map((description) =>
          description.meanings.map((item) =>
            item.definitions.map((desc) => {
              return (
                <div className="desc">
                  <hr />
                  <h4>{desc.definition}</h4>
                  {desc.example && (
                    <span>
                      <h4>Usage: </h4> {desc.example}
                    </span>
                  )}
                  {desc.synonyms && (
                    <span>
                      <h4>Synonyms: </h4>
                      {desc.synonyms.map((synonym) => `${synonym}, `)}
                    </span>
                  )}
                </div>
              );
            })
          )
        )}
      </div>
    </div>
  );
};

export default Definitions;
