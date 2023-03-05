import { Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Carousel from "../Carousel/Carousel";

const CustomPortFolio = styled(Box)`
  background-color: #414141;
  color: white;

  .frostPane {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.26) 0%,
      rgba(0, 0, 0, 0.1378) 0.01%,
      rgba(0, 0, 0, 0.026) 100%
    );
    backdrop-filter: blur(40px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 20px 20px 20px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

export default function Portfolio() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function allyProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <CustomPortFolio padding="5%">
      <Box>
        <Typography variant="h2">Portfolio</Typography>
        <Box className="frostPane">
          <Box>
            {/* <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Projects" {...allyProps(0)} />
              <Tab label="Libraries" {...allyProps(1)} />
            </Tabs> */}
            <Carousel children={[]}/>
          </Box>
        </Box>
      </Box>
    </CustomPortFolio>
  );
}
