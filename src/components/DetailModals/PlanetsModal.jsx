import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { dataForModal } from "../../lib/api";
import Loading from "../Loading";
import NotFound from "./NotFound";

const PlanetsModal = (props) => {
  const [data, setData] = useState(null);
  const {
    sendRequest: modalRequest,
    status: modalStatus,
    data: modalHookData,
    error: modalError,
  } = useHttp(dataForModal);

  useEffect(() => {
    modalRequest("planets");
  }, [modalRequest]);

  useEffect(() => {
    if (modalHookData !== null) {
      let find = modalHookData.filter((obj) => {
        return (
          obj.films.indexOf(`https://swapi.dev/api/films/${props.id}/`) > -1
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
      {data === "Not found" && <NotFound content="No planets found for this movie!"/>}
      {data !== "Not found" && data !== null && (
        <>
          {data.map((item, key) => {
            return (
              <div key={key}>
                <h1 style={{ marginTop: "1.8rem" }}>{item.name}</h1>
                <p className="movie-modal">
                  <span>Population: </span>
                  {item.population}
                </p>
                <p className="movie-modal">
                  {" "}
                  <span>Climate: </span>
                  {item.climate}
                </p>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default PlanetsModal;
