/** @jsx jsx */
// import React from "react";
import { css, jsx } from "@emotion/core";

const Dot = ({ active, handleClick }) => (
  <span
    onClick={handleClick}
    css={css`
      padding: ${active ? "5px 10px" : "6px"};
      margin-right: 5px;
      cursor: pointer;
      border-radius: ${active ? "30px" : "50%"};
      background: ${active ? "black" : "white"};
    `}
  />
);

const Dots = ({ slides, activeIndex, handleClick }) => (
  <div
    css={css`
      position: absolute;
      bottom: 25px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `}
  >
    {slides.map((slide, i) => (
      <Dot
        key={slide}
        handleClick={() => handleClick(i)}
        active={activeIndex === i}
      />
    ))}
  </div>
);

export default Dots;
