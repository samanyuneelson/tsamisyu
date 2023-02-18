import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";

import js from "../../assets/js.png";
import html from "../../assets/html.png";
import go from "../../assets/go.png";
import python from "../../assets/python.png";
import cpp from "../../assets/cpp.png";
import typescript from "../../assets/typescript.png";
import gatsby from "../../assets/gatsby.png";
import reactjs from "../../assets/reactjs.png";
import d3 from "../../assets/d3.png";
import ros from "../../assets/ros.png";
import Fusion360 from "../../assets/Fusion360.png";
import angular from "../../assets/angular.png";
import pandas from "../../assets/pandas.png";
import figma from "../../assets/figma.png";
import illustrator from "../../assets/Illustrator.png";
import photoshop from "../../assets/photoshop.png";
import afterEffects from "../../assets/aftereffects.png";
import graphgl from "../../assets/graphql.png";
import nextjs from "../../assets/nextjs.png";

const MarqueePortfolio = styled(Box)`
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-inline-start: 0;
  }

  .portfolio {
    background-color: #d9d9d9;
  }

  .marquee {
    --gap: 5rem;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    gap: var(--gap);
    user-select: none;
  }

  .marquee__content {
    gap: var(--gap);
  }

  .programmingIcon {
    padding: 4% 2% 2% 2%;
  }

  .infiniteRun {
    animation-iteration-count: infinite;
    animation-duration: 30s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-name: scroll;
  }

  .marquee--hover-pause:hover .marquee__content {
    animation-play-state: paused;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-100% - var(--gap)));
    }
  }

  li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
`;

export default function Portfolio() {
  return (
    <MarqueePortfolio className="portfolio" padding="5%">
      <Typography variant="h2">Portfolio</Typography>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <div className="programmingIcon">
          <img src={js} alt="" />
        </div>
        <div className="programmingIcon">
          <img src={html} alt="" />
        </div>
        <div className="programmingIcon">
          <img src={go} alt="" />
        </div>
        <div className="programmingIcon">
          <img src={python} alt="" />
        </div>
        <div className="programmingIcon">
          <img src={cpp} alt="" />
        </div>
      </Box>
      <Box className="marquee marquee--hover-pause ">
        <ul className="marquee__content infiniteRun">
          <li>
            <img src={typescript} alt="" />
          </li>
          <li>
            <img src={gatsby} alt="" />
          </li>
          <li>
            <img src={reactjs} alt="" />
          </li>
          <li>
            <img src={d3} alt="" />
          </li>
          <li>
            <img src={ros} alt="" />
          </li>
          <li>
            <img src={Fusion360} alt="" />
          </li>
          <li>
            <img src={angular} alt="" />
          </li>
          <li>
            <img src={pandas} alt="" />
          </li>
          <li>
            <img src={figma} alt="" />
          </li>
          <li>
            <img src={illustrator} alt="" />
          </li>
          <li>
            <img src={photoshop} alt="" />
          </li>
          <li>
            <img src={afterEffects} alt="" />
          </li>
          <li>
            <img src={graphgl} alt="" />
          </li>
          <li>
            <img src={nextjs} alt="" />
          </li>
        </ul>

        <ul className="marquee__content infiniteRun">
          <li>
            <img src={typescript} alt="" />
          </li>
          <li>
            <img src={gatsby} alt="" />
          </li>
          <li>
            <img src={reactjs} alt="" />
          </li>
          <li>
            <img src={d3} alt="" />
          </li>
          <li>
            <img src={ros} alt="" />
          </li>
          <li>
            <img src={Fusion360} alt="" />
          </li>
          <li>
            <img src={angular} alt="" />
          </li>
          <li>
            <img src={pandas} alt="" />
          </li>
          <li>
            <img src={figma} alt="" />
          </li>
          <li>
            <img src={illustrator} alt="" />
          </li>
          <li>
            <img src={photoshop} alt="" />
          </li>
          <li>
            <img src={afterEffects} alt="" />
          </li>
          <li>
            <img src={graphgl} alt="" />
          </li>
          <li> 
            <img src={nextjs} alt="" />
          </li>
        </ul>
      </Box>
    </MarqueePortfolio>
  );
}
