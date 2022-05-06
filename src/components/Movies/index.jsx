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
import img from "../../assets/images/starwars.png";
import img2 from "../../assets/images/jango-fett.webp";
import img3 from "../../assets/images/c3po.png";
import img4 from "../../assets/images/boba-fett.webp";
import img1 from "../../assets/images/storm-head1.png";
import img6 from "../../assets/images/storm-head2.png";
import img7 from "../../assets/images/storm-head3.png";

const Movies = () => {
  const [page, setPage] = useState({ page: 1 });
  const [type, setType] = useState();
  const [id, setID] = useState();
  const { sendRequest, status, data, error } = useHttp(getAllMovies, true);

  const images = [img1, img3, img4, img2, img6, img7];

  useEffect(() => {
    sendRequest(page.page);
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
        <Modal title={"Characters"} onClick={closeModal}>
          <CharactersModal title={"Characters"} id={id} />
        </Modal>
      )}
      {type === "planets" && (
        <Modal title={"Planets"} onClick={closeModal}>
          <PlanetsModal title={"Planets"} id={id} />
        </Modal>
      )}
      {type === "species" && (
        <Modal title={"Species"} onClick={closeModal}>
          <SpeciesModal title={"Species"} id={id} />
        </Modal>
      )}
      <Row className="wrapper-movies">
        {data.map((movie, i) => {
          return (
            <div className="movie-card" key={i}>
              <h3>{movie.title}</h3>
              <div>
                <p>
                  <span>Opening:</span> {movie.opening_crawl}
                  <br />
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
              <img id="star-wars-img" src={img} alt="slicica" />
              <img id="place-img" src={images[i]} alt="slicica" />
            </div>
          );
        })}
      </Row>
    </div>
  );
};

export default Movies;
