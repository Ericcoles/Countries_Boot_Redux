import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addFav,
  favoritesSlice,
} from "../features/countries/favoritesSlice.js";
import { LinkContainer } from "react-router-bootstrap";

const CountryCard = (country, value) => {
  const dispatch = useDispatch();

  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={country.flags.svg}
        className="rounded h-50"
        style={{
          objectFit: "cover",
          minHeight: "200px",
          maxHeight: "200px",
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{country.name.common}</Card.Title>
        <Card.Subtitle className="mb-5 text-muted">
          {country.name.official}
        </Card.Subtitle>
        <ListGroup variant="flush" className="flex-grow-1 justify-content-end">
          <ListGroup>
            <button
              onClick={() => {
                dispatch(addFav(country));
              }}
            >
              Add Favorite
            </button>
          </ListGroup>
          <ListGroup.Item>
            <i className="bi bi-translate me-2"></i>
            {Object.values(country.languages || {}).join(", ")}
          </ListGroup.Item>
          <ListGroup.Item>
            <i className="bi bi-cash-coin me-2"></i>

            {Object.values(country.currencies || {})
              .map((currency) => currency.name)
              .join(", ")}
          </ListGroup.Item>
          <ListGroup.Item>
            <i className="bi bi-people me-2"></i>
            {country.population}
          </ListGroup.Item>
        </ListGroup>

        <LinkContainer
          to={`/countries/${country.name.common}`}
          state={{ country: country }}
        >
          <button> See more</button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default CountryCard;
