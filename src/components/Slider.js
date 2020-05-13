/** @jsx jsx */
import React, { useState } from "react";
import { css, jsx } from "@emotion/core";
import SliderContent from "./SliderContent";
import Slide from "./Slide";

/**
 * @function Slider - The main component
 * @returns {JSX.Element}
 */

const Slider = () => {
  const images = [
    "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
    "https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80",
    "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80",
    "https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80",
  ];
  // We get the width of the current viewport
  const getWidth = () => window.innerWidth;

  // State - Object that stores the current translate value and the transition timing.
  const [state, setState] = useState({
    translate: getWidth(),
    transition: 0.45,
  });

  const { translate, transition } = state;

  return (
    <div css={SliderCSS}>
      <SliderContent
        translate={translate}
        transition={transition}
        // multiply the current width by the number of images in the array so one image takes the full width of whatever device we're using.
        width={getWidth() * images.length}
      >
        {images.map((img, i) => (
          <Slide key={i} content={img} />
        ))}
      </SliderContent>
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
