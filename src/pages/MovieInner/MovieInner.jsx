import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../MovieInner/MovieInner.scss";
import { Rating } from "@mui/material";

function MovieInner() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [trailer, setTrailer] = useState(null);
  const [director, setDirector] = useState(null); // State for director
  const [cast, setCast] = useState([]); // State for cast
  const [showAllCast, setShowAllCast] = useState(false); // State to show more cast members
  const genreNames = data?.genres?.map((genre) => genre.name) || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movie details
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=0c43f3a99dd87115bcb9db112a118c03`
        );
        setData(movieResponse.data);

        // Fetch movie credits
        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=0c43f3a99dd87115bcb9db112a118c03`
        );
        const directorData = creditsResponse.data.crew.find(
          (member) => member.job === "Director"
        );
        setDirector(directorData ? directorData.name : "N/A");
        setCast(creditsResponse.data.cast); // Set cast data

        // Fetch movie trailer
        const trailerResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=0c43f3a99dd87115bcb9db112a118c03`
        );
        const videos = trailerResponse.data.results;
        const youtubeTrailer = videos.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
        setTrailer(youtubeTrailer ? youtubeTrailer.key : null);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Function to toggle show more cast members
  const toggleShowMore = () => {
    setShowAllCast(!showAllCast);
  };

  // Get the year of production from the release date
  const releaseYear = data?.release_date ? new Date(data.release_date).getFullYear() : "N/A";
  // Get the movie duration
  const runtime = data?.runtime ? `${data.runtime} minutes` : "N/A";

  return (
    <>
      <div
        className="movieinner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${data?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh", // Adjust as needed
        }}
      >
        <div className="left">
          <img
            src={"https://image.tmdb.org/t/p/w500" + data?.poster_path}
            alt={data?.title}
          />
        </div>

        <div className="middle">
          <div className="info">
            <h1>{data?.title}</h1>
            <Rating
            name="movie-rating"
            value={data?.vote_average / 2} // Adjust for a 5-star rating
            precision={0.5}
            readOnly
          />
            <p>
              {data?.vote_average} from {data?.vote_count}
              <p><b>Year of Production:</b> {releaseYear}</p> {/* Display year of production */}
            <p><b>Duration:</b> {runtime}</p> {/* Display movie duration */}
            </p>
           
            <p><b>Watch {data?.title} on Hulu.</b> {data?.overview}</p>
            <p><b>Genre: </b>{genreNames.join(", ")}</p> {/* Display genres */}
            <p><b>Country:</b> {data?.production_countries?.map(country => country.name).join(", ") || " N/A"}</p>
            <p><b>Director:</b> {director || "N/A"}</p> {/* Display director */}
            <p><b>Cast:</b> 
              {cast.length > 0 ? (
                <>
                  {cast.slice(0, showAllCast ? cast.length : 4).map((member) => (
                    <span key={member.id}>{member.name}, </span>
                  )).slice(0, 9)} {/* Remove the last comma */}
                  {!showAllCast && cast.length > 5 && (
                    <button onClick={toggleShowMore}>View More</button>
                  )}
                  {showAllCast && (
                    <button onClick={toggleShowMore}>View Less</button>
                  )}
                </>
              ) : " N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="movie">
        {trailer && (
          <div className="movie_component">
            <h2>Watch the Trailer</h2>
            <iframe
              width="1000"
              height="505"
              src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
              title="YouTube trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </>
  );
}

export default MovieInner;
