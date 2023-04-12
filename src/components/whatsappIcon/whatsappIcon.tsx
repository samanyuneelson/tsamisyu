import React from "react";
import IconButton from "@mui/material/IconButton";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { styled } from "@mui/material/styles";

const CustomWhatsappIcon = styled(IconButton)`
  display: block;
  position: sticky;
  width: 60px;
  height: 60px;
  bottom: 40px;
  margin-top: -60px;
  background-color: #128c7e;
  box-shadow: 2px 2px 5px black;
  color: white;

  .left {
    float: left;
    left: 40px;
  }

  .right {
    color: black;
    float: right;
    right: 40px;
  }

  svg {
    width: 35px;
    height: 35px;
  }

  :hover {
    background-color: #075e54;
  }
`;

interface WhatsappProps {
  whatsappNumber: string;
  /** position of the button could be "left" or "right". default is right */
  position?: string;
  /** distance offset from ether position. Default is 40px */
  spacing?: string;
}

const WhatsappIcon = ({
  whatsappNumber,
  position = "right",
  spacing = "40px"
}: WhatsappProps) => {
  const href = `https://wa.me/${whatsappNumber}`;
  return (
    <CustomWhatsappIcon
      sx={{float: position, right: spacing, left: spacing}}
      color="secondary"
      aria-label="Contact"
      size="large"
      onClick={() => window.open(href)}
    >
      <WhatsAppIcon />
    </CustomWhatsappIcon>
  );
};

export default WhatsappIcon;
