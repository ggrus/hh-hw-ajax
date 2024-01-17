import { Beer } from './api';

export const debounce = (func: unknown, delay: number) => {
    let timeout: number;
    return function (...args: unknown[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (func instanceof Function) {
                func(...args);
            }
        }, delay);
    };
};

export const getData = async (url: string): Promise<{}> => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
    });

    if (response.ok) {
        return response.json();
    }

    throw new Error('Something went wrong :(');
};

export const hideBlock = (element: HTMLElement) => {
    element.classList.remove('show');
};

export const createSuggestItems = (items: Beer[], visited = 0) => {
    const result = [] as HTMLDivElement[];

    items.forEach((item: Beer) => {
        const suggestItem = document.createElement('div');
        suggestItem.setAttribute('data-id', item.id.toString());
        suggestItem.classList.add('suggests__item');
        if (visited === 1) {
            suggestItem.classList.add('suggests__item_visited');
        }
        suggestItem.innerText = item.name;
        result.push(suggestItem);
    });

    return result;
};

export const deleteNotUniqueArrayElements = (array: Beer[]): Beer[] => {
    const tempMap = {} as Record<string, number>;
    const result = [] as Beer[];

    array.forEach((item) => {
        tempMap[item.name] = (tempMap[item.name] || 0) + 1;
    });

    array.forEach((item) => {
        if (tempMap[item.name] < 2) {
            result.push(item);
        }
    });

    return result;
};
