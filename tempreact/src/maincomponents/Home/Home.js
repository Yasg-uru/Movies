import Loader from "../../LOADER/Loader.js";
import "./Home.css";
import Typewriter from "./Typewriter.js";
import { useState,useEffect } from "react";


function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data) that takes some time
    const fetchData = () => {
      setTimeout(() => {
        setLoading(false); // Set loading to false when the data is loaded
      }, 2000); // Simulating a 2-second delay
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader/>;
  }
  const paratext =
    "Discover the ultimate movie-watching experience where you can enjoy your favorite films with friends in real-time. MovieSyncLive brings you a unique and social way to enjoy cinema together, no matter where your friends are.";
  const featuretext1 =
    "Watch movies simultaneously with your friends. Our synchronized streaming ensures everyone is on the same scene, creating a shared cinematic experience.";
  const chattext =
    "Communicate with your friends while watching. Share reactions, discuss plot twists, and laugh together in our interactive chat room.";
  const movieinfo = `Choose from a vast collection of movies across genres. From classics to the latest releases, we've got your movie nights covered.`;
  const plateformtext =
    "Access [Your Website Name] from any device—laptops, tablets, or mobile phones. Enjoy the flexibility to join the party from anywhere.";
  return (
    <div className="home-main-container">
      <div className="home-second-container">
        <h1 className="heading-1">Watch Movies Live with Friends!</h1>
        <Typewriter text={paratext} />
      </div>
      <div className="home-third-container">
        <h1 className="heading-2"> Live Synchronized Streaming</h1>
        <Typewriter text={featuretext1} />
      </div>
      <div className="home-fourth-container">
        <h1 className="heading-2">Real-Time Chat</h1>
        <Typewriter text={chattext}></Typewriter>
      </div>
      <div className="home-fifth-container">
        <h1 style={{ textDecoration: "underline", color: "white" }}>
          Extensive Movie Library
        </h1>
        <Typewriter text={movieinfo} />
      </div>

      <div className="home-sixth-container">
        <h1 style={{ textDecoration: "underline", color: "white" }}>
          Cross-Platform Compatibility
        </h1>
        <Typewriter text={plateformtext} />
      </div>
    </div>
  );
}
export default Home;
