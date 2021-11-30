import { OrderedPizzasInput } from "graphql/types";
import { find, isEqual } from "lodash";

export const getPizzasFromCart = (): OrderedPizzasInput[] => JSON.parse(localStorage.getItem("cart") as string) || [];

export const clearCart = (): void => localStorage.removeItem("cart");

export const addPizzaToCart = (pizza: OrderedPizzasInput): void => {
  const pizzas = getPizzasFromCart();
  const updatedPizzas = [...pizzas, pizza];

  localStorage.setItem("cart", JSON.stringify(updatedPizzas));
};

export const removePizzaFromCart = (pizza: OrderedPizzasInput): void => {
  const pizzas = getPizzasFromCart();
  const updatedPizzas = pizzas.filter((el) => !isEqual(el, pizza));

  localStorage.setItem("cart", JSON.stringify(updatedPizzas));
};

export const checkIsPizzaInCart = ({ amount, ...rest }: OrderedPizzasInput): boolean => {
  const pizzas = getPizzasFromCart();

  return Boolean(find(pizzas, rest));
};
