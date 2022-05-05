import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { dataForModal } from "../../lib/api";
import Loading from "../Loading";
import NotFound from "./NotFound";

const MovieModal = (props) => {
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
          obj.characters.indexOf(`https://swapi.dev/api/people/${props.id}/`) >
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
        <NotFound content="Movies for this character not found!" />
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
                <p className="movie-modal">
                  <span>Release Date: </span>
                  {item.release_date}
                </p>
                <p className="movie-modal">
                  {" "}
                  <span>Opening Crawl: </span>
                  {item.opening_crawl}
                </p>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default MovieModal;
