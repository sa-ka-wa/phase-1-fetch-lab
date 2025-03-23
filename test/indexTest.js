require("./helpers.js");

const sinon = require("sinon");
const helpers = require("./helpers");
const chai = require("chai");
const spies = require("chai-spies");

chai.use(spies);

const fetchBooks = () => {
  return fetch("https://anapioficeandfire.com/api/books")
    .then((resp) => resp.json())
    .then((json) => renderBooks(json));
};

const renderBooks = (json) => {
  const main = document.querySelector("main");
  json.forEach((book) => {
    let h2 = document.createElement("h2");
    h2.innerText = book.name;
    main.appendChild(h2);
  });
};

describe("index.js", () => {
  describe("fetchBooks()", () => {
    beforeEach(() => {
      window.document.body.innerHTML = "<main></main>";
      window.fetch = require("node-fetch");
    });

    it("sends a fetch request to 'https://anapioficeandfire.com/api/books'", async () => {
      chai.spy.on(window, "fetch");
      await fetchBooks();
      expect(
        window.fetch,
        "A fetch to the API was not found"
      ).to.have.been.called.with("https://anapioficeandfire.com/api/books");
    });

    it("renders book titles into the DOM by passing a JSON object to renderBooks()", async () => {
      chai.spy.on(window, "renderBooks");
      await fetchBooks().then(() => {
        expect(window.renderBooks).to.have.been.called();
      });
    });
  });
});
