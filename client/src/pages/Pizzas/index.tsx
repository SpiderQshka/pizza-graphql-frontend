import { FC } from "react";
import { Link } from "react-router-dom";
import { useGetPizzasQuery } from "graphql/types";

import { PizzaItem } from "./components/PizzaItem";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";

export const Pizzas: FC = () => {
  const { loading, error, data } = useGetPizzasQuery();

  return (
    <Container>
      <Row>
        <Col>
          <h1>Pizzas</h1>
        </Col>
      </Row>
      {(loading || error) && (
        <Row className="justify-content-center">
          {loading && <Spinner animation="grow" />}
          {error && <Alert variant="danger">Something went wrong!</Alert>}
        </Row>
      )}
      <Row>
        {data?.pizzas?.map((pizza) => (
          <Col md="6" lg="4" xl="3" className="mb-4">
            <PizzaItem pizza={pizza} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
