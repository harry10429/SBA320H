import React from "react";
import GameCarousel from "./GameCarousel";

function Home() {
  return (
    <>
      <></>
      <h3>
        This website showcases a collection of games available at special
        discounted price range for a limited time.{" "}
      </h3>
      <h2 style={{ marginleft: "" }}> Hot pick games: </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        <GameCarousel gameTitle={"eldenring"} />
        <GameCarousel gameTitle={"totalwarwarhammer"} />
        <GameCarousel gameTitle={"spacemarine"} />
      </div>
    </>
  );
}

export default Home;
