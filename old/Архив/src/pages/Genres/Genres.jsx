import React from 'react'

function Genres() {
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);  // State for total pages
  const [currentPage, setCurrentPage] = useState(1); // State for current page

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=0c43f3a99dd87115bcb9db112a118c03&page=${currentPage}`
      )
      .then(function (response) {
        console.log(response);
        setData(response?.data?.results);
        setTotalPages(response?.data?.total_pages); // Set total pages from response
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log("Error fetching data:", error);
        setError(error);
        setIsLoading(false);
      });
  }, [currentPage]); // Trigger re-fetching when page changes
  return (
    <div className='genres'>
   
      
    </div>
  )
}

export default Genres
