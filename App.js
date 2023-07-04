// export default App;
import React, { useState } from "react";
import axios from "axios";
import "./App.css";


const App = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleScrape = () => {
    if (input) {
      setLoading(true);
      setError(null);

      const scrapeData = async () => {
        const options = {
          method: "GET",
          url: "https://amazon-web-scraping-api.p.rapidapi.com/products/search",
          params: {
            criteria: input,
            countryCode: "US",
            languageCode: "EN",
          },
          headers: {
            "X-RapidAPI-Key":
              "74bd45b87cmsh43af6f12bd1d35ep12d165jsn91f877e1c3ff",
            "X-RapidAPI-Host": "amazon-web-scraping-api.p.rapidapi.com",
          },
        };

        let page = 1;
        const totalPagesToScrape = 200; // Set the desired number of pages to scrape

        const scrapedData = [];

        while (page <= totalPagesToScrape) {
          try {
            const response = await axios.request({
              ...options,
              params: {
                ...options.params,
                page: page.toString(),
              },
            });

            scrapedData.push(response.data);
          } catch (error) {
            setError(error.message);
            break;
          }

          page++;
        }

        downloadJsonFile(scrapedData); // Download the scraped data as a JSON file
        setLoading(false);
      };

      scrapeData();
    }
  };

  const downloadJsonFile = (data) => {
    const filename = "scraped_data.json";
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <div className="logo">DSCRAP</div>
      <h1>Dive Into The Power Of DSCRAP</h1>
      <h3>Explore Amazon like never before with our advanced data scraping tool</h3>
      <div className="content">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Paste Amazon product link here"
        />
        <button type="button" onClick={handleScrape}>
          Download JSON
        </button>
      </div>
      {loading && <span className="loading-spinner"></span>}
      {error && <p>An error occurred: {error}</p>}
    </div>
  );
};

export default App;
