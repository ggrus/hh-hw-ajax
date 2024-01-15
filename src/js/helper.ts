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
    console.log(url);

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
