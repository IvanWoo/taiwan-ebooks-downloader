import { onBookPage, onBookReaderPage, onSearchPage } from "./utils";

const main = async () => {
  const url = window.location.toString();
  if (url.split("/")[4] === "book") {
    if (url.split("/").length === 6) {
      await onBookPage(url);
    } else if (url.split("/").length === 7) {
      // remove `/reader` at the end of url
      await onBookReaderPage(url.split("/").slice(0, -1).join("/"));
    }
  } else {
    await onSearchPage();
  }
};

// kick off
main();
