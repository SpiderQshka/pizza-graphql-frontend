import { FC } from "react";
import { Container, Row, Col, Button, Table, Form, Spinner, Alert } from "react-bootstrap";

import { addPizzaToCart, clearCart, removePizzaFromCart } from "helpers";
import { OrderedPizzasInput, useCreateOrderMutation, useGetCartItemsQuery } from "graphql/types";

export const Cart: FC = () => {
  const { data, loading: cartItemsLoading, error: cartItemsError } = useGetCartItemsQuery();
  const [createOrderMutation, { loading: orderMutationLoading, error: orderMutationError }] = useCreateOrderMutation();

  const totalAmount = Number(data?.cartItems.reduce((prev, curr) => prev + curr.amount, 0));
  const totalPrice = Number(data?.cartItems.reduce((prev, curr) => prev + curr.price * curr.amount, 0).toFixed(2));

  const handlePizzaAmountUpdate = (pizza: OrderedPizzasInput, amount: number) => {
    removePizzaFromCart(pizza);

    addPizzaToCart({ ...pizza, amount });
  };

  const handleOrder = async () => {
    const { errors } = await createOrderMutation({
      variables: {
        order: {
          totalAmount,
          totalPrice,
          orderedPizzas: data?.cartItems,
        },
      },
      fetchPolicy: "no-cache",
    });

    if (errors) return;

    clearCart();

    alert("Заказ создан успешно! Загляните в раздел 'Заказы' ;)");
  };

  return (
    <Container>
      <Row>
        <Col className="d-flex align-items-center justify-content-between">
          <h1 className="py-3 mb-0">Корзина</h1>
          {data?.cartItems.length !== 0 && (
            <Button onClick={clearCart} variant="light">
              Очистить корзину
            </Button>
          )}
        </Col>
      </Row>

      {orderMutationLoading || cartItemsLoading || orderMutationError || cartItemsError ? (
        <Row className="justify-content-center">
          {(orderMutationLoading || cartItemsLoading) && <Spinner animation="grow" />}
          {(orderMutationError || cartItemsError) && <Alert variant="danger">Что-то пошло не так!</Alert>}
        </Row>
      ) : data?.cartItems.length === 0 ? (
        <h2>Корзина пуста :(</h2>
      ) : (
        <>
          <Table borderless>
            <tbody>
              {data?.cartItems.map((pizza, i) => (
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
                  <td className="align-middle text-nowrap">{(pizza.price * pizza.amount).toFixed(2)} $</td>
                  <td className="align-middle text-end pe-0">
                    <Button onClick={() => removePizzaFromCart(pizza)} variant="light">
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
