# Currency Exchange App

The Currency Exchange App is a web application designed to help users convert amounts between different currencies using real-time exchange rates. Here's how the app functions:

## Fetching Exchange Rates

- The app initiates by fetching the latest currency exchange rates from an API endpoint (https://open.er-api.com/v6/latest).
- Upon receiving a successful response, it stores the exchange rates in a variable for use throughout the application.
- If the fetch fails or returns an error, the app notifies the user that exchange rates are unavailable.

## Populating Currency Selectors

- After obtaining the exchange rates, the app extracts the list of available currencies.
- It dynamically populates the currency selection dropdowns (`currency-one` and `currency-two`) with these currencies.
- The user's previous selections are preserved when the currency list updates.

## Currency Conversion

### Forward Conversion (`calculateExchange`)

- When the user enters an amount in the first currency input (`amount-one`), the app calculates the equivalent amount in the second currency.
- It uses the selected currencies and the latest exchange rates to perform the calculation.
- The result is displayed in the second currency input (`amount-two`), rounded to two decimal places.

### Reverse Conversion (`reverseCalculateExchange`)

- Conversely, if the user inputs an amount in the second currency, the app calculates the equivalent amount needed in the first currency.
- This allows for flexibility in determining how much of the base currency is required to obtain a desired amount of the target currency.

## Displaying Exchange Rates

- The current exchange rate between the selected currencies is displayed to the user.
- This information updates whenever the user changes the selected currencies or refreshes the rates.
- The rate is formatted to show four decimal places for precision.

## User Interactions and Event Handling

- The app responds to various user actions through event listeners:
  - Changing the selected currencies triggers a fetch for the latest exchange rates and recalculates the conversion.
  - Inputting amounts in either currency field triggers the appropriate calculation function.
  - Clicking the **"Refresh Rates"** button manually fetches the most recent exchange rates from the API.
- These interactions ensure that users always have up-to-date information and accurate conversions.

## Error Handling

- The app includes error handling to manage scenarios where exchange rates are unavailable or the API fetch fails.
- Users are informed of issues through messages displayed on the interface, allowing them to take corrective action if necessary.

By integrating real-time data fetching with dynamic calculations and responsive user interface elements, the Currency Exchange App provides a seamless experience for converting currencies quickly and accurately.
