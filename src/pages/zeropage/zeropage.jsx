import React, { useEffect, useState, useRef } from "react";
import "../../pages/zeropage/zeropage.scss";
import "../../styles/general.scss";
import Logo from "../../assets/icons/Hulu_2019.svg";
import { Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import axios from "axios";

function Zeropage() {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  const searchRef = useRef(null); // Ref for the entire search container

  // Fetch data based on search input
  useEffect(() => {
    if (value) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=0c43f3a99dd87115bcb9db112a118c03&query=${value}`
        )
        .then((response) => {
          setData(response?.data?.results || []);
          setActive(true); // Show results when data is fetched
        })
        .catch((error) => {
          console.log("Error fetching data:", error);
        });
    } else {
      setActive(false); // Close search results if input is cleared
    }
  }, [value]);

  // Detect clicks outside the search pane to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setActive(false); // Close the search results if clicked outside
      }
    };

    // Attach event listener to detect outside clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  // Handle movie click to close search results and clear the search input
  const handleMovieClick = () => {
    setActive(false);
    setValue("");
  };

  return (
    <div className="zeropage">
      <div className="center">
        <img src={Logo} alt="Logo" />

        {/* Search Pane */}
        <div ref={searchRef} className={active ? "search active" : "search"}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              value={value} // Controlled input
              onChange={(e) => setValue(e.target.value)}
              variant="outlined"
              placeholder="Enter Movies or Series name"
              style={{ flex: 1 }}
            />
            <Button variant="contained" onClick={() => setActive(true)}>
              Search
            </Button>
          </div>

          {/* Display movie search results */}
          {active && data.length > 0 && (
            <div className="search-results">
              {data.map((movie, index) => (
                <div className="movie-card" key={index}>
                  <Link to={`/movie/${movie.id}`} onClick={handleMovieClick}>
                    <img
                      src={
                        movie?.poster_path
                          ? "https://image.tmdb.org/t/p/w500" + movie?.poster_path
                          : "https://via.placeholder.com/500x750"
                      }
                      alt={`${movie.title} Poster`}
                    />
                    <div className="titles">
                      <h1>{movie.title}</h1>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="below-centr">
          <h6>
            Hulu.to - Just a better place for watching online movies for free!
          </h6>
          <button>
            <Link to="/home"> Go to home page</Link>
          </button>
        </div>
      </div>

      <div className="text container">
        <span>Hulu - Watch Free Movies Online | Hulu.to</span>
        <p>
          Cord-cutting is becoming a huge thing these days. People around the
          world are tired of paying the massive bills associated with cable TV
          and the subscriptions of Netflix and other streaming platforms. The
          good news is that sites like Hulu are making cord-cutting possible.
          They offer free movies and TV shows for all people around the world.
          But as you can imagine, things have not been smooth. Hulu and others
          like it have been targeted by relevant authorities for piracy and
          copyright infringement. But nonetheless, they still offer a great
          streaming option.
        </p>

        <span>What is Hulu?</span>
        <p>
          As noted above, Hulu is a file-sharing website that allows people to
          watch a wide range of movies and TV shows for free. The site has
          several categories and a wide variety of content. Although it has been
          frustrated by copyright authorities in many countries around the
          world, there are still so many Hulu clone sites that are offering
          access to this content. The origin of Hulu is also unknown and no one
          knows where the sites are hosted. This makes it a very hard target for
          law enforcement.
        </p>

        <span>The History of Hulu</span>

        <p>
          Hulu has had a very troubled history. It’s even a surprise that the
          site is still here today. The site was created in 2016. It became
          quite popular within a few months but it faced its first setback later
          that year. In December 2016, Google announced that it had blocked Hulu
          from its search results. But things did not end there. Hulu was also
          sued by a Filipino media organization for piracy and was ordered to
          pay $210, 000 in damages. But despite these challenges, Hulu continued
          to operate and kept serving millions of streamers from all over the
          world. This attracted the attention of the US government and in 2018,
          Hulu was identified by the US as one of the most “notorious” platforms
          for sharing pirated materials. The site was later reported by the
          Motion Picture Association of America to the US government but nothing
          further happened after that. Despite this, Hulu is blocked in so many
          countries. Australia was the first major market to block Hulu after
          the decision was made in 2018. India, Sweden, Denmark have also
          followed suit. But even with these efforts, there are still several
          Hulu sites that are running. If you suspect that the site may be
          blocked in your country, do not worry. There is a way around this and
          we will show you below.
        </p>

        <span>How to Access Hulu from Anywhere?</span>
        <p>
          Because of the action taken by anti-piracy government bodies,
          accessing Hulu has become quite a challenge for so many people. But
          this is one of the best streaming platforms out there, and as such, it
          is worth doing whatever you can to explore its content. Well, there is
          actually one simple way of accessing Hulu from anywhere in the world.
          Simply use a VPN. A VPN is designed to mask your IP and route your
          traffic to a different server. Let’s say for example you are in
          Australia, one of the few countries where Hulu is blocked. When you
          install a VPN on your device, you can route your traffic to a US
          server. The US is one of the countries where access to Hulu is still
          not an issue. Once you have done that, it would appear you are
          accessing Hulu from the US and as such, you will not face the blockade
          put in place in your country. Using a VPN also helps to protect your
          privacy and keep you safe online.
        </p>

        <span>What Are the Pros of Using Hulu?</span>

        <p>
          Despite its legal challenges over the years, Hulu has managed to offer
          excellent value to its fans out there. The site has a lot of pros.
          First, there is a superb variety of content. This is always a huge
          factor when you are gauging the quality of a streaming site. After
          all, the last thing you want is to go to a website only to realize
          that there aren’t many movies you are interested in. The Hulu site,
          even though it has used different domains over the years, also looks
          quite sleek and so easy to use. You can locate whatever you want to
          watch in a matter of minutes. You will also be happy to note that the
          website has a superb trust rating. In essence, a majority of people
          who use it don’t often land into any issues. This, therefore, means
          the site is relatively safe to use but it is always nice to take
          precautions. Finally, Hulu is updated very regularly. New shows and
          movies will always be available on the site as soon as possible.
        </p>

        <span>Can You Use Hulu on a Smart TV?</span>

        <p>
          Yes, as long as you have the browser to do it. Unlike other streaming
          services, Hulu does not have an official app. Yes, there are some apps
          that claim to be Hulu but most of them are not genuine. The best way
          would be to just stream directly on your smart TV’s browser. In case
          you have a streaming device like a Firestick or an android TV box,
          consider getting a suitable browser to help you access Hulu.
        </p>

        <span>Should I Be Worried If I Have Used Hulu Before?</span>

        <p>
          No, you should not be worried at all. Although most domains associated
          with Hulu have either been seized or blocked by authorities, users
          like you are still untouchable. Besides, copyright laws are very
          different from one country to the next. Enforcing them is, therefore,
          a huge challenge. In most cases, anti-piracy bodies will focus more on
          stopping the streaming of pirated content than catching the people
          doing it. But since there have been many fake Hulu sites, chances are
          you may have landed in one of them. Just as a precaution, ensure you
          do regular scans on your device to check if there is any malware to
          remove. But moving forward, always use VPNs when streaming pirated
          materials. It’s just a common-sense decision that goes a long way in
          protecting you. Nevertheless Hulu only store links which then points
          to the data on internet. Hulu does not store any content or video on
          its own server and only links to i
        </p>
      </div>
    </div>
  );
}

export default Zeropage;
