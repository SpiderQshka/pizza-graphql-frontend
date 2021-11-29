import React, { FC, useState } from "react";
import { find, noop, uniq } from "lodash";
import { OrderedPizzasInput, Pizza, PizzaModification } from "graphql/types";
import { addPizzaToCart } from "helpers";
import { useHistory } from "react-router";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import pizzaImg from "images/pizza.png";

interface IPizzaItemProps {
  pizza: Omit<Pizza, "modifications"> & { modifications: Omit<PizzaModification, "pizzasIds">[] };
}

export const PizzaItem: FC<IPizzaItemProps> = ({ pizza }) => {
  const history = useHistory();
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

  const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const updatedPizza = {
      ...selectedPizza,
    };

    if (e.target.name === "size") updatedPizza.size = +e.target.value;
    if (e.target.name === "dough") updatedPizza.dough = e.target.value;
    if (e.target.name === "amount") updatedPizza.amount = +e.target.value;

    updatedPizza.price = calculatePizzaPrice(updatedPizza.size, updatedPizza.dough, updatedPizza.amount);

    setSelectedPizza(updatedPizza);
  };

  const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    // TODO Find better type
    e.preventDefault();
    addPizzaToCart(selectedPizza);
    const shouldRedirectToCart = window.confirm(`Pizza ${selectedPizza.pizzaName} added to your cart. Do you want to make an order?`);
    if (shouldRedirectToCart) history.push("/cart");
  };

  return (
    <Card>
      <Card.Img variant="top" src={pizzaImg} className="p-3" />
      <Card.Body>
        <Card.Title>{pizza.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{pizza.id}</Card.Subtitle>
        <Form onChange={handleFormChange} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3 align-items-center">
            <Form.Label>Dough</Form.Label>
            <div>
              {doughs.map((dough) => (
                <Form.Check key={dough} type="radio" inline id={`${pizza.id}-${dough}`} label={dough} name="dough" value={dough} checked={selectedPizza.dough === dough} onChange={noop} />
              ))}
            </div>
          </Form.Group>
          <Form.Group className="mb-3 align-items-center">
            <Form.Label>Size</Form.Label>
            <div>
              {sizes.map((size) => (
                <Form.Check key={size} inline type="radio" id={`${pizza.id}-${size}`} label={size} name="size" value={size} checked={selectedPizza.size === size} onChange={noop} />
              ))}
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Number</Form.Label>
            <Form.Control type="number" name="amount" id={`${pizza.id}-amount`} min={1} value={selectedPizza.amount} onChange={noop} />
          </Form.Group>
          <p>
            <b>Price:</b> {selectedPizza.price}
          </p>
          <Button type="submit">Add to cart</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
