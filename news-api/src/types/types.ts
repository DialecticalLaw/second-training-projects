export interface ArticleSource {
    readonly id: string;
    readonly name: string;
}

export interface Article {
    readonly source: ArticleSource;
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
    readonly status: string;
    readonly sources: Source[];
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

export type CallbackResponseArg = ResponseNews | ResponseSources;

export type CallbackResponse = (data: CallbackResponseArg) => void;

export enum EndpointKind {
    Everything = 'everything',
    Sources = 'sources',
}

export enum CallbackResponseArgKeys {
    TotalResults = 'totalResults',
    Sources = 'sources',
}

export type SourceMainInfo = Pick<Source, 'id' | 'name'>;

export interface OptionsSources {
    sources?: string;
}

export interface OptionsApiKey {
    apiKey: string;
}

interface stringKeysTemplate {
    [key: string]: string | undefined;
}

export type Options = OptionsApiKey & OptionsSources & stringKeysTemplate;
