import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Country() {
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/configuration/countries?api_key=0c43f3a99dd87115bcb9db112a118c03'
        );
        console.log("Countries response:", response.data); // Debugging line
        setData(response.data); // Set countries data
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching countries:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []); // Fetch countries once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching countries: {error.message}</div>;
  }

  return (
    <div className='country'>
      <h1>Countries</h1>
      {data.length > 0 ? ( // Check if there are countries to display
        <ul>
          {data.map((country) => (
            <li key={country.iso_3166_1}>
              {country.name} ({country.iso_3166_1})
            </li>
          ))}
        </ul>
      ) : (
        <div>No countries found.</div>
      )}
    </div>
  );
}

export default Country;
