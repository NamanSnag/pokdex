import { useNavigate } from "react-router-dom";
import "./style.scss"

const Card = ({ pokemon }) => {
  const navigate = useNavigate();

  const handelDetails =() => {
    navigate(`/detail/${pokemon.id}`)
  }

  return (
    <div className="card" onClick={handelDetails}>
      <img src={pokemon.image} alt="pokemon" />
      <div className="card__details">
        <h2>{pokemon.name}</h2>
        <p>ID : #{pokemon.id}</p>
        <p>Type : </p>
        <ul>
          {pokemon.type.map((type) => (
            <li key={type}>{type}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
