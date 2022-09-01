const getContent = async (url) => {
  const response = await fetch(url);
  const data = await response.text();
  return data;
};

const getDefaultPdfUrl = (url) => {
  const id = url.split("/")[5];
  return `http://taiwanebook.ncl.edu.tw/ebkFiles/${id}/${id}.PDF`;
};

export const getPdfHrefs = async (url) => {
  const readerUrl = url + "/reader";
  const htmlString = await getContent(readerUrl);
  const parser = new DOMParser();
  const readerPage = parser.parseFromString(htmlString, "text/html");
  const pdfAnchorTags = readerPage.querySelectorAll("a.pdfFile");
  return [...pdfAnchorTags].map((x) => x.href.trim());
};

export const getPdfUrls = async (url) => {
  const hrefs = await getPdfHrefs(url);
  let pdfUrls = hrefs.map((x) => {
    const url = new URL(x);
    return url.origin + url.searchParams.get("file");
  });
  if (pdfUrls.length === 0) {
    pdfUrls = [getDefaultPdfUrl(url)];
  }
  return pdfUrls;
};

export const getLabel = (url) => {
  const language = url.split("/")[3];
  return language === "en" ? "Download eBook" : "下載電子書";
};

export const getDownloadBtn = (pdfUrl, label) => {
  let downloadBtn = document.createElement("A");
  downloadBtn.target = "_blank";
  downloadBtn.href = pdfUrl;
  downloadBtn.textContent = `${label} ${pdfUrl.split("/").slice(-1)}`;
  return downloadBtn;
};

export const onBookPage = async (url) => {
  const label = getLabel(url);
  const pdfUrls = await getPdfUrls(url);

  for (const pdfUrl of pdfUrls) {
    const downloadIcon = document.createElement("I");
    const downloadBtn = getDownloadBtn(pdfUrl, label);
    downloadBtn.appendChild(downloadIcon);
    // on book page
    downloadIcon.classList.add("right", "chevron", "icon");
    downloadBtn.classList.add(
      "ui",
      "cetered",
      "blue",
      "button",
      "focus_border"
    );
    const bookCover = document.querySelector("div.ui.medium.image");
    bookCover.appendChild(downloadBtn);
  }
};

export const onBookReaderPage = async (url) => {
  const label = getLabel(url);
  const pdfUrls = await getPdfUrls(url);

  for (const pdfUrl of pdfUrls) {
    const downloadIcon = document.createElement("I");
    const downloadBtn = getDownloadBtn(pdfUrl, label);
    downloadBtn.appendChild(downloadIcon);
    // on book reader page
    downloadIcon.classList.add("right", "arrow", "icon");
    downloadBtn.classList.add(
      "ui",
      "labeled",
      "icon",
      "button",
      "focus_border"
    );
    const btnColumn = document.querySelector(
      "body > main > main > div > div:nth-child(1) > div.ui.three.wide.computer.three.wide.tablet.sixteen.wide.mobile.column"
    );
    btnColumn.appendChild(downloadBtn);
  }
};

export const onSearchPage = async () => {
  // on search page
  for (const value of document.querySelectorAll(
    "div.extra > a.ui.right.floated"
  )) {
    const url = value.href;

    const pdfUrls = await getPdfUrls(url);
    const label = getLabel(url);
    for (const pdfUrl of pdfUrls) {
      // add download button
      const downloadIcon = document.createElement("I");
      downloadIcon.classList.add("right", "chevron", "icon");

      const downloadBtn = getDownloadBtn(pdfUrl, label);
      downloadBtn.classList.add("ui", "right", "floated");
      downloadBtn.appendChild(downloadIcon);

      value.parentNode.appendChild(downloadBtn);
    }
  }
};
