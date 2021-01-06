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

// example with fetch API
fetch('https://quotes.legionnaire.world/') // change to http://localhost:5000 to run locally
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Work with JSON data here
    // console.log(data);
    data.forEach((quotes) => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = quotes.GENRE.toUpperCase();

      const p = document.createElement('p');
      //   quotes.QUOTE = quotes.QUOTE.substring(0, 300);
      p.textContent = `" ${quotes.QUOTE} " by ${quotes.AUTHOR}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  })
  .catch((err) => {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Ouupooos, it's not working!`;
    app.appendChild(errorMessage);
  });

// example with XHR

// const request = new XMLHttpRequest();
// request.open('GET', 'http://localhost:8000/', true);
// request.onload = function () {
//   // Begin accessing JSON data here
//   const data = JSON.parse(this.response);
//   if (request.status >= 200 && request.status < 400) {
//     data.forEach((quotes) => {
//       const card = document.createElement('div');
//       card.setAttribute('class', 'card');

//       const h1 = document.createElement('h1');
//       h1.textContent = quotes.GENRE.toUpperCase();

//       const p = document.createElement('p');
//       //   quotes.QUOTE = quotes.QUOTE.substring(0, 300);
//       p.textContent = `"${quotes.QUOTE}>" by ${quotes.AUTHOR}`;

//       container.appendChild(card);
//       card.appendChild(h1);
//       card.appendChild(p);
//     });
//   } else {
//     const errorMessage = document.createElement('marquee');
//     errorMessage.textContent = `Gah, it's not working!`;
//     app.appendChild(errorMessage);
//   }
// };

// request.send();
