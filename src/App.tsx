import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ParagraphComponent from "./Paragraph";
import book from "./book.json";
import TitleComponent from "./Title";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import useDetectScroll, { Direction } from "@smakss/react-scroll-direction";

interface Paragraph {
  paragraph: string;
  content: string;
}

interface Chapter {
  section: string;
  paragraphs: Array<Paragraph>;
}

function App() {

  const getIndexFromStorage = (): number | null => {
    const indexString = localStorage.getItem("index");
    return indexString ? parseInt(indexString, 10) : null
  };

  const getIndexFromUrl = (): number | null => {
    const queryParams = new URLSearchParams(window.location.search);
    const indexString = queryParams.get("index");
    return indexString ? parseInt(indexString, 10) : null;
  };

  const getInitialIndex = (): number => {
    return getIndexFromUrl() ?? getIndexFromStorage() ?? 2
  }

  const [index, setIndex] = useState<number>(getInitialIndex());
  const [bookData, setBookData] = useState<Chapter | null>(null);
  const { scrollDir } = useDetectScroll();

  const changeIndex = (newIndex: number) => {
    if (newIndex > book.length - 1) {
      newIndex = book.length - 1;
    } else if (newIndex < 0) {
      newIndex = 0;
    }
    if (book[newIndex]) {
      setBookData(book[newIndex]);
    }
    const url = new URL(window.location.href);
    url.searchParams.set("index", newIndex.toString());
    window.history.pushState(null, "", url.toString());
    setIndex(newIndex);
  };

  const arrowOpacity = (
    scrollDir: Direction,
    index: number,
    rightArrow: boolean
  ): number => {
    let baseOpacity = scrollDir == "down" ? 25 : 75;
    let indexModifier =
      (rightArrow && index >= book.length - 1) || (!rightArrow && index <= 0)
        ? 0
        : 1;
    return baseOpacity * indexModifier;
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    changeIndex(index);
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
          opacity: `${arrowOpacity(scrollDir, index, false)}%`,
          transition: "opacity 0.25s ease",
        }}
        onClick={() => {
          changeIndex(index - 1);
          scrollToTop();
        }}
      />
      <BsFillArrowRightSquareFill
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          margin: "0.5% 0.5%",
          opacity: `${arrowOpacity(scrollDir, index, true)}%`,
          transition: "opacity 0.25s ease",
        }}
        onClick={() => {
          changeIndex(index + 1);
          scrollToTop();
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
