let exchangeRates = {};
let currencyList = [];

const currencyOneEl = document.getElementById('currency-one');
const amountOneEl = document.getElementById('amount-one');
const currencyTwoEl = document.getElementById('currency-two');
const amountTwoEl = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const refreshBtn = document.getElementById('refresh');

async function fetchExchangeRates() {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest');
    const data = await response.json();
    console.log('API Response:', data);

    if (data && data.result === 'success') {
      exchangeRates = data.rates;
      rateEl.textContent = 'Exchange rates updated.';
      calculateExchange();
    } else {
      throw new Error('Failed to fetch exchange rates.');
    }
  } catch (error) {
    rateEl.textContent = 'Failed to fetch exchange rates.';
    console.error('Error fetching exchange rates:', error);
  }
}

function populateSelectElements() {
  // Save the current selections
  const selectedCurrencyOne = currencyOneEl.value;
  const selectedCurrencyTwo = currencyTwoEl.value;

  // Clear existing options
  currencyOneEl.innerHTML = '';
  currencyTwoEl.innerHTML = '';

  // Populate dropdowns with all available currencies
  currencyList.forEach(currency => {
    const optionOne = document.createElement('option');
    optionOne.value = currency;
    optionOne.textContent = currency;
    currencyOneEl.appendChild(optionOne);

    const optionTwo = document.createElement('option');
    optionTwo.value = currency;
    optionTwo.textContent = currency;
    currencyTwoEl.appendChild(optionTwo);
  });

  // Restore previous selections if available
  if (currencyList.includes(selectedCurrencyOne)) {
    currencyOneEl.value = selectedCurrencyOne;
  }
  if (currencyList.includes(selectedCurrencyTwo)) {
    currencyTwoEl.value = selectedCurrencyTwo;
  }
}

function calculateExchange() {
  const baseCurrency = currencyOneEl.value;
  const targetCurrency = currencyTwoEl.value;
  const amountOne = parseFloat(amountOneEl.value) || 0;

  if (!exchangeRates[targetCurrency]) {
    rateEl.textContent = 'Exchange rates not available.';
    amountTwoEl.value = '';
    return;
  }

  const rate = exchangeRates[targetCurrency];
  rateEl.textContent = `1 ${baseCurrency} = ${rate.toFixed(4)} ${targetCurrency}`;

  const amountTwo = (amountOne * rate).toFixed(2);
  amountTwoEl.value = amountTwo;
}

function reverseCalculateExchange() {
  const baseCurrency = currencyOneEl.value;
  const targetCurrency = currencyTwoEl.value;
  const amountTwo = parseFloat(amountTwoEl.value) || 0;

  if (!exchangeRates[targetCurrency]) {
    rateEl.textContent = 'Exchange rates not available.';
    amountOneEl.value = '';
    return;
  }

  const rate = exchangeRates[targetCurrency];
  rateEl.textContent = `1 ${baseCurrency} = ${rate.toFixed(4)} ${targetCurrency}`;

  const amountOne = (amountTwo / rate).toFixed(2);
  amountOneEl.value = amountOne;
}

// Event listeners
currencyOneEl.addEventListener('change', () => {
  fetchExchangeRates();
});
currencyTwoEl.addEventListener('change', calculateExchange);
amountOneEl.addEventListener('input', calculateExchange);
amountTwoEl.addEventListener('input', reverseCalculateExchange);
refreshBtn.addEventListener('click', fetchExchangeRates);

// Initial fetch of exchange rates
fetchExchangeRates().then(() => {
  // Get list of currencies from exchangeRates keys
  currencyList = Object.keys(exchangeRates);
  // Populate currency dropdowns after fetching exchange rates
  populateSelectElements();
  // Perform initial calculation
  calculateExchange();
});