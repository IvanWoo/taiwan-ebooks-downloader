import fs from "fs";
import path from "path";

import { getPdfUrls, getLabel, getDownloadBtn } from "../utils";

beforeEach(() => {
  fetch.resetMocks();
});

describe("getPdfUrls", () => {
  const cases = [
    // FIXME: the below testing didn't work the way expected as in browser
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
        "http://taiwanebook.ncl.edu.tw/ebkFiles/NTUL-9900013103/NTUL-9900013103.PDF",
      ],
    ],
  ];

  test.each(cases)("given %p, returns %p", async (id, expected) => {
    const url = `https://taiwanebook.ncl.edu.tw/en/book/${id}`;
    const html = fs.readFileSync(
      path.resolve(__dirname, `./mocks/${id}.html`),
      "utf8"
    );
    fetch.mockResponseOnce(
      JSON.stringify({
        data: html,
      })
    );
    const results = await getPdfUrls(url);
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
