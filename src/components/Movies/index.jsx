import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import useHttp from "../../hooks/useHttp";
import { getAllMovies, getPageMovies } from "../../lib/api";
import Loading from "../Loading";

const Movies = () => {
  const [page, setPage] = useState({ page: 1 });
  const { sendRequest, status, data, error } = useHttp(getAllMovies, true);

  useEffect(() => {
    sendRequest(page);
  }, [sendRequest, page]);

  if (status === "pending") {
    return <Loading />;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container movies-container">
      <Row className="wrapper-people">
        {data.map((movie, i) => {
          return (
            <Col md={12} lg={5} className="person-card" key={i}>
              {/* <h3>{movie.name}</h3> */}
              <p>
                <span>Title:</span> {movie.title} <br />
                <span>Opening:</span> {movie.opening_crawl}
                <br />
                <span>Director:</span> {movie.director} <br />
              </p>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Movies;
