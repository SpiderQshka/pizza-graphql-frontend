import { FC, useEffect, useState } from "react";
import { Container, Row, Col, Button, Table, Form, Spinner, Alert } from "react-bootstrap";
import { sortBy } from "lodash";

import { addPizzaToCart, clearCart, getPizzasFromCart, removePizzaFromCart } from "helpers";
import { OrderedPizzasInput, useCreateOrderMutation } from "graphql/types";

export const Cart: FC = () => {
  const [pizzas, setPizzas] = useState<OrderedPizzasInput[]>([]);
  const [createOrderMutation, { loading, error }] = useCreateOrderMutation();

  const totalAmount = pizzas.reduce((prev, curr) => prev + curr.amount, 0);
  const totalPrice = pizzas.reduce((prev, curr) => prev + curr.price * curr.amount, 0);

  const updatePizzas = () => setPizzas(sortBy(getPizzasFromCart(), ["pizzaName", "size"]));

  useEffect(() => {
    updatePizzas();
  }, []);

  const handleCartClear = () => {
    clearCart();
    updatePizzas();
  };

  const handlePizzaRemove = (pizza: OrderedPizzasInput) => {
    removePizzaFromCart(pizza);
    updatePizzas();
  };

  const handlePizzaAmountUpdate = (pizza: OrderedPizzasInput, amount: number) => {
    removePizzaFromCart(pizza);

    addPizzaToCart({ ...pizza, amount });

    updatePizzas();
  };

  const handleOrder = async () => {
    const { errors } = await createOrderMutation({
      variables: {
        order: {
          totalAmount,
          totalPrice,
          orderedPizzas: pizzas,
        },
      },
      fetchPolicy: "no-cache",
    });

    if (errors) return;

    handleCartClear();

    alert("Заказ создан успешно! Загляните в раздел 'Заказы' ;)");
  };

  return (
    <Container>
      <Row>
        <Col className="d-flex align-items-center justify-content-between">
          <h1 className="py-3 mb-0">Корзина</h1>
          {pizzas.length !== 0 && (
            <Button onClick={handleCartClear} variant="light">
              Очистить корзину
            </Button>
          )}
        </Col>
      </Row>

      {(loading || error) && (
        <Row className="justify-content-center">
          {loading && <Spinner animation="grow" />}
          {error && <Alert variant="danger">Что-то пошло не так!</Alert>}
        </Row>
      )}

      {pizzas.length === 0 ? (
        <h2>Корзина пуста :(</h2>
      ) : (
        <>
          <Table borderless>
            <tbody>
              {pizzas.map((pizza, i) => (
                <tr key={i}>
                  <td className="align-middle ps-0">
                    <p className="mb-1">{pizza.pizzaName}</p>
                    <p className="text-muted  mb-0">
                      {pizza.dough}, {pizza.size} см.
                    </p>
                  </td>
                  <td className="align-middle">
                    <Form.Control
                      type="number"
                      name="amount"
                      className="w-auto ms-auto"
                      id={`${pizza.pizzaName}-${pizza.amount}`}
                      min={1}
                      value={pizza.amount}
                      onChange={(e) => handlePizzaAmountUpdate(pizza, +e.target.value)}
                    />
                  </td>
                  <td className="align-middle text-nowrap">{pizza.price * pizza.amount} $</td>
                  <td className="align-middle text-end pe-0">
                    <Button onClick={() => handlePizzaRemove(pizza)} variant="light">
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={2} className="ps-0">
                  Всего пицц: {totalAmount} шт.
                </th>
                <th colSpan={2} className="pe-0 text-end">
                  Сумма заказа: {totalPrice} $
                </th>
              </tr>
            </tfoot>
          </Table>
          <Button onClick={handleOrder}>Заказать</Button>
        </>
      )}
    </Container>
  );
};
