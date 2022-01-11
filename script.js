const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const quoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// get quotes
let apiQuotes = [];

//Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function loadingComplete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Show new quote
function newQuote() {
  loading();
  // pick random quote
  const quote = apiQuotes[getRandomInt(apiQuotes.length)];
  // check for missing author
  if (!quote.author) quote.author = "Unknown";
  // check quote length to determine styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  authorText.textContent = quote.author;
  quoteText.textContent = quote.text;
  loadingComplete();
}

// Load quotes from API or locally
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // console.log(apiQuotes);
  } catch (error) {
    console.log("falling back to locally available quotes");
    apiQuotes = localQuotes;
  }
  newQuote();
//   loadingComplete();
}

// Load on startup
getQuotes();

twitterBtn.addEventListener("click", function (event) {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, "_blank");
});

quoteBtn.addEventListener("click", newQuote);
