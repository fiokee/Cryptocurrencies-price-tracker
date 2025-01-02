
## Cryptocurrency Price Tracker

This project is a React-based cryptocurrency tracker that displays real-time data about various cryptocurrencies, including their prices, market capitalization, and percentage changes over different time periods. It features a search functionality to filter cryptocurrencies by name or symbol.

## Features
- Live Cryptocurrency Data: Fetches real-time data from the CoinGecko API.

- Search Functionality: Allows users to search for specific cryptocurrencies by name or symbol.

- Responsive Design: Built with Tailwind CSS to ensure a responsive and visually appealing layout.

- Auto-Refresh: Refreshes data every minute to provide up-to-date information.

- User-friendly Table: Displays key information in a clean and interactive table format.

## Prerequisites
Before running the project, ensure you have the following:

- Node.js installed on your system.

- An API URL provided by CoinGecko. This should be set in your environment variables.

## Installation
1. Clone this repository:
git clone https://github.com/fiokee/Cryptocurrencies-price-tracker.git

2. Navigate into the project directory:
cd mycrypto-price

3. Install dependencies:
npm install

4. Set up the environment variable:

- Create a .env.local file in the root directory.

## Running the Project
1. Start the development server:
npm run dev

2. Open your browser and navigate to:
http://localhost:3000

## Code Overview

Components

- CryptoList: The main component that:

- Fetches cryptocurrency data.

- Displays it in a searchable and sortable table.

- Refreshes data every minute.

Key Functions

1. useEffect:

- Fetches data when the component mounts and sets up an interval to refresh data every minute.

2. axios.get:

- Fetches cryptocurrency data from the CoinGecko API.

3. setInterval:

- Ensures the data is periodically updated.

4. filterData:

- Filters the list of cryptocurrencies based on the user's search query.

5. Utility Functions:

- formatNumber: Formats large numbers into readable formats (e.g., million, billion).

- formatPercent: Formats percentage changes and handles null values.



