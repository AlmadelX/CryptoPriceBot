import axios, { AxiosResponse } from 'axios';

import { ICryptoCurrency, IResponseBody } from './interfaces';
import { GetResponseFromAPIError } from './CoinMarketCapError';
import { validateResponseBody } from './validation';

const API_ENDPOINT = 'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing';

async function getResponseFromAPI(): Promise<AxiosResponse<IResponseBody>> {
    return axios.get(API_ENDPOINT).catch(error => {
        throw new GetResponseFromAPIError(error);
    });
}

export async function getCryptocurrenciesListFromAPI(): Promise<ICryptoCurrency[]> {
    const response = await getResponseFromAPI();

    const responseBody = response.data;
    validateResponseBody(responseBody);

    return responseBody.data.cryptoCurrencyList;
}
