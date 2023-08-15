import { Box, Link } from "@mui/material";
import "../../App.css";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons";

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
    z-index: 2;
    color: white !important;
    top: 0;
    width: 100%;
    position: fixed;
    display: grid;
    grid-template-columns: auto;
    align-content: space-around;
    padding: 1.5% 0%;
    place-items: center;
  }

  .navbar-list {
    display: grid;
    place-items: center;
    grid-template-columns: auto auto auto auto;
    grid-column-gap: 5%;
    width: 30%;
  }
  .navbar-list a {
    color: white;
    white-space: nowrap;
    text-align: left;
    width: auto;
    text-decoration: none;
    margin: 2% 1% 2% 1%;
    font-size: 1.2vw;
  }
  .navbar-list a:hover {
    opacity: 0.7;
  }

  .icon {
    padding: 0.5%;
    display: none;
    align-items: center;
  }

  @media screen and (max-width: 992px) {
    nav {
      display: grid;
      grid-template-columns: auto;
    }
    .icon {
      width: 100%;
      display: grid;
      place-items: end;
    }
    .icon div {
      width: 10%;
      right: 0;
    }
    .navbar-list {
      display: none;
    }
    .navbar-list.responive {
      display: grid;
      grid-template-columns: auto;
      place-items: flex-start;
      width: 100%;
      grid-row-start: 2;
      grid-row-end: 3;
      margin: 0% 0% 0% 1%;
    }
    .navbar-list.responive a {
      text-align: left;
      font-size: 1em;
      margin: 0% 5%;
      padding: 4% 0%;
    }
    .responsive {
      display: grid;
      grid-template-columns: auto;
    }
  }
`;

const NavList = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/#about",
  },
  {
    name: "Portfolio",
    link: "/#portfolio",
  },
  // {
  //   name: "Blog",
  //   link: "",
  // },
];

function Navbar() {
  const [mobl, mobval] = useState("navbar-list");
  return (
    <StandardNavbar>
      <nav>
        <Box className={mobl}>
          {NavList.map((tab) => (
            <Link
              href={tab.link}
              onClick={() => {
                mobval(
                  mobl === "navbar-list responive"
                    ? "navbar-list"
                    : "navbar-list responive"
                );
              }}
            >
              {tab.name}
            </Link>
          ))}
        </Box>
        <IconContext.Provider value={{ className: "react-icons" }}>
          <div className="icon">
            <div
              onClick={() => {
                mobval(
                  mobl === "navbar-list"
                    ? "navbar-list responive"
                    : "navbar-list"
                );
              }}
            >
              <FaBars />
            </div>
          </div>
        </IconContext.Provider>
      </nav>
    </StandardNavbar>
  );
}

export default Navbar;
