import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { dataForModal } from "../../lib/api";
import Loading from "../Loading";
import NotFound from "./NotFound";

const VehicleModal = (props) => {
  const [data, setData] = useState(null);
  const {
    sendRequest: modalRequest,
    status: modalStatus,
    data: modalHookData,
    error: modalError,
  } = useHttp(dataForModal);

  useEffect(() => {
    modalRequest("vehicles");
  }, [modalRequest]);

  useEffect(() => {
    if (modalHookData !== null) {
      let find = modalHookData.filter((obj) => {
        return (
          obj.pilots.indexOf(`https://swapi.dev/api/people/${props.id}/`) > -1
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
        <Loading color="#000" className="loading-modal-wrap white-loader" />
      </div>
    );
  }
  if (modalError) {
    return <p>{modalError}</p>;
  }

  return (
    <>
      {data === "Not found" && (
        <NotFound content="This character does not have a vehicle!" />
      )}
      {data !== "Not found" && data !== null && (
        <>
          {data.map((item, key) => {
            return (
              <div className="detail-modal-div" key={key}>
                <h2 className="title-modal">{item.name}</h2>
                <p className="movie-modal">
                  <span>Model: </span>
                  {item.model}
                </p>
                <p className="movie-modal">
                  {" "}
                  <span>Crew: </span>
                  {item.crew}
                </p>
                <p className="movie-modal">
                  <span>Cargo capacity: </span>
                  {item.cargo_capacity}
                </p>
                <p className="movie-modal">
                  <span>Price: </span>
                  {item.cost_in_credits}
                </p>
                <p className="movie-modal">
                  <span>Consumables: </span>
                  {item.consumables}
                </p>
                <p className="movie-modal">
                  <span>Vehicle class: </span>
                  {item.vehicle_class}
                </p>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default VehicleModal;
