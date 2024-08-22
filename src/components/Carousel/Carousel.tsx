import { Box, FabTypeMap, Grid, styled, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
// import { useState } from "react";

import kidangoorSnapshot from "../../assets/kidangoorWebsite.png";
import lumiereSnapshot from "../../assets/lumiere20.png";
import liveAbsoluteSnapshot from "../../assets/liveAbsolute.png";
import pearlComputersSnapshot from "../../assets/pearlComputers.png";

const CarouselStyle = styled(Box)`
  padding: 1%;

  .carousel-item-visible {
    /* display: block; show current slide image */
    animation: fadeVisibility 0.5s; /* for fading effect when switching between slides */
  }

  .projectTile {
    padding: 2%;
  }

  .projectTile > a {
    padding: 2%;
    text-decoration: none;
    color: white;
    border-radius: 15px;
  }

  .projectTile > a:hover {
    background-color: #1e1e1e;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }

  a {
    color: lightblue;
  }

  .carousel-actions {
    display: flex;
    width: 100%;
    justify-content: space-between; /* put space between the navigation buttons */
    position: absolute; /* position navigation buttons on top */
    top: 50%; /* center navigation buttons on the slide */
    transform: translateY(-50%); /* align navigation buttons */
  }

  .carousel-actions button {
    border-radius: 50px;
    background-color: white;
    border: 0;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    width: 40px;
    height: 40px;
  }

  .carousel-actions button#carousel-button-prev {
    margin-left: 20px; /* prevent previous button from touching the side*/
  }

  .carousel-actions button#carousel-button-next {
    margin-right: 20px; /* prevent next button from touching the side*/
  }

  .carousel-dots {
    text-align: center;
  }

  .dot {
    opacity: 0.7; /* gray out dots for slides not being visted */
  }

  .dot:focus {
    border: 1px solid black; /* dot for currently visited slide */
  }

  /* hanlde smooth transitions between slides */
  @keyframes fadeVisibility {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media screen and (max-width: 992px) {
    h5 {
      font-size: 1rem !important;
      text-align: left;
    }
    p {
      font-size: 0.5rem !important;
    }
  }
`;

type CarouselProps = {
  children: OverridableComponent<FabTypeMap<{}, "div">>[];
};

export default function Carousel(props: CarouselProps) {
  // const { children } = props;

  // const [selectedCarousel, setSelectedCarousel] = useState(0);

  // const handleMoveToPrevSlide = () => {
  //   if (selectedCarousel === 0) {
  //     setSelectedCarousel(2);
  //     return;
  //   }
  //   setSelectedCarousel(selectedCarousel - 1);
  // };

  // const handleMoveToNextSlide = () => {
  //   if (selectedCarousel === 2) {
  //     setSelectedCarousel(0);
  //     return;
  //   }
  //   setSelectedCarousel(selectedCarousel + 1);
  // };

  // const handleCarouselDotClick = (dotIndex: number) => {
  //   setSelectedCarousel(dotIndex);
  // };

  return (
    <CarouselStyle>
      {/* {children.forEach} */}
      {/* <Box hidden={selectedCarousel !== 0}> */}
      <Box>
        <Grid container>
          <Grid container item xs={12} md={6} className="projectTile">
            <a href="https://lumiere20.netlify.app/">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <img src={lumiereSnapshot} alt="Lumiere 2020 website" />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h5" sx={{ textAlign: "left" }}>
                    Lumiere20
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    paragraph
                    sx={{ textAlign: "left" }}
                  >
                    College of engineering kidangoor Annual technical fest
                    website.
                    <br />
                    <a href="https://lumiere20.netlify.app/">click here.</a>
                  </Typography>
                </Grid>
              </Grid>
            </a>
          </Grid>
          <Grid container xs={12} md={6} className="projectTile">
            <a href="https://web.archive.org/web/20240702114314/https://www.ce-kgr.org/">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <img
                    src={kidangoorSnapshot}
                    alt="College of Engineering Kidangoor Website"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h5" sx={{ textAlign: "left" }}>
                    CE Kidangoor
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    paragraph
                    sx={{ textAlign: "left" }}
                  >
                    Official website of College of Engineering Kidangoor.
                    <br />
                    <a href="https://web.archive.org/web/20240702114314/https://www.ce-kgr.org/">
                      click here.
                    </a>
                  </Typography>
                </Grid>
              </Grid>
            </a>
          </Grid>
          <Grid container xs={12} md={6} className="projectTile">
            <a href="https://liveabsolute.org">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <img src={liveAbsoluteSnapshot} alt="Live Absolute Website" />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h5" sx={{ textAlign: "left" }}>
                    Live Absolute
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    paragraph
                    sx={{ textAlign: "left" }}
                  >
                    Official Website for life coaching service live absolute.
                    <br />
                    <a href="https://liveabsolute.org">click here.</a>
                  </Typography>
                </Grid>
              </Grid>
            </a>
          </Grid>
          <Grid container xs={12} md={6} className="projectTile">
            <a href="https://pearlcomputer.org">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <img
                    src={pearlComputersSnapshot}
                    alt="Pearl Computers Website"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h5" sx={{ textAlign: "left" }}>
                    Pearl Computers
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    paragraph
                    sx={{ textAlign: "left" }}
                  >
                    Official Website for Pearl Computers.
                    <br />
                    <a href="https://pearlcomputer.org">click here.</a>
                  </Typography>
                </Grid>
              </Grid>
            </a>
          </Grid>
        </Grid>
      </Box>
      {/* <Box hidden={selectedCarousel !== 1}>
        <img
          src="https://images.unsplash.com/photo-1503925802536-c9451dcd87b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=450&q=80"
          alt="Zombie hands"
        />
      </Box>
      <Box hidden={selectedCarousel !== 2}>
        <img
          src="https://images.unsplash.com/photo-1509558567730-6c838437b06b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=450&q=80"
          alt="Zombie pumpkin"
        />
      </Box> */}
      {/* <Box className="carousel-actions">
        <button
          onClick={handleMoveToPrevSlide}
          aria-label="Previous"
        >
          1
        </button>
        <button
          onClick={handleMoveToNextSlide}
          aria-label="Next"
        >
          2
        </button>
      </Box> */}
      {/* <Box className="carousel-dots">
        <input
          onClick={() => handleCarouselDotClick(0)}
          className={selectedCarousel === 0 ? "carousel-dots" : "dot"}
          type="radio"
          name="dot"
          checked={selectedCarousel === 0}
        />
        <input
          onClick={() => handleCarouselDotClick(1)}
          className={selectedCarousel === 1 ? "carousel-dots" : "dot"}
          type="radio"
          name="dot"
          checked={selectedCarousel === 1}
        />
        <input
          onClick={() => handleCarouselDotClick(2)}
          className={selectedCarousel === 2 ? "carousel-dots" : "dot"}
          type="radio"
          name="dot"
          checked={selectedCarousel === 2}
        />
      </Box> */}
    </CarouselStyle>
  );
}
