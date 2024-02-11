export interface ITokenSearchSuggestion {
    id: number;
    name: string;
    symbol: string;
}

export interface ISearchSuggestions {
    type: string;
}

export interface ITokenSearchSuggestions extends ISearchSuggestions {
    type: 'token';
    tokens: ITokenSearchSuggestion[];
}

export interface IResponseBody {
    data: {
        suggestions: ISearchSuggestions[];
    };
}
