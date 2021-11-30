import { FC } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";

import { Pizza, useGetPizzasQuery } from "graphql/types";

import { IPizzaItemProps, PizzaItem } from "./components/PizzaItem";

export const Pizzas: FC = () => {
  const { loading, error, data } = useGetPizzasQuery();

  const pizzas = data?.pizzas as Pizza[] | null;

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="py-3 mb-0">Все пиццы</h1>
        </Col>
      </Row>
      {(loading || error) && (
        <Row className="justify-content-center">
          {loading && <Spinner animation="grow" />}
          {error && <Alert variant="danger">Что-то пошло не так!</Alert>}
        </Row>
      )}
      <Row>
        {pizzas?.map((pizza) => (
          <Col md="6" lg="4" xl="3" className="mb-4" key={pizza.id}>
            <PizzaItem pizza={pizza as IPizzaItemProps["pizza"]} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
