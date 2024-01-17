import { getData } from './helper';

const COCKTAILS_URL = 'https://api.punkapi.com/v2/beers';
const MAX_RESULTS = 10;

export interface Beer {
    id: number;
    name: string;
}

export interface BeerFull {
    id: number;
    name: string;
    image_url: string;
    description: string;
}

export const getBeersByName = async (name: string) => {
    return getData(`${COCKTAILS_URL}?beer_name=${name}&per_page=${MAX_RESULTS}`);
};

export const getBeerById = async (id: String) => {
    return getData(`${COCKTAILS_URL}?ids=${id}&per_page=1`);
};
