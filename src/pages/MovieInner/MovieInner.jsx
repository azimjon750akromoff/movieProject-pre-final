import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../MovieInner/MovieInner.scss";
import { Rating } from "@mui/material";

function MovieInner() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [trailer, setTrailer] = useState(null);
  const [director, setDirector] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [showAllCast, setShowAllCast] = useState(false);
  const genreNames = data?.genres?.map((genre) => genre.name) || [];
  const navigate = useNavigate();

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
        setCast(creditsResponse.data.cast);

        // Fetch movie trailer
        const trailerResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=0c43f3a99dd87115bcb9db112a118c03`
        );
        const videos = trailerResponse.data.results;
        const youtubeTrailer = videos.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
        setTrailer(youtubeTrailer ? youtubeTrailer.key : null);

        // Fetch similar movies
        const similarMoviesResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=0c43f3a99dd87115bcb9db112a118c03`
        );
        setSimilarMovies(similarMoviesResponse.data.results);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleActorClick = (actorId) => {
    navigate(`/actor/${actorId}/movies`);
  };

  const toggleShowMore = () => {
    setShowAllCast(!showAllCast);
  };

  const releaseYear = data?.release_date ? new Date(data.release_date).getFullYear() : "N/A";
  const runtime = data?.runtime ? `${data.runtime} minutes` : "N/A";

  return (
    <>
      <div
        className="movieinner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${data?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
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
              value={data?.vote_average / 2}
              precision={0.5}
              readOnly
            />
            <p>
              {data?.vote_average} from {data?.vote_count}
              <p><b>Year of Production:</b> {releaseYear}</p>
              <p><b>Duration:</b> {runtime}</p>
            </p>
            <p><b>Watch {data?.title} on Hulu.</b> {data?.overview}</p>
            <p><b>Genre: </b>{genreNames.join(", ")}</p>
            <p><b>Country:</b> {data?.production_countries?.map(country => country.name).join(", ") || " N/A"}</p>
            <p><b>Director:</b> {director || "N/A"}</p>
            <p><b>Cast:</b></p>
            <div className="cast-cards">
              {cast.length > 0 ? (
                cast.slice(0, showAllCast ? cast.length : 4).map((member) => (
                  <div
                    key={member.id}
                    className="cast-card"
                    onClick={() => handleActorClick(member.id)}
                  >
                    <img
                      src={member.profile_path
                        ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                        : "https://via.placeholder.com/150"}
                      alt={member.name}
                    />
                    <p>{member.name}</p>
                  </div>
                ))
              ) : (
                <p>N/A</p>
              )}
              {!showAllCast && cast.length > 4 && (
                <button onClick={toggleShowMore}>View More</button>
              )}
              {showAllCast && (
                <button onClick={toggleShowMore}>View Less</button>
              )}
            </div>
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

      {/* Similar Movies Section */}
      <div className="similar-movies">
        <h2>Similar Movies</h2>
        <div className="similar-movie-cards">
          {similarMovies.length > 0 ? (
            similarMovies.slice(0, 6).map((movie) => (
              <div key={movie.id} className="similar-movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </div>
            ))
          ) : (
            <p>No similar movies found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default MovieInner;
