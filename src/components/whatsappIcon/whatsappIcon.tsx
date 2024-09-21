import IconButton from "@mui/material/IconButton";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { styled } from "@mui/material/styles";

const CustomWhatsappIcon = styled(IconButton)`
  display: flex;
  position: sticky;
  width: 60px;
  height: 60px;
  bottom: 40px;
  margin-top: -60px;
  float: right;
  right: 40px;
  background-color: #128c7e;
  box-shadow: 2px 2px 5px black;
  color: white;

  svg {
    width: 35px;
    height: 35px;
  }

  :hover {
    background-color: #075e54;
  }
`;

interface WhatsappProps {
  number: string;
}

const WhatsappIcon = (props: WhatsappProps) => {
  const href = `https://wa.me/${props.number}`;
  return (
    <CustomWhatsappIcon
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
