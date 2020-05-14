/** @jsx jsx */
import { useState, useEffect, useRef } from "react";
import { css, jsx } from "@emotion/core";
import SliderContent from "./SliderContent";
import Slide from "./Slide";
import Arrow from "./Arrow";
import Dots from "./Dots";

/**
 * @function Slider - The main component
 * @returns {JSX.Element}
 */

// We get the width of the current viewport
const getWidth = () => window.innerWidth;

const Slider = (props) => {
  const images = [
    "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
    "https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80",
    "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80",
    "https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80",
  ];

  // State - Object that stores the current translate value and the transition timing.
  const [state, setState] = useState({
    activeSlide: 0,
    translate: 0,
    transition: 0.45,
  });

  const { translate, transition, activeSlide } = state;

  const autoPlayRef = useRef();

  // set the current object of the component reference to the nexSlide function.
  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  // call the next slide function once on component mount
  useEffect(() => {
    // call the next slide function passed as a reference in the current object.
    const play = () => {
      autoPlayRef.current();
    };
    if (props.autoPlay !== null) {
      // call the play function every number of seconds.
      const interval = setInterval(play, props.autoPlay * 1000);
      // perform clean up and clear the interval.
      return () => clearImmediate(interval);
    }
  }, [props.autoPlay]);

  // Active index starts from 0, so a slider of four imaes will have a maximum active index of three.
  // The length of the array starts from one, so we have to do soma subtraction to check.

  const dotClick = (i) => {
    setState({
      ...state,
      activeSlide: i,
      translate: i * getWidth(),
    });
  };

  const nextSlide = () => {
    // checkif we're on the last slide, if we are, go to the first slide.
    if (activeSlide === images.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeSlide: 0,
      });
    }

    // if we're not on the last slide, go to the next slide by translating the full width of the slide.
    setState({
      ...state,
      activeSlide: activeSlide + 1,
      translate: (activeSlide + 1) * getWidth(),
    });
  };

  const prevSlide = () => {
    // check if we're on the first slide, if we are, translate to the last slide.
    if (activeSlide === 0) {
      return setState({
        ...state,
        translate: (images.length - 1) * getWidth(),
        activeSlide: images.length - 1,
      });
    }

    // if we're not, translate to the previous slide.
    setState({
      ...state,
      activeSlide: activeSlide - 1,
      translate: (activeSlide - 1) * getWidth(),
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
      {/* {!props.autoPlay && (
        <React.Fragment> */}
      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />
      {/* </React.Fragment>
      )} */}

      <Dots handleClick={dotClick} slides={images} activeIndex={activeSlide} />
    </div>
  );
};

Slider.defaultProps = {
  slides: [],
  autoplay: null,
};

const SliderCSS = css`
  position: relative;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
`;
export default Slider;
