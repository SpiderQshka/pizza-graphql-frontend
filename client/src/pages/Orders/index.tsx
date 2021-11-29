import { FC } from "react";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "graphql/types";

export const Orders: FC = () => {
  const { loading, error, data } = useGetOrdersQuery();

  return (
    <div>
      <h1>Orders</h1>
      <hr />
      <ul>
        <li>
          <Link to="/">Go to pizzas</Link>
        </li>
        <li>
          <Link to="/cart">Go to cart</Link>
        </li>
      </ul>
      <hr />
      {loading && <h2>Loading...</h2>}
      {error && <h2>Something went wrong!</h2>}
      {data?.orders?.length === 0 ? (
        <h2>You didn't ordered anything yet</h2>
      ) : (
        <ul>
          {data?.orders?.map((order, i) => (
            <li key={order.id}>
              <p>Order #{i + 1}</p>
              <p>Amount: {order.totalAmount}</p>
              <p>Price: {order.totalPrice}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
