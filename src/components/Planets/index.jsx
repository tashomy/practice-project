import React, { useEffect, useState } from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import useHttp from "../../hooks/useHttp";
import { getAllPlanets, getPagePlanets } from "../../lib/api";
import Loading from "../Loading";
import Paginate from "../Pagination";
import ModalButtons from "../ModalButtons/index";
import ResidentsModal from "../DetailModals/ResidentsModal";
import Modal from "../Modal";
import NotFound from "../DetailModals/NotFound";
import Search from "../Search";

const Planets = () => {
  const [page, setPage] = useState({ page: 1 });
  const [type, setType] = useState();
  const [id, setID] = useState();
  const [search, setSearch] = useState(null);
  const [notFound, setNoFound] = useState(false);
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

  const onClick = (value) => {
    setNoFound(false);
    setSearch(null);
    if (value === "") return;
    const url = `https://swapi.dev/api/planets/?search=${value}`;
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
    <div className="container planets-container">
      {notFound && <NotFound className="search-not-found" />}

      {type === "residents" && (
        <Modal title={"Residents"} onClick={closeModal}>
          <ResidentsModal title={"Residents"} id={id} />
        </Modal>
      )}
      <Search
        content={"Search"}
        emptyValue={sendRequest}
        page={page.page}
        onClick={onClick}
      />

      {!notFound && search === null && (
        <Carousel slide={false} className="wrapper-people">
          {data.map((vehicle, i) => {
            return (
              <Carousel.Item key={i}>
                <div className="my-card planets-card animate__animated animate__zoomInRight">
                  <h3>{vehicle.name}</h3>
                  <p>
                    <span>Population: </span>
                    {vehicle.population !== "unknown"
                      ? vehicle.population
                      : "We don't know"}
                    <br />
                    <span>Climate: </span>
                    {vehicle.climate !== "unknown"
                      ? vehicle.climate
                      : "We don't know"}
                    <br />
                    <span>Terrain: </span>
                    {vehicle.terrain !== "unknown"
                      ? vehicle.terrain
                      : "We don't know"}
                    <br />
                  </p>
                </div>
                <ModalButtons
                  className="planet-modal-btns animate__animated animate__rotateInDownLeft"
                  onClick={passToModal}
                  id={id}
                  page={page.page}
                  content={[{ text: "Residents" }]}
                  url={vehicle.url}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
      {search !== null && (
        <Row>
          {search.map((vehicle, i) => {
            return (
              <Col md={12} lg={4} key={i} className="my-card search-planets">
                {/* <img
                src="https://images.unsplash.com/photo-1648737966661-22e0c69d5aa5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
                alt=""
              /> */}

                <h3>{vehicle.name}</h3>
                <p>
                  <span>Population:</span> {vehicle.population} <br />
                  <span>Climate:</span> {vehicle.climate}
                  <br />
                  <span>Terrain:</span> {vehicle.terrain} <br />
                </p>

                <ModalButtons
                  className="pilot-starship-modal-btns-search"
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
      )}

      {!notFound && search === null && (
        <Paginate
          className="planets-paginate"
          change={changePage}
          num={6}
          pageProp={page.page}
        />
      )}
    </div>
  );
};

export default Planets;
