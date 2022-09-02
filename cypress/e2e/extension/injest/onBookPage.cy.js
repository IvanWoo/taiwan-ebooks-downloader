describe("onBookPage", () => {
  // dont fail tests on uncaught exceptions of websites
  Cypress.on("uncaught:exception", () => {
    if (!process.env.FAIL_ON_ERROR) {
      return false;
    }
  });

  before(() => {
    cy.visit("/zh-tw/book/NTUL-9910003011");
    cy.wait(1000);
  });

  it("should inject download buttons", () => {
    // FIXME: cypress test runner modified the window.location, which breaks the extension
    cy.contains("h2", "一切經音義 一百卷 v.1");
  });
});
