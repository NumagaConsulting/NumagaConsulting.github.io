/**
 * an inspirational quote generator program. Every time a user runs a program, they should get a new, randomized output.
 * To make your program truly random, the message that it outputs should be made up of at least three different pieces of data.
 */
const fs = require('fs');

const http = require('http');

const quoteShuffler = {
  quote: null,
  author: null,
  genre: null,
  fullQuote: null,

  quoteGenerator() {
    // text in a format below
    // QUOTE;AUTHOR;GENRE
    // '';'';''
    const content = fs.readFileSync('./quotes.txt', 'utf-8'); // parse the text
    const cells = content.split(/\r?\n|\r/).map((element) => {
      // console.log(el.split(';'));
      return element.split(';');
    });

    const headings = cells.shift();
    // console.log(headings);

    const obj = cells.map((element) => {
      const object = {};
      element.forEach((value, key) => {
        object[headings[key]] = value;
      });
      return object;
    });

    return obj;
  },

  randomQuote(obj) {
    const randomIndex = Math.floor(Math.random() * obj.length);
    const randomObj = obj[randomIndex];
    this.quote = randomObj.QUOTE;
    this.author = randomObj.AUTHOR;
    this.genre = randomObj.GENRE;
    this.fullQuote = randomObj;
  },

  quoteByGenreOrAuthor(quoteGenre, quoteAuthor) {
    const obj = this.quoteGenerator();
    // console.log(obj);
    // obj.forEach((element) => console.log(element.GENRE));

    if (quoteGenre && quoteAuthor) {
      const quotes = obj.filter((element) => {
        return (
          element.GENRE.trim().toLowerCase() === quoteGenre.trim().toLowerCase() &&
          element.AUTHOR.trim().toLowerCase() === quoteAuthor.trim().toLowerCase()
        );
      });
      if (quotes.length) {
        return quotes;
      }
    }
    // console.log(quotes);
    if (quoteGenre) {
      const quoteByGenre = obj.filter((element) => {
        return element.GENRE.trim().toLowerCase() === quoteGenre.trim().toLowerCase();
      });
      if (quoteByGenre.length) {
        console.log(`Can't find any quote by ${quoteAuthor}. We will randomly pick one for you.`);
        return quoteByGenre;
      }
      return 'not found';
    }
    if (quoteAuthor) {
      const quoteByAuthor = obj.filter((element) => {
        return element.AUTHOR.trim().toLowerCase() === quoteAuthor.trim().toLowerCase();
      });
      if (quoteByAuthor.length) {
        // console.log(`Can't find any ${quoteGenre} quote by ${quoteAuthor}. We will randomly pick one for you.`);
        return quoteByAuthor;
      }
      return 'not found';
    }
  },

  morningQuote() {
    const quotes = this.quoteGenerator();
    const json = [];
    for (let i = 0; i < 9; i++) {
      if (quotes.length) {
        this.randomQuote(quotes);
        json.push(this.fullQuote);
      }
    }
    // console.log(obj);
    console.log('returned a quote object');
    return json;
  }
};

// const myQuote = quoteShuffler;
// const data = myQuote.morningQuote();
// console.log(data);
// console.log(myQuote);

const host = 'localhost';
const port = 8000;

const requestListener = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.writeHead(200);
  const data = JSON.stringify(quoteShuffler.morningQuote());
  res.end(data);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
