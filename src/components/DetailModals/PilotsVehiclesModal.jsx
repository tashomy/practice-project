import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { dataForModal } from "../../lib/api";
import Loading from "../Loading";
import NotFound from "./NotFound";

const PilotsVehiclesModal = (props) => {
  const [data, setData] = useState(null);
  const {
    sendRequest: modalRequest,
    status: modalStatus,
    data: modalHookData,
    error: modalError,
  } = useHttp(dataForModal);

  useEffect(() => {
    modalRequest("people");
  }, [modalRequest]);

  useEffect(() => {
    if (modalHookData !== null) {
      let find = modalHookData.filter((obj) => {
        return (
          obj.vehicles.indexOf(`https://swapi.dev/api/vehicles/${props.id}/`) >
          -1
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
        <Loading color="#fff" className="loading-modal-wrap grey-loader" />
      </div>
    );
  }
  if (modalError) {
    return <p>{modalError}</p>;
  }

  return (
    <>
      {data === "Not found" && (
        <NotFound content="This vehicle does not have an owner!" />
      )}
      {data !== "Not found" && data !== null && (
        <>
          {data.map((item, key) => {
            return (
              <div className="detail-modal-div" key={key}>
                <h2 className="title-modal">{item.name}</h2>
                <p className="movie-modal">
                  <span>Gender: </span>
                  {item.gender === "n/a" ? `who knows?` : item.gender}{" "}
                </p>
                <p className="movie-modal">
                  {" "}
                  <span>Height: </span>
                  {item.height}
                </p>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default PilotsVehiclesModal;
