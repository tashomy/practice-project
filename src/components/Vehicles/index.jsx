import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import useHttp from "../../hooks/useHttp";
import { getAllVehicles, getPageVehicles } from "../../lib/api";
import Loading from "../Loading";
import Paginate from "../Pagination";
import Modal from "../Modal";
import PilotsVehiclesModal from "../DetailModals/PilotsVehiclesModal";
import ModalButtons from "../ModalButtons";

const Vehicles = () => {
  const [page, setPage] = useState({ page: 1 });
  const [type, setType] = useState();
  const [id, setID] = useState();
  const { sendRequest, status, data, error } = useHttp(getPageVehicles, true);

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
    <div className="container vehicles-container">
      {type === "pilots" && (
        <Modal title={"Pilots"} onClick={closeModal}>
          <PilotsVehiclesModal title={"Pilots"} id={id} />
        </Modal>
      )}
      <Row className="wrapper-people">
        {data.map((vehicle, i) => {
          return (
            <Col md={12} lg={5} className="my-card starship-card" key={i}>
              <div>
                <h3>{vehicle.name}</h3>
                <p>
                  <span>Model:</span> {vehicle.model} <br />
                  <span>Cost in credits:</span> {vehicle.cost_in_credits}
                  <br />
                  <span>Crew:</span> {vehicle.crew} <br />
                </p>
                {vehicle.pilots.length === 0 && <p>No pilots found</p>}
              </div>
              {vehicle.pilots.length !== 0 && (
                <ModalButtons
                  className="pilot-starship-modal-btns"
                  onClick={passToModal}
                  id={id}
                  page={page.page}
                  content={[{ text: "Pilots" }]}
                  url={vehicle.url}
                />
              )}
            </Col>
          );
        })}
      </Row>
      <Paginate change={changePage} num={4} pageProp={page.page} />
    </div>
  );
};

export default Vehicles;
