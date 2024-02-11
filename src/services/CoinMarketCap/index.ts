// import {
//     CryptoCurrencyAmbiguousError,
//     CryptoCurrencyNotFoundError,
//     CryptoCurrencyPriceNotFoundError
// } from './CoinMarketCapError';
// import { ICryptoCurrency, ICryptoCurrencyQuote } from './interfaces';
// import { getCryptocurrenciesListFromAPI } from './api';

import { CryptoCurrencyAmbiguousError, CryptoCurrencyNotFoundError } from './CoinMarketCapError';
import { getSearchSuggestions } from './api/globalSearch';

function areNamesEqual(query: string, target: string): boolean {
    // Replace all space symbols with just a single space.
    const normalizedQuery = query.replace(/\s+/g, ' ').toLocaleLowerCase().trim();
    const normalizedTarget = target.toLocaleLowerCase();

    return normalizedQuery === normalizedTarget;
}

function areSymbolsEqual(query: string, target: string): boolean {
    const normalizedQuery = query.toLocaleUpperCase();

    return normalizedQuery === target;
}

// function getCurrencyQuoteByName(currency: ICryptoCurrency, query: string): ICryptoCurrencyQuote | null {
//     const searchResult = currency.quotes.find(quote => quote.name === query);

//     return searchResult ?? null;
// }

async function getCryptocurrencyID(query: string): Promise<number> {
    const searchSuggestions = await getSearchSuggestions(query);
    if (!searchSuggestions.length) {
        throw new CryptoCurrencyNotFoundError();
    }
    if (searchSuggestions.length == 2 && searchSuggestions[0].symbol === searchSuggestions[1].symbol) {
        throw new CryptoCurrencyAmbiguousError();
    }

    const suggestion = searchSuggestions[0];
    if (!areNamesEqual(query, suggestion.name) && !areSymbolsEqual(query, suggestion.symbol)) {
        throw new CryptoCurrencyNotFoundError();
    }

    return suggestion.id;
}

export default async function getPriceOfCryptocurrency(query: string): Promise<number> {
    const id = await getCryptocurrencyID(query);
    // const currency = await getCryptocurrencyByID(id);

    // const quote = getCurrencyQuoteByName(currency, 'USD');
    // const price = roundPrice(quote.price);

    return id;
}
