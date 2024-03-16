import { LocalStorageData } from '../../interfaces';

export default class LocalStorageService {
  public static saveStringData<T extends keyof Pick<LocalStorageData, 'name' | 'surname'>>(
    key: T,
    data: string
  ): void {
    const JsonLocalStorage = localStorage.getItem('dialecticallaw-rss-puzzle') as string;
    const parsedLocalStorage: LocalStorageData = JSON.parse(JsonLocalStorage);
    parsedLocalStorage[key] = data;
    localStorage.setItem('dialecticallaw-rss-puzzle', JSON.stringify(parsedLocalStorage));
  }

  public static saveBooleanData<T extends keyof Omit<LocalStorageData, 'name' | 'surname'>>(
    key: T,
    data: boolean
  ): void {
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
    const JsonLocalStorage: string | null = localStorage.getItem('dialecticallaw-rss-puzzle');
    if (!JsonLocalStorage) return false;
    const parsedLocalStorage: LocalStorageData = JSON.parse(JsonLocalStorage);
    return parsedLocalStorage.isLogin;
  }

  public static initLocalStorage(): void {
    localStorage.setItem('dialecticallaw-rss-puzzle', JSON.stringify({ isLogin: false }));
    LocalStorageService.saveBooleanData('translateHint', true);
    LocalStorageService.saveBooleanData('audioHint', true);
    LocalStorageService.saveBooleanData('backgroundHint', true);
  }

  public static clearUserData(): void {
    localStorage.clear();
    LocalStorageService.initLocalStorage();
  }
}
