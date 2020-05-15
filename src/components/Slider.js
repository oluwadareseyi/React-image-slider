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

const slides = [
  "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
  "https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80",
  "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80",
  "https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80",
];

const Slider = (props) => {
  const firstSlide = slides[0];
  const secondSlide = slides[1];
  const lastSlide = slides[slides.length - 1];
  // State - Object that stores the current translate value and the transition timing.
  const [state, setState] = useState({
    activeSlide: 0,
    translate: getWidth(),
    transition: 0.45,
    _slides: [lastSlide, firstSlide, secondSlide],
  });

  const { translate, transition, activeSlide, _slides } = state;

  const autoPlayRef = useRef();

  const transitionRef = useRef();

  const resizeRef = useRef();

  // set the current object of the component reference to the nexSlide function.
  useEffect(() => {
    autoPlayRef.current = nextSlide;
    transitionRef.current = smoothTransition;
    resizeRef.current = handleResize;
  });

  let interval = null;
  // call the next slide function once on component mount
  useEffect(() => {
    // call the next slide function passed as a reference in the current object.
    const play = () => {
      autoPlayRef.current();
    };

    const smooth = (e) => {
      e.target.className.includes("SliderContent") && transitionRef.current();
    };

    const resize = () => {
      resizeRef.current();
    };

    const transitionEnd = window.addEventListener("transitionend", smooth);
    const onResize = window.addEventListener("resize", resize);
    if (props.autoPlay) {
      // call the play function every number of seconds.
      interval = setInterval(play, props.autoPlay * 1000);
      // perform clean up and clear the interval.
    }

    return () => {
      window.removeEventListener("transitionend", transitionEnd);
      window.removeEventListener("resize", onResize);
      if (props.autoPlay) {
        clearInterval(interval);
      }
    };
  }, [props.autoPlay]);

  useEffect(() => {
    if (transition === 0) setState({ ...state, transition: 0.45 });
  }, [state, transition]);

  // Active index starts from 0, so a slider of four imaes will have a maximum active index of three.
  // The length of the array starts from one, so we have to do soma subtraction to check.

  const smoothTransition = () => {
    let _slides = [];

    // We're at the last slide.
    if (activeSlide === slides.length - 1)
      _slides = [slides[slides.length - 2], lastSlide, firstSlide];
    // We're back at the first slide. Just reset to how it was on initial render
    else if (activeSlide === 0) _slides = [lastSlide, firstSlide, secondSlide];
    // Create an array of the previous last slide, and the next two slides that follow it.
    else _slides = slides.slice(activeSlide - 1, activeSlide + 2);

    setState({
      ...state,
      _slides,
      transition: 0,
      translate: getWidth(),
    });
  };

  const handleResize = () => {
    setState({ ...state, translate: getWidth(), transition: 0 });
  };

  const dotClick = (i) => {
    setState({
      ...state,
      activeSlide: i,
      translate: translate + getWidth(),
    });
  };

  const nextSlide = () => {
    return setState({
      ...state,
      translate: translate + getWidth(),
      // if the current active slide is the last slide, let the new active slide be the first slide, else, let it be the next slide.
      activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1,
    });
  };
  const prevSlide = () =>
    setState({
      ...state,
      translate: 0,
      // if the current active slide is the first slide, let the new active slide be the last slide, it not it'll be the previous slide.
      activeSlide: activeSlide === 0 ? slides.length - 1 : activeSlide - 1,
    });

  return (
    <div css={SliderCSS}>
      <SliderContent
        translate={translate}
        transition={transition}
        // multiply the current width by the number of slides in the array so one image takes the full width of whatever device we're using.
        width={getWidth() * _slides.length}
      >
        {_slides.map((img, i) => (
          <Slide key={i} content={img} />
        ))}
      </SliderContent>
      {/* {!props.autoPlay && (
        <React.Fragment> */}
      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />
      {/* </React.Fragment>
      )} */}

      <Dots handleClick={dotClick} slides={slides} activeIndex={activeSlide} />
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
