/** @jsx jsx */
import { useState } from "react";
import { css, jsx } from "@emotion/core";
import SliderContent from "./SliderContent";
import Slide from "./Slide";
import Arrow from "./Arrow";
import Dots from "./Dots";

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
    activeIndex: 0,
    translate: 0,
    transition: 0.45,
  });

  const { translate, transition, activeIndex } = state;

  // Active index starts from 0, so a slider of four imaes will have a maximum active index of three.
  // The length of the array starts from one, so we have to do soma subtraction to check.

  const dotClick = (i) => {
    setState({
      ...state,
      activeIndex: i,
      translate: i * getWidth(),
    });
  };

  const nextSlide = () => {
    // checkif we're on the last slide, if we are, go to the first slide.
    if (activeIndex === images.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0,
      });
    }

    // if we're not on the last slide, go to the next slide by translating the full width of the slide.
    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * getWidth(),
    });
  };

  const prevSlide = () => {
    // check if we're on the first slide, if we are, translate to the last slide.
    if (activeIndex === 0) {
      return setState({
        ...state,
        translate: (images.length - 1) * getWidth(),
        activeIndex: images.length - 1,
      });
    }

    // if we're not, translate to the previous slide.
    setState({
      ...state,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * getWidth(),
    });
  };

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
      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />

      <Dots handleClick={dotClick} slides={images} activeIndex={activeIndex} />
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
