import React, { useState } from "react";
import useFetch from "./hook/useFetch";
import { Button } from "@/components/ui/button";
 
const App = ({ movie, setCurrentPage }) => {
  const { data, isLoading, error } = useFetch(
    `https://api.tvmaze.com/singlesearch/shows?q=${movie.name}&embed[]=seasons&embed[]=episodes`
  );
 
  const [selectedSeason, setSelectedSeason] = useState(1);
 
  const numberSeasons = data?._embedded?.seasons?.length;
 
  const episodesBySeason = data?._embedded?.episodes?.filter(
    (episode) => episode.season === selectedSeason
  );
 
  const handleBackClick = () => {
    setCurrentPage("home");
  };
 
  return (
    <div className="bg-card px-4 pb-12 pt-8 flex text-secondary-foreground">
      {isLoading && <p>Chargement...</p>}
      {error && <p>Erreur: {error}</p>}
      {data && (
        <div className="flex flex-col justify-center items-center">
          <Button className="mb-4" onClick={handleBackClick}>
            Retour à l'accueil
          </Button>
          <img className="pb-8" src="phar.png" alt="" />
 
          {data.image && (
            // Image du start
            <img
              className="rounded-lg sm:w-[250px] md:w-[500px]"
              src={data?.image?.medium}
              alt={data?.name}
            />
          )}
 
          <section className=" px-2 py-6 flex justify-center flex-col gap-6">
            <div className="flex flex-col gap-3">
              {/* Titre */}
              <h2 className="font-bold text-2xl">{data?.name}</h2>
 
              {/* Date Nb-saisons genre  */}
              <section className="flex gap-6 items-center text-sm md:text-xl">
                <p>{new Date(data?.premiered).getFullYear()}</p>
                <p>{numberSeasons} saisons</p>
                <div className="flex flex-wrap space-x-2">
                  {data?.genres?.map((genre, index) => (
                    <p key={index} className="">
                      {genre}
                    </p>
                  ))}
                </div>
              </section>
            </div>
 
            {/* Bouton Play et Download */}
            <section className="flex flex-col items-center gap-3">
              <Button className=" text-xl md:text-2xl flex w-[250px] md:w-[400px] items-center justify-center gap-2">
                <img src="play.svg" alt="" /> Play
              </Button>
              <Button
                variant="secondary"
                className=" text-xl md:text-2xl flex w-[250px] md:w-[400px] items-center justify-center gap-2"
              >
                <img src="dl.svg" alt="" /> Download
              </Button>
            </section>
 
            {/* Description */}
            <section className=" mt-2 flex flex-col gap-2">
              <h3 className="font-bold text-xl">Description</h3>
              <p
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: data?.summary }}
              ></p>
            </section>
 
            {/* Réalisateurs */}
            <section className=" flex flex-col gap-2">
              <h3 className="font-bold text-xl">Réalisateur</h3>
              <p className="text-sm">{data.network?.name || "N/A"}</p>
            </section>
 
            {/* Bouton épisode */}
            <section className=" mt-2 text-primary-foreground">
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(Number(e.target.value))}
                className="bg-primary text-primary-foreground p-2 font-bold rounded-md focus:bg-white focus:text-primary-foreground focus:outline-none"
              >
                {data?._embedded?.seasons?.map((season, index) => (
                  <option key={index} value={season.number} className="py-2">
                    Saison {season.number}
                  </option>
                ))}
              </select>
            </section>
 
            {/* Tout les épisodes */}
 
            <section className="flex flex-col gap-2">
              <h3 className=" pb-2 font-bold text-xl">Épisodes</h3>
              <ul className="flex flex-col gap-10">
                {episodesBySeason?.map((episode, index) => (
                  <li key={index} className="text-lg flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      {episode.image && (
                        <div className="min-w-36 max-w-36 relative rounded-lg overflow-hidden">
                          <img
                            src={episode.image.medium}
                            alt={episode.name}
                            className=" object-cover"
                          />
                          <div className=" absolute inset-0 flex items-center justify-center">
                            <img
                              src="whiteplay.svg"
                              alt="Play"
                              className="w-8 h-8"
                            />
                          </div>
                        </div>
                      )}
                      <div>
                        <p>{episode.name}</p>
                        <p className="text-sm text-gray-500">
                          {episode.runtime} minutes
                        </p>
                      </div>
                    </div>
                    <p
                      className="text-xs text-gray-300"
                      dangerouslySetInnerHTML={{
                        __html:
                          episode.summary.length > 250
                            ? episode.summary.slice(0, 250) + "..."
                            : episode.summary,
                      }}
                    ></p>
                  </li>
                ))}
              </ul>
            </section>
          </section>
        </div>
      )}
    </div>
  );
};
 
export default App;