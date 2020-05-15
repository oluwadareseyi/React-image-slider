import React from "react";
import "./App.css";
import Slider from "./components/Slider";

function App() {
  return (
    <div className="App">
      <Slider autoPlay={5} />
    </div>
  );
}

export default App;
