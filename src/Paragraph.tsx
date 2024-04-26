import { Box } from "@mui/material";

interface ParagraphComponentProps {
  content: string;
}

const ParagraphComponent = ({ content }: ParagraphComponentProps) => {
  return (
    <Box sx={{ margin: "1.5% 2%", textIndent: "2%" }}>
      {content}
    </Box>
  );
};

export default ParagraphComponent;
