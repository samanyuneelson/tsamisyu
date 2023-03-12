import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import headerImage from "../../assets/header.png";

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
    padding: 100px;
  }
`;

export default function Header() {
  return (
    <StandardHeader>
      <header className="App-header">
        <h1>Hi, im Sam &#9996;</h1>
        <p>Creator | Developer | Designer</p>
      </header>
    </StandardHeader>
  );
}
