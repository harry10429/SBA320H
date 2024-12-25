import React, { useState, useEffect } from "react";

function GameCarousel({ gameTitle }) {
  const [games, setGames] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Fetch the game data -- return the game with title relate to the prop value
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `https://www.cheapshark.com/api/1.0/games?title=${gameTitle}`
        );
        const data = await response.json();
        setGames(Object.values(data));
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, [gameTitle]);

  useEffect(() => {
    // Set up the auto-slide 2 second interval
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === games.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval); // Clean up on unmount
  }, [games.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? games.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === games.length - 1 ? 0 : prev + 1));
  };

  if (games.length === 0) {
    return <p>Loading carousel...</p>;
  }

  return (
    <div className="carousel">
      <button
        className="carousel-button left"
        onClick={handlePrevSlide}
        aria-label="Previous Slide"
      >
        ❮
      </button>

      <div className="carousel-slide">
        <a
          href={`https://www.cheapshark.com/redirect?dealID=${games[currentSlide].cheapestDealID}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={games[currentSlide].thumb}
            alt={games[currentSlide].external}
            className="carousel-image"
          />
        </a>
        <div className="carousel-caption">
          <h3>{games[currentSlide].external}</h3>
          <p>Price: ${games[currentSlide].cheapest}</p>
        </div>
      </div>

      <button
        className="carousel-button right"
        onClick={handleNextSlide}
        aria-label="Next Slide"
      >
        ❯
      </button>
    </div>
  );
}

export default GameCarousel;
