// eslint-disable-next-line no-unused-vars
import "../styles/_card.scss";
import { useState, useEffect } from "react";
import { Card, CardImg, Col } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
export default function PokemonCard({ pokemon }) {
  const [data, setData] = useState(null);
  const { name, url } = pokemon;
  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
    });
  }, [name, url]);
  if (!data) {
    return null;
  }
  return (
    <Col sm={2} className="container">
      <Link to="/info" state={{ info: data }}>
        <Card
          className={`pokemon-card pokemon-background ${data.types[0].type.name}`}
        >
          <div className="wrapper d-flex text-center">
            <div className="col-8 pokemon-name">{name}</div>
            <div className="col-4">#{String(data.id).padStart(3, "0")}</div>
          </div>
          <CardImg
            alt={name}
            src={data.sprites.other["official-artwork"]["front_default"]}
          />
          <span className="col-12 text-center">Type</span>
          <div className="pokemon-type d-flex flex-row justify-content-around ">
            {data.types.map((item) => {
              return (
                <span className={`pkm-type ${item.type.name}`}>
                  {item.type.name}{" "}
                </span>
              );
            })}
          </div>
        </Card>
      </Link>
    </Col>
  );
}
