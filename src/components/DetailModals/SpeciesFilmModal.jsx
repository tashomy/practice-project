import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { dataForModal } from "../../lib/api";
import Loading from "../Loading";
import NotFound from "./NotFound";

const SpeciesFilmModal = (props) => {
  const [data, setData] = useState(null);
  const {
    sendRequest: modalRequest,
    status: modalStatus,
    data: modalHookData,
    error: modalError,
  } = useHttp(dataForModal);

  useEffect(() => {
    modalRequest("films");
  }, [modalRequest]);

  useEffect(() => {
    if (modalHookData !== null) {
      let find = modalHookData.filter((obj) => {
        return (
          obj.species.indexOf(`https://swapi.dev/api/species/${props.id}/`) > -1
        );
      });
      if (find.length === 0) {
        setData("Not found");
      } else {
        setData(find);
      }
    }
  }, [modalHookData, props.id]);

  if (modalStatus === "pending") {
    return (
      <div className="loading-modal-wrap">
        <Loading className="loading-modal-wrap" />
      </div>
    );
  }
  if (modalError) {
    return <p>{modalError}</p>;
  }

  return (
    <>
      {data === "Not found" && (
        <NotFound content="No movies found for this species!" />
      )}
      {data !== "Not found" && data !== null && (
        <>
          {data.map((item, key) => {
            return (
              <div key={key}>
                <h1 style={{ marginTop: "1.8rem" }}>{item.title}</h1>
                <p className="movie-modal">
                  <span>Director: </span>
                  {item.director}
                </p>
                <p className="movie-modal">
                  {" "}
                  <span>Producer: </span>
                  {item.producer}
                </p>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default SpeciesFilmModal;
