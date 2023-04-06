import { Box } from "@mui/material";
import Header from "../page-components/Header/Header";
import Navbar from "../page-components/Navbar/Navbar";
import Portfolio from "../page-components/Portfolio/Portfolio";
import Literacy from "../page-components/Literacy/Literacy";
import { Button } from "@samanyuneelson/infin-whatsapp-extension";

function LandingPage() {
  return (
    <Box>
      <Navbar />
      <Header />
      <Literacy />
      <Portfolio />
      <Button whatsappNumber="8281828578"></Button>
    </Box>
  );
}

export default LandingPage;
