import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import useHttp from "../../hooks/useHttp";
import { getAllPlanets, getPagePlanets } from "../../lib/api";
import Loading from "../Loading";
import Paginate from "../Pagination";
import ModalButtons from "../ModalButtons/index";
import ResidentsModal from "../DetailModals/ResidentsModal";
import Modal from "../Modal";

const Planets = () => {
  const [page, setPage] = useState({ page: 1 });
  const [type, setType] = useState();
  const [id, setID] = useState();
  const { sendRequest, status, data, error } = useHttp(getPagePlanets, true);

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
    <div className="container planets-container">
      {type === "residents" && (
        <Modal title={"Residents"} onClick={closeModal}>
          <ResidentsModal title={"Residents"} id={id} />
        </Modal>
      )}
      <Row className="wrapper-people">
        {data.map((vehicle, i) => {
          return (
            <Col md={12} lg={5} className="my-card planets-card" key={i}>
              <div>
                <h3>{vehicle.name}</h3>
                <p>
                  <span>Population:</span> {vehicle.population} <br />
                  <span>Climate:</span> {vehicle.climate}
                  <br />
                  <span>Terrain:</span> {vehicle.terrain} <br />
                </p>
              </div>
              <ModalButtons
                className="pilot-starship-modal-btns"
                onClick={passToModal}
                id={id}
                page={page.page}
                content={[{ text: "Residents" }]}
                url={vehicle.url}
              />
            </Col>
          );
        })}
      </Row>
      <Paginate change={changePage} num={6} pageProp={page.page} />
    </div>
  );
};

export default Planets;
