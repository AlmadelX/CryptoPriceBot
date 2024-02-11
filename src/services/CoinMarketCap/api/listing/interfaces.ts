export interface ICryptoCurrencyQuote {
    name: string;
    price: number;
}

export interface ICryptoCurrency {
    id: number;
    name: string;
    symbol: string;
    quotes: ICryptoCurrencyQuote[];
}

export interface IResponseBody {
    data: {
        cryptoCurrencyList: ICryptoCurrency[];
    };
}
