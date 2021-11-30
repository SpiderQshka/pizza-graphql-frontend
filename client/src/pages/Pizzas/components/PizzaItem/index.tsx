import React, { FC, useEffect, useState } from "react";
import { find, uniq } from "lodash";
import { Card, Form, Button } from "react-bootstrap";

import { OrderedPizzasInput, Pizza, PizzaModification } from "graphql/types";
import { addPizzaToCart, checkIsPizzaInCart } from "helpers";
import pizzaImg from "images/pizza.png";

export interface IPizzaItemProps {
  pizza: Omit<Pizza, "modifications"> & { modifications: Omit<PizzaModification, "pizzasIds">[] };
}

export const PizzaItem: FC<IPizzaItemProps> = ({ pizza }) => {
  const doughs = uniq(pizza.modifications.map(({ dough }) => dough));
  const sizes = uniq(pizza.modifications.map(({ size }) => size));

  const calculatePizzaPrice = (size: number, dough: string, amount: number = 1) => amount * (find(pizza.modifications, { size, dough })?.price || 0);

  const defaultPizza = {
    amount: 1,
    dough: doughs[0],
    size: sizes[0],
    pizzaName: pizza.name,
    price: calculatePizzaPrice(sizes[0], doughs[0]),
  };

  const [selectedPizza, setSelectedPizza] = useState<OrderedPizzasInput>(defaultPizza);
  const [isSelectedPizzaInCart, setIsSelectedPizzaInCart] = useState(false);

  useEffect(() => {
    setIsSelectedPizzaInCart(checkIsPizzaInCart(selectedPizza));
  }, [selectedPizza]);

  const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const updatedPizza = {
      ...selectedPizza,
    };

    if (e.target.name === "size") updatedPizza.size = +e.target.value;
    if (e.target.name === "dough") updatedPizza.dough = e.target.value;
    if (e.target.name === "amount") updatedPizza.amount = +e.target.value;

    updatedPizza.price = calculatePizzaPrice(updatedPizza.size, updatedPizza.dough);

    setSelectedPizza(updatedPizza);
  };

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    addPizzaToCart(selectedPizza);
    setIsSelectedPizzaInCart(true);
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={pizzaImg} className="p-3" />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-3">{pizza.name}</Card.Title>
        <Form onChange={handleFormChange} className="flex-grow-1">
          <Form.Group className="mb-2">
            {doughs.map((dough) => (
              <Form.Check key={dough} type="radio" inline id={`${pizza.id}-${dough}`} label={dough} name="dough" value={dough} defaultChecked={selectedPizza.dough === dough} />
            ))}
          </Form.Group>
          <Form.Group className="mb-3">
            {sizes.map((size) => (
              <Form.Check key={size} inline type="radio" id={`${pizza.id}-${size}`} label={`${size} см.`} name="size" value={size} defaultChecked={selectedPizza.size === size} />
            ))}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Количество</Form.Label>
            <Form.Control type="number" name="amount" id={`${pizza.id}-amount`} min={1} defaultValue={selectedPizza.amount} />
          </Form.Group>
          <p>
            <b>Цена:</b> {calculatePizzaPrice(selectedPizza.size, selectedPizza.dough, selectedPizza.amount)} $
          </p>
        </Form>
        {isSelectedPizzaInCart && <p className="text-muted mb-2">Пицца уже есть в корзине</p>}
        <Button type="submit" disabled={isSelectedPizzaInCart} className="justify-self-end" onClick={handleFormSubmit}>
          Добавить
        </Button>
      </Card.Body>
    </Card>
  );
};
