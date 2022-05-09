import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import useHttp from "../../hooks/useHttp";
import { getPageSpaceships } from "../../lib/api";
import Loading from "../Loading";
import ModalButtons from "../ModalButtons";
import Paginate from "../Pagination";
import Modal from "../Modal";
import PilotsStarshipModal from "../DetailModals/PilotsStarshipModal";
import Search from "../Search";
import NotFound from "../DetailModals/NotFound";

const Spaceships = () => {
  const [page, setPage] = useState({ page: 1 });
  const [type, setType] = useState();
  const [id, setID] = useState();
  const [search, setSearch] = useState(null);
  const [notFound, setNoFound] = useState(false);
  const { sendRequest, status, data, error } = useHttp(getPageSpaceships, true);

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

  const onClick = (value) => {
    setNoFound(false);
    setSearch(null);
    if (value === "") return;
    const url = `https://swapi.dev/api/starships/?search=${value}`;
    fetch(url)
      .then((data) => {
        console.log(data);
        const res = data.json();
        return res;
      })
      .then((result) => {
        console.log(result);
        if (result.count == 0) setNoFound(true);
        else setSearch(result.results);
      });
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
    <div className="container starship-container">
      {notFound && <NotFound className="search-not-found" />}

      {type === "pilots" && (
        <Modal title={"Pilots"} onClick={closeModal}>
          <PilotsStarshipModal title={"Pilots"} id={id} />
        </Modal>
      )}
      <Search emptyValue={sendRequest} page={page.page} onClick={onClick} />

      {!notFound && search === null && (
        <Row className="wrapper-people">
          {data.map((spaceship, i) => {
            return (
              <Col md={12} lg={5} className="my-card starship-card" key={i}>
                <div>
                  <h3>{spaceship.name}</h3>
                  <p>
                    <span>Manufacturer:</span> {spaceship.manufacturer} <br />
                    <span>Model:</span> {spaceship.model}
                    <br />
                    <span>Crew:</span> {spaceship.crew} <br />
                    <span>Starship Class:</span> {spaceship.starship_class}{" "}
                    <br />
                  </p>
                  {spaceship.pilots.length === 0 && <p>No pilots found</p>}
                </div>
                {spaceship.pilots.length !== 0 && (
                  <ModalButtons
                    className="pilot-starship-modal-btns"
                    onClick={passToModal}
                    id={id}
                    page={page.page}
                    content={[{ text: "Pilots" }]}
                    url={spaceship.url}
                  />
                )}
              </Col>
            );
          })}
        </Row>
      )}
      {search !== null && (
        <Row className="wrapper-people">
          {search.map((spaceship, i) => {
            return (
              <Col md={12} lg={5} className="my-card starship-card" key={i}>
                <div>
                  <h3>{spaceship.name}</h3>
                  <p>
                    <span>Manufacturer:</span> {spaceship.manufacturer} <br />
                    <span>Model:</span> {spaceship.model}
                    <br />
                    <span>Crew:</span> {spaceship.crew} <br />
                    <span>Starship Class:</span> {spaceship.starship_class}{" "}
                    <br />
                  </p>
                  {spaceship.pilots.length === 0 && <p>No pilots found</p>}
                </div>
                {spaceship.pilots.length !== 0 && (
                  <ModalButtons
                    className="pilot-starship-modal-btns"
                    onClick={passToModal}
                    id={id}
                    page={page.page}
                    content={[{ text: "Pilots" }]}
                    url={spaceship.url}
                  />
                )}
              </Col>
            );
          })}
        </Row>
      )}
      {!notFound && search === null && (
        <Paginate change={changePage} num={4} pageProp={page.page} />
      )}
    </div>
  );
};

export default Spaceships;
