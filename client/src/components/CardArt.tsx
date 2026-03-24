import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./CardArt.css";
import { useFavorites } from "../contexts/FavoritesContext";

interface artType {
  title: string;
  primaryImageSmall: string;
  artistDisplayName: string;
  country: string;
  objectID: string;
}

interface propsType {
  id: string;
}

function CardArt({ id }: propsType) {
  const [fetchArt, setFetchArt] = useState<artType | null>(null); // État pour stocker les données de l'œuvre récupérées
  const { toggleFavorite, isArtLiked } = useFavorites(); // État pour gérer si l'œuvre est "aimée" ou non

  useEffect(() => {
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
    )
      .then((resultatApi) => resultatApi.json()) // Conversion de la réponse en JSON
      .then((responseJson) => setFetchArt(responseJson)); // Mise à jour de l'état avec les données récupérées
  }, [id]);

  //Fonction pour gérer les "likes"

  const handleLike = () => {
    if (fetchArt) {
      toggleFavorite(fetchArt);
    }
  };

  return (
    <article className="cardArtContainer">
      {fetchArt ? (
        <>
          {/* Vérifie si les données de l'œuvre ont été chargées */}
          <img
            className="cardArtImg"
            src={fetchArt.primaryImageSmall}
            alt={fetchArt.title}
          />
          <h2 className="imgTitle">{fetchArt.title}</h2>
          {/* Bouton pour gérer les "likes" */}
          <button type="button" className="likeButton" onClick={handleLike}>
            {isArtLiked(fetchArt.objectID) ? "❤️" : "🤍"}
          </button>

          {/* Bouton pour afficher plus de détails */}
          <Link to={`/article/${id}`} state={fetchArt}>
            <button type="button" className="detailsButton">
              See more
            </button>
          </Link>
        </>
      ) : (
        <p id="loading">Loading...</p>
      )}
    </article>
  );
}

export default CardArt;
