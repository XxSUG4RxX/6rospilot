import React from "react";
import useFetch from "./hook/useFetch";
import { Button } from "@/components/ui/button";

const App = () => {

  const { data, isLoading, error } = useFetch(`https://api.tvmaze.com/singlesearch/shows?q="arcane"`,);

  return (
    <div className="h-screen flex text- justify-center items-center">
      {isLoading && <p>Chargement...</p>}
      {error && <p>Erreur: {error}</p>}
      {data && (
        <div className="flex w-80 flex-col">
          {data.image && (
            <img
              src={data.image.medium}
              alt={data.name}
              style={{ width: "auto", height: "400px" }}
            />
          )}
          <section className=" py-8 px-2 flex flex-col w-80 rounded-t-lg bg-card">
            <h2>{data.name}</h2>
            <p>{data.premiered}</p>
            <Button className="">Play</Button>
          </section>
        </div>
      )}
    </div>
  );
};

export default App;
