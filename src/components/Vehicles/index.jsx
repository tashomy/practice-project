import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import useHttp from "../../hooks/useHttp";
import { getAllVehicles, getPageVehicles } from "../../lib/api";
import Loading from "../Loading";
import Paginate from "../Pagination";

const Vehicles = () => {
  const [page, setPage] = useState({ page: 1 });
  const { sendRequest, status, data, error } = useHttp(getPageVehicles, true);

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
    <div className="container vehicles-container">
      <Row className="wrapper-people">
        {data.map((vehicle, i) => {
          return (
            <Col md={12} lg={5} className="person-card" key={i}>
              <h3>{vehicle.name}</h3>
              <p>
                <span>Model:</span> {vehicle.model} <br />
                <span>Cost in credits:</span> {vehicle.cost_in_credits}
                <br />
                <span>Crew:</span> {vehicle.crew} <br />
              </p>
            </Col>
          );
        })}
      </Row>
      <Paginate change={changePage} num={4} pageProp={page.page} />
    </div>
  );
};

export default Vehicles;
