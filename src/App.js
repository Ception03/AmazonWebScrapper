


// import React, { useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleInputChange = (event) => {
//     setInput(event.target.value);
//   };

//   const handleDownload = () => {
//     if (input) {
//       setLoading(true);
//       setError(null);

//       const options = {
//         method: 'GET',
//         url: 'https://amazon-web-scraping-api.p.rapidapi.com/products/search',
//         params: {
//           criteria: input,
//           page: '10',
//           countryCode: 'US',
//           languageCode: 'EN',
//         },
//         headers: {
//           'X-RapidAPI-Key': '74bd45b87cmsh43af6f12bd1d35ep12d165jsn91f877e1c3ff',
//           'X-RapidAPI-Host': 'amazon-web-scraping-api.p.rapidapi.com',
//         },
//       };

//       axios
//         .request(options)
//         .then((response) => {
//           downloadJsonFile(response.data);
//         })
//         .catch((error) => {
//           setError(error.message);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   };

//   const downloadJsonFile = (data) => {
//     const filename = 'scraped_data.json';
//     const jsonStr = JSON.stringify(data, null, 2);
//     const blob = new Blob([jsonStr], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = filename;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div>
//       <form>
//         <input type="text" value={input} onChange={handleInputChange} placeholder="Enter Amazon product link" />
//         <button type="button" onClick={handleDownload}>
//           Scrape and Download JSON
//         </button>
//       </form>
//       {loading && <p>Loading...</p>}
//       {error && <p>An error occurred: {error}</p>}
//     </div>
//   );
// };

// export default App;
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scrapedData, setScrapedData] = useState(null);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleScrape = () => {
    if (input) {
      setLoading(true);
      setError(null);
      setScrapedData(null);
  
      const scrapeData = async () => {
        const scrapedData = [];
  
        const options = {
          method: 'GET',
          url: 'https://amazon-web-scraping-api.p.rapidapi.com/products/search',
          params: {
            criteria: input,
            countryCode: 'US',
            languageCode: 'EN',
          },
          headers: {
            'X-RapidAPI-Key': '74bd45b87cmsh43af6f12bd1d35ep12d165jsn91f877e1c3ff',
            'X-RapidAPI-Host': 'amazon-web-scraping-api.p.rapidapi.com',
          },
        };
  
        let page = 1;
        const totalPagesToScrape = 10; // Set the desired number of pages to scrape
  
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
  
        setScrapedData(scrapedData);
        setLoading(false);
        downloadJsonFile(scrapedData); // Download the scraped data as a JSON file
      };
  
      scrapeData();
    }
  };

  const downloadJsonFile = (data) => {
    const filename = 'scraped_data.json';
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  

  return (
    <div>
      <form>
        <input type="text" value={input} onChange={handleInputChange} placeholder="Enter Amazon product link" />
        <button type="button" onClick={handleScrape}>
          Scrape
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>An error occurred: {error}</p>}
      {scrapedData && (
        <div>
          <h2>Scraped Data:</h2>
          {scrapedData.map((data, index) => (
            <pre key={index}>{JSON.stringify(data, null, 2)}</pre>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

