const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const tweetBtn = document.getElementById("tweet");
const newQuoteBtn = document.getElementById("new-quote");
const spinner = document.getElementById("loader");
let apiQuote = [];

// spinner functions
const showSpinner = () => {
  spinner.hidden = false;
  quoteContainer.hidden = true;
};

const hideSpinner = () => {
  if (!spinner.hidden) {
    spinner.hidden = true;
    quoteContainer.hidden = false;
  }
};

// new quote function
const newQuote = () => {
  showSpinner();
  //pick new random quote from apiQuote array
  const randomQuote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
  console.log(randomQuote);

  //  check if author field is blank and replace with it unknown
  if (!randomQuote.author) {
    authorText.textContent = "unknown";
  } else {
    authorText.textContent = randomQuote.author;
  }
  // check quote length to determine style
  if (randomQuote.text > 70) {
    authorText.classList.add("long-text");
  } else {
    authorText.classList.remove("long-text");
  }

  quoteText.textContent = randomQuote.text;
  hideSpinner();
};

const getQuoteByApi = async () => {
  showSpinner();
  try {
    const response = await fetch("https://type.fit/api/quotes");
    apiQuote = await response.json();
    newQuote();
    console.log(apiQuote);
  } catch (error) {
    alert(`opps: ${error.message}`);
  }
};

const tweet = () => {
  const url = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(url, "_blank");
};

// Eventlistener
tweetBtn.addEventListener("click", tweet);
newQuoteBtn.addEventListener("click", newQuote);

getQuoteByApi();
