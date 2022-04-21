import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import useHttp from "../../hooks/useHttp";
import { getAllPeople, getPagePeople } from "../../lib/api";
import Loading from "../Loading";
import Paginate from "../Pagination";

const People = () => {
  const [page, setPage] = useState(1);
  const { sendRequest, status, data, error } = useHttp(getPagePeople, true);

  useEffect(() => {
    sendRequest(page);
  }, [sendRequest, page]);
  if (status === "pending") {
    return <Loading />;
  }
  if (error) {
    return <p>{error}</p>;
  }

  const changePage = async (e) => {
    e.preventDefault();
    const num = e.target.text;

    if (num === undefined) {
      setPage(1);
    } else {
      setPage({ page: num });
    }
  };

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
      <nav className="paginate" aria-label="Page navigation example">
        <ul>
          <li className="page-item">
            <a href="3" onClick={changePage}>
              {1}
            </a>
          </li>
          <li className="page-item">
            <a href="3" onClick={changePage}>
              {2}
            </a>
          </li>
          <li className="page-item">
            <a href="3" onClick={changePage}>
              {3}
            </a>
          </li>
          <li className="page-item">
            <a href="3" onClick={changePage}>
              {4}
            </a>
          </li>
          <li className="page-item">
            <a href="3" onClick={changePage}>
              {5}
            </a>
          </li>
          <li className="page-item">
            <a href="3" onClick={changePage}>
              {6}
            </a>
          </li>
          <li className="page-item">
            <a href="3" onClick={changePage}>
              {7}
            </a>
          </li>
          <li className="page-item">
            <a href="3" onClick={changePage}>
              {8}
            </a>
          </li>
          <li className="page-item">
            <a href="3" onClick={changePage}>
              {9}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default People;
