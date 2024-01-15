import { getBeersByName, getBeerById, BeerFull, Beer } from './api';
import { debounce, hideBlock } from './helper';
import { saveSearchsInLocalStorage, getSearchsFromLocalStorage } from './localStorageApi';

const searchbarInput = document.querySelector('#search') as HTMLInputElement;
const suggestsDiv = document.querySelector('.suggests') as HTMLDivElement;
const resultDiv = document.querySelector('.result') as HTMLDivElement;
const historyDiv = document.querySelector('.history__items') as HTMLDivElement;

const historyShow = (historyData: any) => {
    historyDiv.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        const el = historyData[i];
        const div = document.createElement('div');
        div.classList.add('history__item');
        div.innerText = el.name;
        historyDiv.append(div);
    }
};

const descriptionShow = (beerData: BeerFull) => {
    if (!resultDiv) {
        return;
    }

    resultDiv.classList.add('show');

    resultDiv.innerHTML = '';

    const beerTitle = document.createElement('h2');
    beerTitle.classList.add('result__title');
    beerTitle.innerText = beerData.name;
    resultDiv.append(beerTitle);

    const container = document.createElement('div');
    container.classList.add('result__item');

    const image = document.createElement('img');
    image.classList.add('result__image');
    image.setAttribute('src', beerData.image_url || '');
    container.append(image);

    const description = document.createElement('p');
    description.innerText = beerData.description;
    description.classList.add('result__description');
    container.append(description);

    resultDiv.append(container);
};

const getBeers = async () => {
    if (!searchbarInput || !suggestsDiv) {
        return;
    }

    if (searchbarInput.value === '') {
        hideBlock(resultDiv);
        return;
    }

    if (!suggestsDiv.classList.contains('show')) {
        suggestsDiv.classList.add('show');
    }

    suggestsDiv.innerHTML = '';
    suggestsDiv.innerText = 'Loading...';
    let beers: any = [];

    try {
        beers = await getBeersByName(searchbarInput.value);
    } catch (e) {
        suggestsDiv.innerText = 'Something went wrong :(';
        return;
    }

    suggestsDiv.innerHTML = '';

    beers.forEach((element: Beer) => {
        const div = document.createElement('div');
        div.setAttribute('data-id', element.id.toString());
        div.classList.add('suggests__item');
        div.innerText = element.name;
        suggestsDiv?.append(div);
    });

    if (beers.length === 0) {
        suggestsDiv.innerText = 'No data to display :(';
    }
};

searchbarInput.addEventListener('keyup', debounce(getBeers, 400));

suggestsDiv.addEventListener('click', async (e) => {
    const target = e.target as Element;

    if (target && target.classList.contains('suggests__item')) {
        const name = target.textContent;
        const id = target.getAttribute('data-id');

        if (!id) {
            return;
        }

        const beerData: any = await getBeerById(id);

        console.log(beerData[0]);

        descriptionShow(beerData[0]);

        const visited = getSearchsFromLocalStorage();
        const beerIndex = visited.findIndex((el: any) => el.name === name);

        console.log(beerIndex);

        if (beerIndex > -1) {
            visited.splice(beerIndex, 1);
        }

        visited.unshift({ name, id });
        historyShow(visited);
        saveSearchsInLocalStorage(visited);
    }
});

window.addEventListener('storage', () => {
    const data = getSearchsFromLocalStorage();

    historyShow(data);
});

window.addEventListener('DOMContentLoaded', () => {
    historyShow(getSearchsFromLocalStorage());
});
