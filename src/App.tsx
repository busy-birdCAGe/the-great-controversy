import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ParagraphComponent from "./Paragraph";
import book from "./book.json";
import TitleComponent from "./Title";
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from "react-icons/bs";
import useDetectScroll from "@smakss/react-scroll-direction";

interface Paragraph {
  paragraph: string;
  content: string
}

interface Chapter {
  section: string;
  paragraphs: Array<Paragraph>;
}

interface NavVisibility {
  left: number
  right: number
}

function App() {
  const [index, setIndex] = useState<number>(2);
  const [bookData, setBookData] = useState<Chapter | null>(null);

  const [navVisibility, setNavVisibility] = useState<NavVisibility>({
    left: 1,
    right: 1,
  });

  const { scrollDir } = useDetectScroll();

  const changeIndex = (newIndex: number) => {
    if (!isNaN(newIndex) && newIndex >= 0 && newIndex <= book.length - 1) {
      if (newIndex == 0) {
        setNavVisibility({ left: 0, right: 1 });
      } else if (newIndex == book.length - 1) {
        setNavVisibility({ left: 1, right: 0 });
      }
      if (book[newIndex]) {
        setBookData(book[newIndex]);
      }
      const url = new URL(window.location.href);
      url.searchParams.set("index", newIndex.toString());
      window.history.pushState(null, "", url.toString());
      setIndex(newIndex);
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const newIndex = parseInt(queryParams.get("index") || "2", 10);
    changeIndex(newIndex);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        overflowY: "visible",
      }}
    >
      <BsFillArrowLeftSquareFill
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          margin: "0.5% 0.5%",
          opacity: `${navVisibility.left * (scrollDir == "down" ? 25 : 75)}%`,
          transition: "opacity 0.25s ease",
        }}
        onClick={() => {
          changeIndex(index - 1);
        }}
      />
      <BsFillArrowRightSquareFill
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          margin: "0.5% 0.5%",
          opacity: `${navVisibility.right * (scrollDir == "down" ? 25 : 75)}%`,
          transition: "opacity 0.25s ease",
        }}
        onClick={() => {
          changeIndex(index + 1);
        }}
      />
      {bookData && <TitleComponent content={bookData.paragraphs[0].content} />}
      {bookData &&
        bookData.paragraphs.slice(1).map((paragraph: Paragraph) => {
          return <ParagraphComponent content={paragraph.content} />;
        })}
    </Box>
  );
}

export default App;
