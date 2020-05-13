// import React from "react";
import styled from "@emotion/styled";

// const SliderContent = styled.div`
//   transform: translateX(-${(props) => props.translate}px);
//   transition: transform ease-out ${(props) => props.transition}s;
//   height: 100%;
//   width: ${(props) => props.width}px;
//   display: flex;
// `;

/**
 * @function SliderContent The slider content is the container for all the images (slides), we wiil translate the container so it moves along the x-axis and show the other slides.
 * @param {Object} props - Data passed from Parent elements.
 * @returns {JSX.Element}
 */

const SliderContent = styled.div`
  transform: translateX(-${(props) => props.translate}px);
  transition: transform ease-out ${(props) => props.transition}s;
  height: 100%;
  width: ${(props) => props.width}px;
  display: flex;
`;
export default SliderContent;
