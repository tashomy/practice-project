import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import useHttp from "../../hooks/useHttp";
import { getPagePeople } from "../../lib/api";
import Loading from "../Loading";
import Modal from "../Modal";
import MovieModal from "../DetailModals/MovieModal";
import Paginate from "../Pagination";
import VehicleModal from "../DetailModals/VehicleModal";
import StarshipModal from "../DetailModals/StarshipModal";
import ModalButtons from "../ModalButtons";

const People = () => {
  const [page, setPage] = useState({ page: 1 });
  const [type, setType] = useState();
  const [id, setID] = useState();

  const { sendRequest, status, data, error } = useHttp(getPagePeople, true);

  useEffect(() => {
    sendRequest(page.page);
  }, [sendRequest, page]);

  const changePage = (number) => {
    setPage({ page: number });
  };

  if (status === "pending") {
    return <Loading />;
  }
  if (error) {
    return <p>{error}</p>;
  }
  const passToModal = (type, id) => {
    setType(type);
    setID(id);
  };

  const closeModal = () => {
    setType(null);
    setID(null);
  };
  console.log(type);
  return (
    <div className="container people-container">
      {type === "films" && (
        <Modal title={"Movies"} onClick={closeModal}>
          <MovieModal title={"Films"} id={id} />
        </Modal>
      )}
      {type === "vehicles" && (
        <Modal title={"Vehicles"} onClick={closeModal}>
          <VehicleModal title={"Vehicles"} id={id} />
        </Modal>
      )}
      {type === "starships" && (
        <Modal title={"Starships"} onClick={closeModal}>
          <StarshipModal title={"Starships"} id={id} />
        </Modal>
      )}
      <Row className="wrapper-people">
        {data.map((person, i) => {
          return (
            <Col md={12} lg={5} className="person-card" key={i}>
              <div>
                <h3>{person.name}</h3>
                <p>
                  <span>Birth year:</span> {person.birth_year}
                  <br />
                  <span>Gender:</span>{" "}
                  {person.gender === "n/a" ? `who knows?` : person.gender}{" "}
                  <br />
                </p>
              </div>
              <ModalButtons
                onClick={passToModal}
                page={page}
                url={person.url}
                content={[
                  { text: "Films" },
                  { text: "Vehicles" },
                  { text: "Starships" },
                ]}
              />
            </Col>
          );
        })}
      </Row>
      <Paginate change={changePage} num={9} pageProp={page.page} />
    </div>
  );
};

export default People;
