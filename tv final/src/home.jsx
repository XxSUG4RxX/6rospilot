// import React, { useState } from "react";
// import useFetch from "./hook/useFetch";
// import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
// import App from "./App"; // Importer App pour la navigation
// import { Button } from "@/components/ui/button";

// const Home = () => {
//   const [actionMovies, setActionMovies] = useState([]);
//   const [horrorMovies, setHorrorMovies] = useState([]);
//   const [otherMovies, setOtherMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null); // État pour le film sélectionné
//   const [currentPage, setCurrentPage] = useState("home"); // État pour la page actuelle
//   const [searchQuery, setSearchQuery] = useState(''); // État pour la requête de recherche
//   const { data, isLoading, error } = useFetch("https://api.tvmaze.com/shows");

//   if (data && actionMovies.length === 0 && horrorMovies.length === 0 && otherMovies.length === 0) {
//     const filteredActionMovies = data.filter((show) =>
//       show.genres.includes("Action")
//     );
//     const filteredHorrorMovies = data.filter((show) =>
//       show.genres.includes("Horror")
//     );
//     const filteredOtherMovies = data.filter((show) =>
//       !show.genres.includes("Action") && !show.genres.includes("Horror")
//     );
//     setActionMovies(filteredActionMovies);
//     setHorrorMovies(filteredHorrorMovies);
//     setOtherMovies(filteredOtherMovies);
//   }


//   // Sélectionner un film à la une
//   const featuredMovie = data ? data.find((show) => show.name === "The Simpsons") : null;

//   // Fonction de gestion de clic pour les films
//   const handleMovieClick = (movie) => {
//     setSelectedMovie(movie);
//     setCurrentPage("app");
//   };

//     // Si un film est sélectionné, afficher la page du film
//     if (currentPage === "app" && selectedMovie) {
//       return <App movie={selectedMovie} setCurrentPage={setCurrentPage} />;
//     }

//     const filteredMovies = data ? data.filter((show) =>
//       show.name.toLowerCase().includes(searchQuery.toLowerCase())
//     ) : [];


//   return (
//     <div className="bg-card p-4 flex flex-col text-secondary-foreground">
//       {isLoading && <p>Chargement...</p>}
//       {error && <p>Erreur: {error}</p>}
//       {featuredMovie && (
//         <div className="mb-8">
//           <h1 className="font-bold text-3xl mb-4">Film à la Une</h1>
//           <div className="flex flex-col items-center">
//             {featuredMovie.image && (
//               <div onClick={() => handleMovieClick(featuredMovie)} className="relative w-80">
//               <img 
//                 className="rounded-lg w-full h-full"
//                 src={featuredMovie.image.medium}
//                 alt={featuredMovie.name}
//               />
//               <div className="flex flex-col gap-2 absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center p-2">
//                 <p className="font-bold text-xl">{featuredMovie.name}</p>
//                 <p>{new Date(featuredMovie.premiered).getFullYear()} | {featuredMovie._embedded?.seasons?.length} saisons</p>
//                 <Button className="flex w-full h-9 gap-3">
//                   <img src="play.svg" alt="" /> Play
//                 </Button>
//               </div>
//             </div>
//             )}
//           </div>
//         </div>
//       )}
//       <h2 className="font-bold text-2xl mb-4">Films d'Action</h2>
//       <Carousel>
//         <CarouselContent className="w-1/3">
//           {actionMovies.map((movie) => (
//             <CarouselItem key={movie.id}>
//               <img
//                 className="rounded-lg"
//                 src={movie.image.medium}
//                 alt={movie.name}
//                 onClick={() => handleMovieClick(movie)}
//               />
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//       <h2 className="font-bold text-2xl mt-4 mb-4">Films d'Horreur</h2>
//       <Carousel>
//         <CarouselContent className="w-1/3">
//           {horrorMovies.map((movie) => (
//             <CarouselItem key={movie.id}>
//               <img
//                 className="rounded-lg"
//                 src={movie.image.medium}
//                 alt={movie.name}
//                 onClick={() => handleMovieClick(movie)}
//               />
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//       <h2 className="font-bold text-2xl mb-4">Autres Films</h2>
//     <div className="grid grid-cols-2 gap-4">
//       {otherMovies.map((movie) => (
//         <div key={movie.id} className="flex flex-col items-center">
//           <img
//             className="rounded-lg"
//             src={movie.image.medium}
//             alt={movie.name}
//             onClick={() => handleMovieClick(movie)}
//           />
//         </div>
//       ))}
//     </div>
//     </div>
//   );
// };

// export default Home;

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