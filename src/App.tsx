import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ParagraphComponent from "./Paragraph";
import book from "./assets/book.json";
import TitleComponent from "./Title";

interface Paragraph {
  paragraph: string;
  content: string
}

interface Chapter {
  section: string;
  paragraphs: Array<Paragraph>;
}

function App() {
  const [index, setIndex] = useState<number>(2);
  const [bookData, setBookData] = useState<Chapter | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const newIndex = parseInt(queryParams.get("index") || "", 10);
    if (!isNaN(newIndex) && newIndex >= 0 && newIndex <= book.length-1) {
      setIndex(newIndex);
    }

    if (book[index]) {
      setBookData(book[index]);
    }
  }, [index]);

  return (
    <Box sx={{}}>
      {bookData && <TitleComponent content={bookData.paragraphs[0].content} />}
      {bookData &&
        bookData.paragraphs.slice(1).map((paragraph: Paragraph) => {
          return <ParagraphComponent content={paragraph.content} />;
        })}
    </Box>
  );
}

export default App;
