import { Box } from "@mui/material";
import Header from "../page-components/Header/Header";
import Navbar from "../page-components/Navbar/Navbar";
import Portfolio from "../page-components/Portfolio/Portfolio";
import Literacy from "../page-components/Literacy/Literacy";
import { WhatsappButton } from "@samanyuneelson/infin-whatsapp-extension";

function LandingPage() {
  return (
    <Box>
      <Navbar />
      <Header />
      <Literacy />
      <Portfolio />
      <WhatsappButton whatsappNumber="8281828578"></WhatsappButton>
    </Box>
  );
}

export default LandingPage;
