import { FC, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { clearCart, getPizzasFromCart } from "helpers";
import { useCreateOrderMutation } from "graphql/types";

export const Cart: FC = () => {
  const history = useHistory();
  const [pizzas, setPizzas] = useState(getPizzasFromCart());
  const [createOrderMutation, { loading, error }] = useCreateOrderMutation();

  const handleCartClear = () => {
    clearCart();
    setPizzas([]);
  };

  const handleOrder = async () => {
    const totalAmount = pizzas.reduce((prev, curr) => prev + curr.amount, 0);
    const totalPrice = pizzas.reduce((prev, curr) => prev + curr.price, 0);

    const { errors } = await createOrderMutation({
      variables: {
        order: {
          totalAmount,
          totalPrice,
          orderedPizzas: pizzas,
        },
      },
    });

    if (errors) return;

    const shouldRedirectToOrders = window.confirm("Order was successfully added. Do you want to look at it?");
    if (shouldRedirectToOrders) history.push("/orders");
    handleCartClear();
  };

  return (
    <div>
      <h1>Cart</h1>
      <hr />
      <ul>
        <li>
          <Link to="/">Go to pizzas</Link>
        </li>
        <li>
          <Link to="/orders">Go to orders</Link>
        </li>
      </ul>
      <hr />
      {pizzas.length === 0 ? (
        <h2>Cart is empty</h2>
      ) : (
        <div>
          <ul>
            {pizzas.map((pizza, i) => (
              <li key={i}>
                <p>
                  Pizza #{i + 1} - {pizza.pizzaName}
                </p>
                <p>Size: {pizza.size}</p>
                <p>Amount: {pizza.amount}</p>
                <p>Dough: {pizza.dough}</p>
                <p>Price: {pizza.price}</p>
              </li>
            ))}
          </ul>
          <button onClick={handleCartClear}>Clear cart</button>
          <button onClick={handleOrder}>Order</button>
        </div>
      )}
      {loading && <h2>Order is loading...</h2>}
      {error && <h2>Error happend while loading order!</h2>}
    </div>
  );
};
