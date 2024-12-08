import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

import headerImage from "../../assets/header.png";
import resume from "../../assets/Samanyu Neelson.pdf";

const StandardHeader = styled(Box)`
  .App-header {
    /* background-color: #282c34; */
    background-image: url(${headerImage});
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
    padding: 10%;
  }
  @media screen and (max-width: 992px) {
    h1 {
      font-size: 2rem !important;
      text-align: left;
    }

    h4 {
      font-size: 1rem !important;
      text-align: left;
    }
  }
`;

export default function Header() {
  return (
    <StandardHeader>
      <header className="App-header">
        <Typography variant="h1">Hi, im Sam &#9996;</Typography>
        <Typography variant="h4">Creator | Developer | Designer</Typography>
        <Button
          color="success"
          href={resume}
          variant="contained"
          sx={{
            marginTop: "2%",
          }}
        >
          Resume
        </Button>
      </header>
    </StandardHeader>
  );
}
