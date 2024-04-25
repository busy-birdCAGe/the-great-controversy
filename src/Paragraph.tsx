import { Box } from "@mui/material";

interface ParagraphComponentProps {
  content: string;
}

const ParagraphComponent = ({ content }: ParagraphComponentProps) => {
  return (
    <Box sx={{ margin: "2% 2%" }}>
      {content}
    </Box>
  );
};

export default ParagraphComponent;
