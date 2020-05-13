/** @jsx jsx */
import React, { useState } from "react";
import { css, jsx } from "@emotion/core";
import SliderContent from "./SliderContent";

/**
 * @function Slider - The main component
 * @returns {JSX.Element}
 */

const Slider = () => {
  // We get the width of the current viewport
  const getWidth = () => window.innerWidth;

  // State - Object that stores the current translate value and the transition timing.
  const [state, setState] = useState({
    translate: 0,
    transition: 0.45,
  });

  const { translate, transition } = state;

  return (
    <div css={SliderCSS}>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth()}
      ></SliderContent>
    </div>
  );
};

const SliderCSS = css`
  position: relative;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
`;
export default Slider;
