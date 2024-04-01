import { useEffect, useState } from "react";
import "./SHowmovie.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Movieboxes from "./Cardcomponent/Movieboxes";
import Loader from "../../src/LOADER/Loader.js"
function Showmovie() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currpage, setcurrpage] = useState(1);
  const [resarray, setresarray] = useState([]);
  const [hasnextpage, sethasnextpage] = useState(false);
  const [totalpages, settotalpages] = useState(0);
  const [totalnoofmovies, settotalnoofmovies] = useState(0);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchmovies = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/movie/getmovies?page=${currpage}&search=${searchTerm}`,
        {
          withCredentials: true,
        }
      );

      const { movies, pagination } = response.data;
      setresarray(movies);
      sethasnextpage(pagination.hasnextpage);
      settotalpages(pagination.totalpages);
      settotalnoofmovies(pagination.totalnoofmovies);
      setLoading(false);
    } catch (error) {
      console.log("error is occured in show movie:" + error);
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchmovies();
  }, [searchTerm, currpage]);

  const handleSearch = () => {
    setcurrpage(1);
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="showmoviecontainer-11">
        <div className="search-bar-container1">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleInputChange}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <div className="searchmovieresult-1">
          {resarray &&
            resarray.map((item, i) => (
              <Movieboxes key={item._id} movie={item} />
            ))}
        </div>
        <div className="prev-next-container">
          <button
            className="prevbtn"
            onClick={() => {
              setcurrpage((prevpage) => prevpage - 1);
            }}
            disabled={currpage === 1}
          >
            Previous
          </button>
          <button
            className="nextbtn"
            onClick={() => {
              setcurrpage((prevpage) => prevpage + 1);
            }}
            disabled={hasnextpage === false}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
export default Showmovie;
