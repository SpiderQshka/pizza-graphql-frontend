import { makeVar } from "@apollo/client";
import { CartItem } from "graphql/types";
import { find, isEqual, sortBy } from "lodash";

const cartItemsVar = makeVar<CartItem[]>(JSON.parse(localStorage.getItem("cart") as string) || []);
const persistCart = () => localStorage.setItem("cart", JSON.stringify(cartItemsVar()));

export const getPizzasFromCart = (): CartItem[] => sortBy(cartItemsVar(), ["pizzaName", "size"]);

export const clearCart = (): void => {
  cartItemsVar([]);
  persistCart();
};

export const addPizzaToCart = (pizza: CartItem): void => {
  cartItemsVar([...cartItemsVar(), pizza]);
  persistCart();
};

export const removePizzaFromCart = (pizza: CartItem): void => {
  const updatedPizzas = cartItemsVar().filter((el) => !isEqual(el, pizza));

  cartItemsVar(updatedPizzas);
  persistCart();
};

export const checkIsPizzaInCart = ({ amount, ...rest }: CartItem): boolean => Boolean(find(cartItemsVar(), rest));
