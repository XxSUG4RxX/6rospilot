import React from "react";
import useFetch from "./hook/useFetch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


const App = () => {

  const { data, isLoading, error } = useFetch(`https://api.tvmaze.com/singlesearch/shows?q="arcane"`,);

  return (
    <div className="h-screen flex relative text-secondary-foreground justify-center items-center">
      {isLoading && <p>Chargement...</p>}
      {error && <p>Erreur: {error}</p>}
      {data && (
        <div className="flex w-80 flex-col">
          {data.image && (
            <img
              src={data?.image?.medium}
              alt={data?.name}
              style={{ width: "auto", height: "400px" }}
            />
          )}
          <section className="absolute bottom-24 py-8 px-2 flex flex-col w-80 rounded-t-lg bg-card">
            <h2>{data?.name}</h2>
            <section className="flex flex-row items-center">
              <p>{data?.premiered}</p>
              <Badge className="w-fit h-fit">Badge</Badge>
              <p>{data?.genres}</p>
            </section>
            <Button>Play</Button>
          </section>
        </div>
      )}
    </div>
  );
};

export default App;
