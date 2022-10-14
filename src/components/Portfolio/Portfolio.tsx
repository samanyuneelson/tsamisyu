import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import js from "../../assets/js.png"
import html from "../../assets/html.png"
import go from "../../assets/go.png"
import python from "../../assets/python.png"
import cpp from "../../assets/cpp.png"

import typescript from "../../assets/typescript.png"
import gatsby from "../../assets/gatsby.png"
import reactjs from "../../assets/reactjs.png"
import d3 from "../../assets/d3.png"
import ros from "../../assets/ros.png"
import Fusion360 from "../../assets/Fusion360.png"
import angular from "../../assets/angular.png"
import pandas from "../../assets/pandas.png"
import figma from "../../assets/figma.png"
import illustrator from "../../assets/Illustrator.png"
import photoshop from "../../assets/photoshop.png"
import afterEffects from "../../assets/aftereffects.png"
import graphgl from "../../assets/graphql.png"
import nextjs from "../../assets/nextjs.png"

export default function Portfolio() {

    return (
        <Box className="portfolio" padding="5%" >
            <Typography variant="h2">
                Portfolio
            </Typography>
            <Box display="flex" flexDirection="row" justifyContent="center" >
                <div className="programmingIcon">
                    <img src={js} />
                </div>
                <div className="programmingIcon">
                    <img src={html} />
                </div>
                <div className="programmingIcon">
                    <img src={go} />
                </div>
                <div className="programmingIcon">
                    <img src={python} />
                </div>
                <div className="programmingIcon">
                    <img src={cpp} />
                </div>
            </Box>
            <Box className="infiniteRunParent">
                <Box className="infiniteRun" display="flex" flexDirection="row" flexWrap="nowrap" width="100%" >
                    <div className="programmingIcon">
                        <img src={typescript} />
                    </div>
                    <div className="programmingIcon">
                        <img src={gatsby} />
                    </div>
                    <div className="programmingIcon">
                        <img src={reactjs} />
                    </div>
                    <div className="programmingIcon">
                        <img src={d3} />
                    </div>
                    <div className="programmingIcon">
                        <img src={ros} />
                    </div>
                    <div className="programmingIcon">
                        <img src={Fusion360} />
                    </div>
                    <div className="programmingIcon">
                        <img src={angular} />
                    </div>
                    <div className="programmingIcon">
                        <img src={pandas} />
                    </div>
                    <div className="programmingIcon">
                        <img src={figma} />
                    </div>
                    <div className="programmingIcon">
                        <img src={illustrator} />
                    </div>
                    <div className="programmingIcon">
                        <img src={photoshop} />
                    </div>
                    <div className="programmingIcon">
                        <img src={afterEffects} />
                    </div>
                    <div className="programmingIcon">
                        <img src={graphgl} />
                    </div>
                    <div className="programmingIcon">
                        <img src={nextjs} />
                    </div>
                    <div className="programmingIcon">
                        <img src={typescript} />
                    </div>
                    <div className="programmingIcon">
                        <img src={gatsby} />
                    </div>
                    <div className="programmingIcon">
                        <img src={reactjs} />
                    </div>
                    <div className="programmingIcon">
                        <img src={d3} />
                    </div>
                    <div className="programmingIcon">
                        <img src={ros} />
                    </div>
                    <div className="programmingIcon">
                        <img src={Fusion360} />
                    </div>
                    <div className="programmingIcon">
                        <img src={angular} />
                    </div>
                    <div className="programmingIcon">
                        <img src={pandas} />
                    </div>
                    <div className="programmingIcon">
                        <img src={figma} />
                    </div>
                    <div className="programmingIcon">
                        <img src={illustrator} />
                    </div>
                    <div className="programmingIcon">
                        <img src={photoshop} />
                    </div>
                    <div className="programmingIcon">
                        <img src={afterEffects} />
                    </div>
                    <div className="programmingIcon">
                        <img src={graphgl} />
                    </div>
                    <div className="programmingIcon">
                        <img src={nextjs} />
                    </div>                                                                  
                </Box>
            </Box>
        </Box>
    )
}