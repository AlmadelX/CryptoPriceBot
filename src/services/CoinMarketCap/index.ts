// import {
//     CryptoCurrencyAmbiguousError,
//     CryptoCurrencyNotFoundError,
//     CryptoCurrencyPriceNotFoundError
// } from './CoinMarketCapError';
// import { ICryptoCurrency, ICryptoCurrencyQuote } from './interfaces';
// import { getCryptocurrenciesListFromAPI } from './api';

// function getCurrencyBySymbol(currencies: ICryptoCurrency[], query: string): ICryptoCurrency | null {
//     const normalizedQuery = query.trim().toLocaleUpperCase();

//     const searchResult = currencies.find(currency => currency.symbol === normalizedQuery);

//     return searchResult ?? null;
// }

// function getCurrencyByName(currencies: ICryptoCurrency[], query: string): ICryptoCurrency | null {
//     // Replace all space symbols with just a single space.
//     const normalizedQuery = query.toLocaleLowerCase().replace(/\s+/g, ' ').trim();

//     const searchResult = currencies.find(currency => {
//         const normalizedName = currency.name.toLocaleLowerCase();

//         return normalizedName === normalizedQuery;
//     });

//     return searchResult ?? null;
// }

// function getCurrencyQuoteByName(currency: ICryptoCurrency, query: string): ICryptoCurrencyQuote | null {
//     const searchResult = currency.quotes.find(quote => quote.name === query);

//     return searchResult ?? null;
// }

// async function getCryptocurrencyID(query: string): Promise<number> {
//     const searchResponse = await api.postGlobalSearch(query);
//     const searchSuggestions = await getSearchSuggestionsFromAPI(query);
//     if (searchSuggestions.length === 2 && searchSuggestions[0].symbol === searchSuggestions[1].symbol) {
//         throw new CryptoCurrencyAmbiguousError();
//     }

//     const searchResult = searchSuggestions[0];
// }

export default async function getPriceOfCryptocurrency(query: string): Promise<number> {
    // const id = await getCryptocurrencyID(query);
    // const currency = await getCryptocurrencyByID(id);

    // const quote = getCurrencyQuoteByName(currency, 'USD');
    // const price = roundPrice(quote.price);
    query;

    return 123;
}
