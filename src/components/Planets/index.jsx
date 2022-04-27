import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import useHttp from "../../hooks/useHttp";
import { getAllPlanets, getPagePlanets } from "../../lib/api";
import Loading from "../Loading";
import Paginate from "../Pagination";

const Planets = () => {
  const [page, setPage] = useState({ page: 1 });
  const { sendRequest, status, data, error } = useHttp(getPagePlanets, true);

  useEffect(() => {
    sendRequest(page);
  }, [sendRequest, page]);

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
      <Row className="wrapper-people">
        {data.map((vehicle, i) => {
          return (
            <Col md={12} lg={5} className="person-card" key={i}>
              <h3>{vehicle.name}</h3>
              <p>
                <span>Population:</span> {vehicle.population} <br />
                <span>Climate:</span> {vehicle.climate}
                <br />
                <span>Terrain:</span> {vehicle.terrain} <br />
              </p>
            </Col>
          );
        })}
      </Row>
      <Paginate change={changePage} num={6} pageProp={page.page} />
    </div>
  );
};

export default Planets;
