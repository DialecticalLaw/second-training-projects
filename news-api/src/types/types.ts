export interface Article {
    readonly source: {
        id: string;
        name: string;
    };
    readonly author: string;
    readonly title: string;
    readonly description: string;
    readonly url: string;
    readonly urlToImage: string;
    readonly publishedAt: string;
    readonly content: string;
}

export interface ResponseNews {
    readonly status: string;
    readonly totalResults: number;
    readonly articles: Article[];
}

export interface ResponseSources {
    status: string;
    sources: Source[];
}

export interface Source {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly url: string;
    readonly category: string;
    readonly language: string;
    readonly country: string;
}

export type UrlOptions = {
    [sourceId: string]: string | undefined;
    apiKey: string;
};

export type CallbackSources<Data> = (data: Data) => void;
