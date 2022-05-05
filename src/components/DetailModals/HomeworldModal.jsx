import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { dataForModal, getSingleElement } from "../../lib/api";
import Loading from "../Loading";
import NotFound from "./NotFound";

const HomeworldModal = (props) => {
  const [data, setData] = useState(null);
  const {
    sendRequest: modalRequest,
    status: modalStatus,
    data: modalHookData,
    error: modalError,
  } = useHttp(getSingleElement);

  useEffect(() => {
    if (props.homeworld.homeworld) {
      modalRequest(props.homeworld.homeworld);
    }
  }, [modalRequest, props.homeworld]);

  useEffect(() => {
    if (modalHookData !== null) {
      setData(modalHookData);
    }
  }, [modalHookData, props.id]);

  if (modalStatus === "pending") {
    return (
      <div className="loading-modal-wrap">
        <Loading color="#000" className="loading-modal-wrap white-loader" />
      </div>
    );
  }
  if (modalError) {
    return <p>{modalError}</p>;
  }

  if (data === null) setData("Not found");

  return (
    <>
      {data === "Not found" && (
        <NotFound content="Homeworld for this species not found!" />
      )}
      {data !== "Not found" && data !== null && (
        <>
          <div>
            <h2 className="title-modal">
              {data.name === "unknown" ? "We don't know!" : data.name}
            </h2>

            <p className="movie-modal">
              <span>Climate: </span>
              {data.climate === "unknown" ? "We don't know!" : data.climate}
            </p>
            <p className="movie-modal">
              <span>Population: </span>
              {data.population === "unknown"
                ? "We don't know!"
                : data.population}
            </p>
            <p className="movie-modal">
              <span>Diameter: </span>
              {data.diameter === "0" ? "We don't know!" : data.diameter}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default HomeworldModal;
