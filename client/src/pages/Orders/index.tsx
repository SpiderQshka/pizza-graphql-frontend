import { FC } from "react";
import { Alert, Col, Container, Row, Spinner, Table } from "react-bootstrap";

import { OrderedPizzas, useGetOrdersQuery } from "graphql/types";
import { isNil } from "lodash";

export const Orders: FC = () => {
  const { loading, error, data } = useGetOrdersQuery({ fetchPolicy: "cache-and-network" });

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="py-3 mb-0">Заказы</h1>
        </Col>
      </Row>

      {(loading || error) && (
        <Row className="justify-content-center">
          {loading && <Spinner animation="grow" />}
          {error && <Alert variant="danger">Что-то пошло не так!</Alert>}
        </Row>
      )}

      {!isNil(data?.orders) && data?.orders.length !== 0 ? (
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Общее количество</th>
              <th>Общая цена</th>
              <th>Заказанные пиццы</th>
            </tr>
          </thead>
          <tbody>
            {data?.orders?.map((order, i) => {
              const orderedPizzas = order?.orderedPizzas as OrderedPizzas[] | null;

              return (
                <tr key={order?.id}>
                  <td>{i + 1}</td>
                  <td>{order?.totalAmount}</td>
                  <td>{order?.totalPrice} $</td>
                  <td className="py-2">
                    {orderedPizzas?.map(({ pizzaName, amount, dough, size }) => (
                      <p className="mb-0 p-0" key={`${pizzaName}-${dough}-${size}`}>
                        {pizzaName} ({dough}, {size} см.) * {amount}
                      </p>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <h2>Заказов нет :(</h2>
      )}
    </Container>
  );
};
