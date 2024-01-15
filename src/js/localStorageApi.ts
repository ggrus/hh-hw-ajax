const LAST_SEARCHS_KEY = 'visited';

const saveInLocalStorage = (key: string, data: unknown[]): void => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        localStorage.removeItem(key);
    }
};

const getFromLocalStorage = (key: string) => {
    const storageData = localStorage.getItem(key);
    if (storageData !== null) {
        try {
            const data = JSON.parse(storageData) as unknown[];
            return data;
        } catch (error) {
            return [];
        }
    }
    return [];
};

export const saveSearchsInLocalStorage = (data: unknown[]): void => {
    saveInLocalStorage(LAST_SEARCHS_KEY, data);
};

export const getSearchsFromLocalStorage = (): any => {
    return getFromLocalStorage(LAST_SEARCHS_KEY);
};
