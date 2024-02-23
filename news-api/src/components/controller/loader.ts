import { ResponseSources, UrlOptions, CallbackSources } from '../../types/types';

class Loader {
    baseLink: string;
    options: { apiKey: string };
    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options: { sourceId?: string } },
        callback: CallbackSources<ResponseSources> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response | never {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: { sourceId?: string }, endpoint: string): string {
        const urlOptions: UrlOptions = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(
        method: string,
        endpoint: string,
        callback: CallbackSources<ResponseSources>,
        options: { sourceId?: string } = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response): ResponseSources => res.json() as Promise<string> & ResponseSources)
            .then((data: ResponseSources): void => callback(data))
            .catch((err: Error): void => console.error(err));
    }
}

export default Loader;
