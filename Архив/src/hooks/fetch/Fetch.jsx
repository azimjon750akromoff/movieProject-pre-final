import React, { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = "https://api.themoviedb.org/3/";
  const token = "?api_key=0c43f3a99dd87115bcb9db112a118c03";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl + url + token);
        setData(response.data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
