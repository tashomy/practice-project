import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { dataForModal } from "../../lib/api";
import Loading from "../Loading";
import NotFound from "./NotFound";

const ResidentsModal = (props) => {
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
          obj.homeworld.indexOf(`https://swapi.dev/api/planets/${props.id}/`) >
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
        <NotFound content="No residents found for this planet!" />
      )}
      {data !== "Not found" && data !== null && (
        <>
          {data.map((item, key) => {
            return (
              <div key={key}>
                <h1 style={{ marginTop: "1.8rem" }}>{item.name}</h1>
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

export default ResidentsModal;
