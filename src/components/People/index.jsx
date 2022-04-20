import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import useHttp from "../../hooks/useHttp";
import { getAllPeople } from "../../lib/api";
import Loading from "../Loading";

const People = () => {
  const { sendRequest, status, data, error } = useHttp(getAllPeople, true);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  if (status === "pending") {
    return <Loading />;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container people-container">
      <Row className="wrapper-people">
        {data.map((person, i) => {
          return (
            <Col md={12} lg={5} className="person-card" key={i}>
              <h3>{person.name}</h3>
              <p>
                <span>Birth year:</span> {person.birth_year}
                <br />
                <span>Gender:</span>{" "}
                {person.gender === "n/a" ? `who knows?` : person.gender} <br />
              </p>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default People;
