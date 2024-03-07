import { LocalStorageData } from '../../interfaces';

export default class LocalStorageService {
  public static saveData<T extends keyof LocalStorageData>(key: T, data: string): void {
    const JsonLocalStorage = localStorage.getItem('dialecticallaw-rss-puzzle') as string;
    const parsedLocalStorage: LocalStorageData = JSON.parse(JsonLocalStorage);
    parsedLocalStorage[key] = data;
    localStorage.setItem('dialecticallaw-rss-puzzle', JSON.stringify(parsedLocalStorage));
  }

  public static getData<T extends keyof LocalStorageData>(key: T) {
    const JsonLocalStorage = localStorage.getItem('dialecticallaw-rss-puzzle') as string;
    const parsedLocalStorage: LocalStorageData = JSON.parse(JsonLocalStorage);
    return parsedLocalStorage[key];
  }

  public static isLocalStorageInit(): boolean {
    return localStorage.getItem('dialecticallaw-rss-puzzle') !== null;
  }

  public static initLocalStorage(): void {
    localStorage.setItem('dialecticallaw-rss-puzzle', '{}');
  }

  public static clearUserData(): void {
    localStorage.clear();
    LocalStorageService.initLocalStorage();
  }
}
