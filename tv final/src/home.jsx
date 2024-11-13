import React, { useState } from "react";
import useFetch from "./hook/useFetch";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import App from "./App";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { data, isLoading, error } = useFetch("https://api.tvmaze.com/shows");

  // Sélectionner un film à la une
  const featuredMovie = data ? data.find((show) => show.name === "The Simpsons") : null;

  // Fonction de gestion de clic pour les films
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setCurrentPage("app");
  };

  // Fonction pour rechercher des films ou séries via l'API
  const searchMovies = async (query) => {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const results = await response.json();
    return results.map(result => result.show);
  };

  // Gérer la recherche
  const handleSearch = async (query) => {
    const results = await searchMovies(query);
    setSearchResults(results);
  };

  // Si un film est sélectionné, afficher la page du film
  if (currentPage === "app" && selectedMovie) {
    return <App movie={selectedMovie} setCurrentPage={setCurrentPage} />;
  }

  const horrorMovies = data ? data.filter((show) => show.genres.includes("Horror")) : [];


  return (
    <div className="bg-card p-4 flex flex-col text-secondary-foreground">
      {isLoading && <p>Chargement...</p>}
      {error && <p>Erreur: {error}</p>}
      <input
        type="text"
        placeholder="Rechercher un film ou une série..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        className="p-2 border rounded-md focus:outline-none text-black"
      />
  
      {/* Film à la une */}
      {!searchQuery && featuredMovie && (
  <div className="featured-movie mt-4 p-4 flex flex-col items-center" onClick={() => handleMovieClick(featuredMovie)}>
    <h2 className="text-xl font-bold mb-2">Série à la une</h2>
    <div className="flex justify-center">
      <img src={featuredMovie.image?.medium || 'placeholder.jpg'} alt={featuredMovie.name} className="featured-movie-image rounded-md" />
    </div>
  </div>
)}
  
      {/* Résultats de recherche */}
      {searchResults.length > 0 && (
  <div className="search-results mt-4">
    <h2 className="text-xl font-bold mb-2">Recherche</h2>
    <div className="grid grid-cols-3 gap-4">
      {searchResults.map((movie) => (
        <div key={movie.id} onClick={() => handleMovieClick(movie)} className="movie-item">
          <img src={movie.image?.medium || 'placeholder.jpg'} alt={movie.name} className="movie-image rounded-md" />
        </div>
      ))}
    </div>
  </div>
)}
  
      {/* Films de la catégorie horreur */}
      {!searchQuery && (
  <div className="horror-movies mt-4">
    <h2 className="text-xl font-bold mb-2">Séries d'horreur</h2>
    <div className="grid grid-cols-3 gap-4">
      {horrorMovies.map((movie) => (
        <div key={movie.id} onClick={() => handleMovieClick(movie)} className="horror-movie-item">
          <img src={movie.image?.medium || 'placeholder.jpg'} alt={movie.name} className="horror-movie-image rounded-md" />
        </div>
      ))}
    </div>
  </div>
)}
    </div>
  );
};

export default Home;
