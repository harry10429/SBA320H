import React, { useEffect, useState } from "react";

function Deals() {
  //game list and set
  const [games, setGames] = useState([]);
  //price range and set
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  //set isloading to true when find matching object with upperprice filter
  const [isLoading, setIsLoading] = useState(false);

  const priceRanges = [
    { label: "below $5", upperPrice: 5 },
    { label: "below $10", upperPrice: 10 },
    { label: "below $15", upperPrice: 15 },
  ];

  const fetchDeals = async (upperPrice) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=${upperPrice}`
      );
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
    setIsLoading(false);
  };

  const handleCheckboxChange = (upperPrice) => {
    if (selectedPriceRanges.includes(upperPrice)) {
      setSelectedPriceRanges(
        selectedPriceRanges.filter((price) => price !== upperPrice)
      );
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, upperPrice]);
    }
  };

  const handleSubmit = () => {
    // deals for the highest selected price range
    const maxPrice = Math.max(...selectedPriceRanges);
    if (!isNaN(maxPrice)) {
      fetchDeals(maxPrice);
    }
  };

  useEffect(() => {
    //  default page
    fetchDeals(15);
  }, []);

  //display each game cardbox and pricerange check box with array declared on top
  return (
    <div>
      <h1>Limited Time Deals</h1>
      <div>
        <h3>Filter by Price Range</h3>

        {priceRanges.map((range) => (
          <label key={range.upperPrice} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              value={range.upperPrice}
              onChange={() => handleCheckboxChange(range.upperPrice)}
              checked={selectedPriceRanges.includes(range.upperPrice)}
            />
            {range.label}
          </label>
        ))}
        <button
          onClick={handleSubmit}
          style={{ marginLeft: "10px", padding: "5px 10px" }}
        >
          Apply Filters
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : games.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {games.map((game, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "5px",
                width: "200px",
              }}
            >
              <a
                href={
                  game.dealID
                    ? `https://www.cheapshark.com/redirect?dealID=${game.dealID}`
                    : "#"
                }
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={game.thumb}
                  alt={game.title}
                  style={{ width: "100%", borderRadius: "5px" }}
                />
                <h3 style={{ fontSize: "16px", margin: "10px 0" }}>
                  {game.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#333" }}>
                  Price: <strong>${game.salePrice}</strong>
                </p>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>No deals found for the selected price range.</p>
      )}
    </div>
  );
}

export default Deals;
