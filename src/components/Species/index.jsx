import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import useHttp from "../../hooks/useHttp";
import { getAllSpecies, getPageSpecies } from "../../lib/api";
import HomeworldModal from "../DetailModals/HomeworldModal";
import Loading from "../Loading";
import ModalButtons from "../ModalButtons";
import Paginate from "../Pagination";
import Modal from "../Modal";
import CharactersModal from "../DetailModals/CharactersModal";
import PeopleModal from "../DetailModals/PeopleModal";
import MovieModal from "../DetailModals/MovieModal";
import SpeciesFilmModal from "../DetailModals/SpeciesFilmModal";
const Species = () => {
  const [page, setPage] = useState({ page: 1 });
  const [type, setType] = useState();
  const [id, setID] = useState();
  const { sendRequest, status, data, error } = useHttp(getPageSpecies, true);

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

  const changePage = (number) => {
    setPage({ page: number });
  };

  return (
    <div className="container species-container">
      {type === "homeworld" && (
        <Modal title={"Homeworld"} onClick={closeModal}>
          <HomeworldModal
            title={"Homeworld"}
            id={id}
            homeworld={data[id - 1]}
          />
        </Modal>
      )}
      {type === "people" && (
        <Modal title={"People"} onClick={closeModal}>
          <PeopleModal title={"People"} id={id} />
        </Modal>
      )}
      {type === "films" && (
        <Modal title={"Films"} onClick={closeModal}>
          <SpeciesFilmModal title={"Films"} id={id} />
        </Modal>
      )}
      <Row className="wrapper-people">
        {data.map((species, i) => {
          return (
            <Col md={12} lg={5} className="my-card species-card" key={i}>
              <div>
                <h3>{species.name}</h3>
                <p>
                  <span>Language:</span>{" "}
                  {species.language === "n/a"
                    ? "we don't know"
                    : species.language}{" "}
                  <br />
                  <span>Classification:</span> {species.classification} <br />
                  <span>Designation:</span> {species.designation} <br />
                  <span>Skin Colors:</span>{" "}
                  {species.skin_colors === "n/a"
                    ? "we don't know"
                    : species.skin_colors}{" "}
                  <br />
                </p>
              </div>
              <ModalButtons
                className="species-modal-btns"
                onClick={passToModal}
                id={id}
                page={page.page}
                content={[
                  { text: "Homeworld" },
                  { text: "People" },
                  { text: "Films" },
                ]}
                url={species.url}
              />
            </Col>
          );
        })}
      </Row>
      <Paginate change={changePage} num={4} pageProp={page.page} />
    </div>
  );
};

export default Species;
