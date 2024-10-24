import React, { useState } from "react";
import useFetch from "./hook/useFetch";
import { Button } from "@/components/ui/button";

const App = ({movie, setCurrentPage}) => {
  const { data, isLoading, error } = useFetch(
    `https://api.tvmaze.com/singlesearch/shows?q=${movie.name}&embed[]=seasons&embed[]=episodes`
  );

  const [selectedSeason, setSelectedSeason] = useState(1); // État pour la saison sélectionnée
  const numberSeasons = data?._embedded?.seasons?.length;

  // Filtrer les épisodes par saison
  const episodesBySeason = data?._embedded?.episodes?.filter(
    (episode) => episode.season === selectedSeason
  );

  const handleBackClick = () => {
    setCurrentPage("home");
  };

  return (
    <div className="bg-card p-4 flex text-secondary-foreground">
      {isLoading && <p>Chargement...</p>}
      {error && <p>Erreur: {error}</p>}
      {data && (
        <div className="flex flex-col">
          <Button className="mb-4" onClick={handleBackClick}>
        Retour à l'accueil
      </Button>
          {data.image && (
            <img
              className="rounded-lg"
              src={data?.image?.medium}
              alt={data?.name}
              style={{ width: "auto", height: "auto" }}
            />
          )}
          <section className="w-full px-2 py-6 flex justify-center flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-2xl">{data?.name}</h2>
              <section className="flex text-sm gap-6 items-center">
                <p>{new Date(data?.premiered).getFullYear()}</p>
                <p>{numberSeasons} saisons</p>
                <div className="flex flex-wrap space-x-2">
                  {data?.genres?.map((genre, index) => (
                    <p key={index} className="w-fit h-fit">
                      {genre}
                    </p>
                  ))}
                </div>
              </section>
            </div>
            <section className="w-full flex flex-col items-center gap-3">
              <Button className="flex w-5/6 items-center justify-center gap-3">
                <img src="play.svg" alt="" /> Play
              </Button>
              <Button
                variant="secondary"
                className="flex w-5/6 items-center justify-center gap-3"
              >
                <img src="dl.svg" alt="" /> Download
              </Button>
            </section>

                  {/* Selection de Saisons */}

            <section className="flex gap-4 text-black">
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(Number(e.target.value))}
                className="p-2 rounded-md"
              >
                {data?._embedded?.seasons?.map((season, index) => (
                  <option key={index} value={season.number}>
                    Saison {season.number}
                  </option>
                ))}
              </select>
            </section>
            
            <section className="flex flex-col gap-2">
              <h3 className="font-bold text-xl">Description</h3>
              <p
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: data?.summary }}
              ></p>
            </section>
            <section className="flex flex-col gap-2">
              <h3 className="font-bold text-xl">Réalisateur</h3>
              <p className="text-sm">{data.network?.name || "N/A"}</p>
            </section>
            <section className="flex flex-col gap-2">
              <h3 className="font-bold text-xl">Épisodes</h3>
              <ul className="flex flex-col gap-10">
                {episodesBySeason?.map((episode, index) => (
                  <li key={index} className="text-sm flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                    {episode.image && (
                        <div className="relative w-34 h-16 rounded-lg overflow-hidden">
                          <img src={episode.image.medium} alt={episode.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <img src="whiteplay.svg" alt="Play" className="w-8 h-8" />
                          </div>
                        </div>
                      )}
                    <div>
                      <p>{episode.name}</p>
                      <p className="text-xs text-gray-500">{episode.runtime} minutes</p>
                    </div>
                    </div>
                    <p className="text-xs text-gray-300" dangerouslySetInnerHTML={{ __html: episode.summary }}></p>
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