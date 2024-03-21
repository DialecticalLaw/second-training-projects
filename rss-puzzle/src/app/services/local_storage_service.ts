import { CompletedRound, CompletedRounds, LocalStorageData } from '../../interfaces';

export default class LocalStorageService {
  private storageKey: string;

  constructor() {
    this.storageKey = 'dialecticallaw-rss-puzzle';
  }

  public saveStringData<T extends keyof Pick<LocalStorageData, 'name' | 'surname'>>(
    key: T,
    data: string
  ): void {
    const JsonLocalStorage = localStorage.getItem(this.storageKey) as string;
    const parsedLocalStorage: LocalStorageData = JSON.parse(JsonLocalStorage);
    parsedLocalStorage[key] = data;
    localStorage.setItem(this.storageKey, JSON.stringify(parsedLocalStorage));
  }

  public saveBooleanData<
    T extends keyof Omit<LocalStorageData, 'name' | 'surname' | 'completedRounds' | 'lastRound'>
  >(key: T, data: boolean): void {
    const JsonLocalStorage = localStorage.getItem(this.storageKey) as string;
    const parsedLocalStorage: LocalStorageData = JSON.parse(JsonLocalStorage);
    parsedLocalStorage[key] = data;
    localStorage.setItem(this.storageKey, JSON.stringify(parsedLocalStorage));
  }

  public getData<T extends keyof LocalStorageData>(key: T) {
    const JsonLocalStorage = localStorage.getItem(this.storageKey) as string;
    const parsedLocalStorage: LocalStorageData = JSON.parse(JsonLocalStorage);
    return parsedLocalStorage[key];
  }

  public isLocalStorageInit(): boolean {
    const JsonLocalStorage: string | null = localStorage.getItem(this.storageKey);
    if (!JsonLocalStorage) return false;
    const parsedLocalStorage: LocalStorageData = JSON.parse(JsonLocalStorage);
    return parsedLocalStorage.isLogin;
  }

  public updateCompletedRounds(completedRound: CompletedRound): void {
    const JsonLocalStorage = localStorage.getItem(this.storageKey) as string;
    const parsedLocalStorage: LocalStorageData = JSON.parse(JsonLocalStorage);

    const completedRounds: CompletedRounds = parsedLocalStorage.completedRounds;
    const currentLevel: Set<number> = new Set(completedRounds[completedRound.level]);
    currentLevel.add(completedRound.round);
    completedRounds[completedRound.level] = Array.from(currentLevel);

    localStorage.setItem(this.storageKey, JSON.stringify(parsedLocalStorage));
  }

  public saveLastRound(completedRound: CompletedRound): void {
    const JsonLocalStorage = localStorage.getItem(this.storageKey) as string;
    const parsedLocalStorage: LocalStorageData = JSON.parse(JsonLocalStorage);

    parsedLocalStorage.lastRound = completedRound;
    localStorage.setItem(this.storageKey, JSON.stringify(parsedLocalStorage));
  }

  public initLocalStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify({ isLogin: false }));
    this.saveBooleanData('translateHint', true);
    this.saveBooleanData('audioHint', true);
    this.saveBooleanData('backgroundHint', true);

    const completedRounds: CompletedRounds = {
      level1: [],
      level2: [],
      level3: [],
      level4: [],
      level5: [],
      level6: []
    };

    const JsonLocalStorage = localStorage.getItem(this.storageKey) as string;
    const parsedLocalStorage: LocalStorageData = JSON.parse(JsonLocalStorage);

    parsedLocalStorage.lastRound = {
      level: 'level1',
      round: -1
    };
    parsedLocalStorage.completedRounds = completedRounds;

    localStorage.setItem(this.storageKey, JSON.stringify(parsedLocalStorage));
  }

  public clearUserData(): void {
    localStorage.clear();
    this.initLocalStorage();
  }
}
