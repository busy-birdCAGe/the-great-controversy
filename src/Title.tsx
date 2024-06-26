import { Box } from "@mui/material";

interface TitleComponentProps {
  content: string;
}

const TitleComponent = ({ content }: TitleComponentProps) => {
  return <Box sx={{ textAlign: "center", margin: "1.5% 2%", fontSize: "2rem" }}>{content}</Box>;
};

export default TitleComponent;
