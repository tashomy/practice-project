import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import useHttp from "../../hooks/useHttp";
import { getAllSpecies, getPageSpecies } from "../../lib/api";
import Loading from "../Loading";
import Paginate from "../Pagination";

const Species = () => {
  const [page, setPage] = useState({ page: 1 });
  const { sendRequest, status, data, error } = useHttp(getPageSpecies, true);

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
    <div className="container species-container">
      <Row className="wrapper-people">
        {data.map((vehicle, i) => {
          return (
            <Col md={12} lg={5} className="person-card" key={i}>
              <h3>{vehicle.name}</h3>
              <p>
                <span>Language:</span> {vehicle.language} <br />
                <span>Home-world:</span> {vehicle.homeworld}
                <br />
                <span>Classification:</span> {vehicle.classification} <br />
              </p>
            </Col>
          );
        })}
      </Row>
      <Paginate change={changePage} num={4} pageProp={page.page} />
    </div>
  );
};

export default Species;
