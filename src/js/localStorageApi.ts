import { Beer } from './api';

const LAST_SEARCHS_KEY = 'visited';
const MAX_VISITED_SEARCHS = 5;

const isStorageAvailable = () => {
    let storage;
    const type = 'localStorage';

    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            (e.code === 22 ||
                e.code === 1014 ||
                e.name === 'QuotaExceededError' ||
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            storage &&
            storage.length !== 0
        );
    }
};

const saveInLocalStorage = (key: string, data: unknown[]): void => {
    if (!isStorageAvailable()) {
        return;
    }

    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        localStorage.removeItem(key);
    }
};

const getFromLocalStorage = (key: string) => {
    if (!isStorageAvailable()) {
        return [];
    }

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

export const getVisitedSearchsFromLocalStorage = (searchString: string): any => {
    if (!isStorageAvailable()) {
        return [];
    }

    const beers = getFromLocalStorage(LAST_SEARCHS_KEY) as Beer[];
    const result = [];

    for (let i = 0; i < beers.length; i++) {
        const element = beers[i] as Beer;

        if (element.name.toLowerCase().search(searchString.toLowerCase()) > -1) {
            result.push(element);
            if (result.length >= MAX_VISITED_SEARCHS) {
                return result;
            }
        }
    }

    return result;
};
