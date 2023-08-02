import fs from "fs";
import path from "path";

import { getPdfHrefs, getPdfUrls, getLabel, getDownloadBtn } from "../utils";

beforeEach(() => {
  fetch.resetMocks();
});

const mockBookReaderHtml = (id) => {
  const html = fs.readFileSync(
    path.resolve(__dirname, `./mocks/${id}.html`),
    "utf8"
  );
  fetch.mockResponseOnce(html);
};

describe("getPdfHrefs", () => {
  const cases = [
    [
      "NCL-9910002285",
      [
        "/pdfjs_dual/web/viewer.html?file=/ebkFiles/NCL-9910002285/NCL-9910002285F01.PDF",
        "/pdfjs_dual/web/viewer.html?file=/ebkFiles/NCL-9910002285/NCL-9910002285F02.PDF",
      ],
    ],
    ["NTUL-9900013103", []],
  ];

  test.each(cases)("given %p, returns %p", async (id, expected) => {
    mockBookReaderHtml(id);
    const url = `https://taiwanebook.ncl.edu.tw/en/book/${id}`;
    const results = await getPdfHrefs(url);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(results).toEqual(expected);
  });
});

describe("getPdfUrls", () => {
  const cases = [
    // FIXME: the context difference between browser and test runners makes the multi parts fail
    // [
    //   "NCL-9910002285",
    //   [
    //     "https://taiwanebook.ncl.edu.tw/ebkFiles/NCL-9910002285/NCL-9910002285F01.PDF",
    //     "https://taiwanebook.ncl.edu.tw/ebkFiles/NCL-9910002285/NCL-9910002285F02.PDF",
    //   ],
    // ],
    [
      "NTUL-9900013103",
      [
        "https://taiwanebook.ncl.edu.tw/ebkFiles/NTUL-9900013103/NTUL-9900013103.PDF",
      ],
    ],
  ];

  test.each(cases)("given %p, returns %p", async (id, expected) => {
    mockBookReaderHtml(id);
    const url = `https://taiwanebook.ncl.edu.tw/en/book/${id}`;
    const results = await getPdfUrls(url);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(results).toEqual(expected);
  });
});

describe("getLabel", () => {
  const cases = [
    [
      "https://taiwanebook.ncl.edu.tw/en/category/sciences-and-engineering/maintitle/asc/grid",
      "Download eBook",
    ],
    [
      "https://taiwanebook.ncl.edu.tw/zh-tw/category/sciences-and-engineering/maintitle/asc/grid",
      "下載電子書",
    ],
  ];

  test.each(cases)("given %p, returns %p", (url, expected) => {
    expect(getLabel(url)).toBe(expected);
  });
});

describe("getDownloadBtn", () => {
  it("matches the snapshot", () => {
    const pdfUrl =
      "https://taiwanebook.ncl.edu.tw/ebkFiles/NCL-9910002138/NCL-9910002138.PDF";
    const label = "Download eBook";
    const container = getDownloadBtn(pdfUrl, label);

    expect(container).toMatchSnapshot();
  });
});
