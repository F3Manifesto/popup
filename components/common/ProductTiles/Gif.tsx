/**
 * This component will decompose the frames of a gif image and expose the
 * frame choice as a prop to React. From there, we use state management to
 * possibly control the animation
 *
 */

// module dependencies: npm packages
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import gifFrames from "gif-frames";

/**
 * The state of our Gif Component will be a bunch of objects of the form
 * {
 *   dataURL<String>: This will be accepted as <img src={dataURL}>,
 *   key<Int>: This is the frame of the gif sequence.
 * }
 * that are to be understood by a <img> DOM element. To get these URLs, we use
 * gif-frames to * export a canvas for each frame, then use the canvas to
 * produce encoded .png images. This is the function that maps between the two.
 */
const parseGifFrame = ({
  getImage,
  frameIndex,
}: {
  getImage: any;
  frameIndex: any;
}) => ({
  dataURL: getImage().toDataURL(),
  key: frameIndex,
});

/**
 * The Gif Component will use the props
 * {
 *  src<String>: This will be the source of the gif file,
 *  frame<Int>: This is the frame of the gif image that the component displays
 *  failFrame<String>: This is the image that displays while the gif loads
 * }
 */
const Gif = ({
  src,
  frame,
  failFrame,
  imgStyle,
  ...props
}: {
  src: string;
  frame: number;
  failFrame: any;
  imgStyle: any;
}) => {
  /**
   * Component State Management
   */
  // the gif will be stored as state data as returned by parseGifFrame
  // this is the entirety of the gif decoding that is done
  const [framesData, setFramesData] = useState([]);
  useEffect(() => {
    gifFrames({ url: src, frames: "all", outputType: "canvas" }).then(
      (gifFramesData: any) => {
        setFramesData(gifFramesData.map(parseGifFrame));
      }
    );
  }, [src]);

  if (framesData) {
    return (
      <span {...props}>
        {framesData.map(({ dataURL, key }) => (
          <img
            src={dataURL}
            key={key}
            style={{
              ...imgStyle,
              top: 0,
              left: 0,
              display: key === frame ? "block" : "none",
            }}
          />
        ))}
      </span>
    );
  }
  // if no gif data, use failFrame
  if (failFrame) {
    return <img src={failFrame} alt="failFrame" />;
  }
  // if neither, return nothing (TODO create spinner)
  return <></>;
};

export default Gif;
