import axios, { AxiosResponse } from 'axios';

import { ICryptoCurrency, IResponseBody } from './interfaces';
import { GetResponseFromAPIError } from './CoinMarketCapError';
import { validateResponseBody } from './validation';

const API_ENDPOINT = 'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing';

async function searchCryptocurrencyViaAPI(query: string) {
    return axios.post('https://api.coinmarketcap.com/gravity/v4/gravity/global-search', {
        keyword: query,
        limit: 2,
        scene: 'community',
    });
}

async function getResponseFromAPI(): Promise<AxiosResponse<IResponseBody>> {
    const res = await searchCryptocurrencyViaAPI('lskdnflsdf');
    console.log(res.data.data.suggestions[1].tokens);

    return axios.get(API_ENDPOINT).catch(error => {
        throw new GetResponseFromAPIError(API_ENDPOINT, error);
    });
}

export async function getCryptocurrenciesListFromAPI(): Promise<ICryptoCurrency[]> {
    const response = await getResponseFromAPI();

    const responseBody = response.data;
    validateResponseBody(responseBody);

    return responseBody.data.cryptoCurrencyList;
}
