import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import useHttp from "../../hooks/useHttp";
import { getAllSpaceships, getPageSpaceships } from "../../lib/api";
import Loading from "../Loading";
import Paginate from "../Pagination";

const Spaceships = () => {
  const [page, setPage] = useState({ page: 1 });
  const { sendRequest, status, data, error } = useHttp(getPageSpaceships, true);

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
    <div className="container starship-container">
      <Row className="wrapper-people">
        {data.map((spaceship, i) => {
          return (
            <Col md={12} lg={5} className="person-card" key={i}>
              <h3>{spaceship.name}</h3>
              <p>
                <span>Manufacturer:</span> {spaceship.manufacturer} <br />
                <span>Model:</span> {spaceship.model}
                <br />
                <span>Crew:</span> {spaceship.crew} <br />
              </p>
            </Col>
          );
        })}
      </Row>
      <Paginate change={changePage} num={4} pageProp={page.page} />
    </div>
  );
};

export default Spaceships;
