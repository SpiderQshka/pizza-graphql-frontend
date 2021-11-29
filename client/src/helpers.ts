import { OrderedPizzasInput } from "graphql/types";

export const getPizzasFromCart = (): OrderedPizzasInput[] => JSON.parse(localStorage.getItem("cart") as string) || [];

export const clearCart = (): void => localStorage.removeItem("cart");

export const addPizzaToCart = (pizza: OrderedPizzasInput): void => {
  const pizzas = getPizzasFromCart();
  const updatedPizzas = [...pizzas, pizza];

  localStorage.setItem("cart", JSON.stringify(updatedPizzas));
};
