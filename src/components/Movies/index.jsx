import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import useHttp from "../../hooks/useHttp";
import { getAllMovies, getPageMovies } from "../../lib/api";
import Loading from "../Loading";
import ModalButtons from "../ModalButtons";
import Modal from "../Modal";
import VehicleModal from "../DetailModals/VehicleModal";
import StarshipModal from "../DetailModals/StarshipModal";
import MovieModal from "../DetailModals/MovieModal";
import CharactersModal from "../DetailModals/CharactersModal";
import PlanetsModal from "../DetailModals/PlanetsModal";
import SpeciesModal from "../DetailModals/SpeciesModal";

const Movies = () => {
  const [page, setPage] = useState({ page: 1 });
  const [type, setType] = useState();
  const [id, setID] = useState();
  const { sendRequest, status, data, error } = useHttp(getAllMovies, true);

  useEffect(() => {
    sendRequest(page);
  }, [sendRequest, page]);

  const passToModal = (type, id) => {
    setType(type);
    setID(id);
  };

  const closeModal = () => {
    setType(null);
    setID(null);
  };

  if (status === "pending") {
    return <Loading />;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container movies-container">
      {type === "characters" && (
        <Modal title={"characters"} onClick={closeModal}>
          <CharactersModal title={"characters"} id={id} />
        </Modal>
      )}
      {type === "planets" && (
        <Modal title={"planets"} onClick={closeModal}>
          <PlanetsModal title={"planets"} id={id} />
        </Modal>
      )}
      {type === "species" && (
        <Modal title={"species"} onClick={closeModal}>
          <SpeciesModal title={"species"} id={id} />
        </Modal>
      )}
      <Row className="wrapper-people">
        {data.map((movie, i) => {
          return (
            <Col md={12} lg={5} className="my-card movie-card" key={i}>
              {/* <h3>{movie.name}</h3> */}
              <div>
                <p>
                  <span>Title:</span> {movie.title} <br />
                  <span>Opening:</span> {movie.opening_crawl}
                  <br />
                  <span>Director:</span> {movie.director} <br />
                </p>
              </div>
              <ModalButtons
                onClick={passToModal}
                className="movies-modal-btns"
                content={[
                  { text: "Characters" },
                  { text: "Planets" },
                  { text: "Species" },
                ]}
                page={page.page}
                url={movie.url}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Movies;
