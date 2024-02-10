class CoinMarketCapError extends Error {
    public readonly originalError?: Error;

    constructor(message: string, originalError?: Error) {
        super(message);

        this.originalError = originalError;
    }
}

export class GetResponseFromAPIError extends CoinMarketCapError {
    constructor(originalError: Error) {
        super('Failed to get response from CoinMarketCap', originalError);
    }
}

export class ResponseBodyValidationError extends CoinMarketCapError {
    constructor(validationErrorMessage: string) {
        super(`Response body validation error: ${validationErrorMessage}`);
    }
}

export class CryptoCurrencyNotFoundError extends CoinMarketCapError {
    constructor() {
        super('Cryptocurrency is not found on CoinMarketCap');
    }
}

export class CryptoCurrencyPriceNotFoundError extends CoinMarketCapError {
    constructor() {
        super('Cryptocurrency price is not found on CoinMarketCap');
    }
}
