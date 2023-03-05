import { Box } from "@mui/material";
import "../../App.css";
import { styled } from "@mui/material/styles";

const StandardNavbar = styled(Box)`
  nav {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.26) 0%,
      rgba(0, 0, 0, 0.1378) 0.01%,
      rgba(0, 0, 0, 0.026) 100%
    );
    backdrop-filter: blur(40px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 0px 0px 15px 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.25);
    position: fixed;
    width: 100%;
  }

  nav li {
    color: white;
    font-size: 1.5rem;
    padding: 10px;
    margin: 10px;
  }

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-inline-start: 0;
  }
`;

function Navbar() {
  return (
    <StandardNavbar>
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Projects</li>
          <li>Products</li>
        </ul>
      </nav>
    </StandardNavbar>
  );
}

export default Navbar;
