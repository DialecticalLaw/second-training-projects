import {
    CallbackResponse,
    CallbackResponseArg,
    EndpointKind,
    OptionsSources,
    OptionsApiKey,
    Options,
} from '../../types/types';

class Loader {
    private baseLink: string;
    private options: OptionsApiKey;
    constructor(baseLink: string, options: OptionsApiKey) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp(
        { endpoint, options = {} }: { endpoint: EndpointKind; options?: OptionsSources },
        callback: CallbackResponse = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response | never {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: OptionsSources, endpoint: string): string {
        const urlOptions: Options = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(
        method: string,
        endpoint: EndpointKind,
        callback: CallbackResponse,
        options: OptionsSources = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response): CallbackResponseArg => res.json() as Promise<string> & CallbackResponseArg)
            .then((data: CallbackResponseArg): void => callback(data))
            .catch((err: Error): void => console.error(err));
    }
}

export default Loader;
