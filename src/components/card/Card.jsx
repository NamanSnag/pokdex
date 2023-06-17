
import "./style.scss"

const Card = ({ pokemon }) => {
  console.log(pokemon.image);

  const img =
    "https://images.unsplash.com/photo-1609372332255-611485350f25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGlrYWNodXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60";
  return (
    <div className="card">
      <img src={pokemon.image} alt="pokemon" />
      <div className="card__details">
        <h2>{pokemon.name}</h2>
        <p>#{pokemon.id}</p>
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
