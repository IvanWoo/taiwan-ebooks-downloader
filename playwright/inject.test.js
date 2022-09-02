const { test: base, chromium, webkit, expect } = require("@playwright/test");
const path = require("path");

const extensionPath = path.join(__dirname, "../chrome");

// https://www.petroskyriakou.com/how-to-load-a-chrome-extension-in-playwright
const test = base.extend({
  context: async ({ browserName }, use) => {
    const browserTypes = { chromium, webkit };
    const launchOptions = {
      devtools: true,
      headless: false,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
      viewport: {
        width: 1920,
        height: 1080,
      },
    };
    const context = await browserTypes[browserName].launchPersistentContext(
      "",
      launchOptions
    );
    await use(context);
    await context.close();
  },
});

test.describe.configure({ mode: "parallel" });

test.describe("inject multiple parts", () => {
  const p1 =
    "https://taiwanebook.ncl.edu.tw/ebkFiles/NTUL-9910003011/NTUL-9910003011F01.PDF";
  const p2 =
    "https://taiwanebook.ncl.edu.tw/ebkFiles/NTUL-9910003011/NTUL-9910003011F02.PDF";
  const p3 =
    "https://taiwanebook.ncl.edu.tw/ebkFiles/NTUL-9910003011/NTUL-9910003011F03.PDF";

  test("onBookPage", async ({ page }) => {
    await page.goto(
      "https://taiwanebook.ncl.edu.tw/zh-tw/book/NTUL-9910003011"
    );

    await expect(page.locator(`id=${p1}`)).toHaveText(
      "下載電子書 NTUL-9910003011F01.PDF"
    );
    await expect(page.locator(`id=${p2}`)).toHaveText(
      "下載電子書 NTUL-9910003011F02.PDF"
    );
    await expect(page.locator(`id=${p3}`)).toHaveText(
      "下載電子書 NTUL-9910003011F03.PDF"
    );
  });

  test("onBookReaderPage", async ({ page }) => {
    await page.goto(
      "https://taiwanebook.ncl.edu.tw/zh-tw/book/NTUL-9910003011/reader"
    );

    await expect(page.locator(`id=${p1}`)).toHaveText(
      "下載電子書 NTUL-9910003011F01.PDF"
    );
    await expect(page.locator(`id=${p2}`)).toHaveText(
      "下載電子書 NTUL-9910003011F02.PDF"
    );
    await expect(page.locator(`id=${p3}`)).toHaveText(
      "下載電子書 NTUL-9910003011F03.PDF"
    );
  });

  test("onSearchPage", async ({ page }) => {
    await page.goto(
      "https://taiwanebook.ncl.edu.tw/zh-tw/search/all/%22NTUL-9910003011%22/all/asc/grid/1"
    );

    await expect(page.locator(`id=${p1}`)).toHaveText(
      "下載電子書 NTUL-9910003011F01.PDF"
    );
    await expect(page.locator(`id=${p2}`)).toHaveText(
      "下載電子書 NTUL-9910003011F02.PDF"
    );
    await expect(page.locator(`id=${p3}`)).toHaveText(
      "下載電子書 NTUL-9910003011F03.PDF"
    );
  });
});

test.describe("inject single part", () => {
  const p1 =
    "http://taiwanebook.ncl.edu.tw/ebkFiles/NCL-001542808/NCL-001542808.PDF";

  test("onBookPage", async ({ page }) => {
    await page.goto("https://taiwanebook.ncl.edu.tw/zh-tw/book/NCL-001542808");

    await expect(page.locator(`id=${p1}`)).toHaveText(
      "下載電子書 NCL-001542808.PDF"
    );
  });

  test("onBookReaderPage", async ({ page }) => {
    await page.goto(
      "https://taiwanebook.ncl.edu.tw/zh-tw/book/NCL-001542808/reader"
    );

    await expect(page.locator(`id=${p1}`)).toHaveText(
      "下載電子書 NCL-001542808.PDF"
    );
  });

  test("onSearchPage", async ({ page }) => {
    await page.goto(
      "https://taiwanebook.ncl.edu.tw/zh-tw/search/all/%22NCL-001542808%22/all/asc/grid/1"
    );

    await expect(page.locator(`id=${p1}`)).toHaveText(
      "下載電子書 NCL-001542808.PDF"
    );
  });
});
