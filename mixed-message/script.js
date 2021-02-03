const app = document.getElementById('root');

const h1 = document.createElement('h1');
h1.textContent = 'Quote of the day';

const logo = document.createElement('img');
logo.src = './img/logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(h1);
app.appendChild(logo);
app.appendChild(container);

const fetchQuote = async () => {
  try {
    const req = await fetch('https://quote.numaga.fr/api/quotes');
    const jsonReq = await req.json();
    const data = await jsonReq.qutoes.content;
    data.forEach((quote) => {
      const { quote, author, tag } = quote;
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = tag.toUpperCase();

      const p = document.createElement('p');
      //   quotes.QUOTE = quotes.QUOTE.substring(0, 300);
      p.textContent = `" ${quote} " by ${author}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } catch (err) {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Ouupooos, it's not working!`;
    app.appendChild(errorMessage);
    console.error(err);
  }
};

window.addEventListener('load', fetchQuote);
