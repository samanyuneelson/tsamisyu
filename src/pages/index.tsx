import { Box } from "@mui/material";
import Header from "../page-components/Header/Header";
import Navbar from "../page-components/Navbar/Navbar";
import Portfolio from "../page-components/Portfolio/Portfolio";
import Literacy from "../page-components/Literacy/Literacy";
import WhatsappIcon from "../components/whatsappIcon/whatsappIcon";
import NotesPage from "./notes";
import TrackerPage from "./tracker";
import PlayGroundPage from "./playground";

export { NotesPage, TrackerPage, PlayGroundPage };

export function LandingPage() {
  return (
    <Box>
      <Navbar />
      <Header />
      <Literacy />
      <Portfolio />
      <WhatsappIcon number="8281828578" />
    </Box>
  );
}

export function PageNotFound() {
  return <Box>Page Not Found, Coming soon</Box>;
}
