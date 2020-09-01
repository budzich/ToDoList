import {Node} from './node.js';

export class List {
    #string;
    #date
    #list = [];
    #sortList = [];
    #localStorage = {};
    #sort = document.getElementsByClassName('select')[0].value;
    #favoriteSort = document.getElementsByClassName('favorite-sort')[0];
    #createBlock = document.getElementsByClassName('create')[0];
    #createText = document.getElementsByClassName('create-text')[0];
    #createButton = document.getElementsByClassName('create-text-button')[0];

    constructor() {
        if (!localStorage.hasOwnProperty('main')) {
            localStorage.setItem('main', JSON.stringify(this.#localStorage));
        }

        this.#localStorage = JSON.parse(localStorage.getItem('main'));
        for (let date in this.#localStorage) {
            this.#date = date;
            this.#list.push(new Node(
                this.#localStorage[this.#date].slice(2),
                this.#date,
                +this.#localStorage[this.#date][0],
                +this.#localStorage[this.#date][1]
            ));
        }

        this.sort();

        let arr;

        arr = document.getElementsByClassName('ok');
        [...arr].forEach(x => x.addEventListener("click", () => {
            this.sort();
        }));

        this.#favoriteSort.onclick = () => {
            if (this.#favoriteSort.classList.contains('yes')) {
                this.#favoriteSort.classList.remove('yes');
                document.getElementsByClassName('list')[0].classList.remove('only-favorite')
            } else {
                this.#favoriteSort.classList.add('yes');
                document.getElementsByClassName('list')[0].classList.add('only-favorite')
            }
        }

        document.getElementsByClassName('select')[0].onclick = () => {
            if (this.#sort !== document.getElementsByClassName('select')[0].value) {
                this.sort();
            }
        }

        document.getElementsByClassName('plus')[1].onclick = () => {
            this.create();

            if (this.#favoriteSort.classList.contains('yes')) {
                this.#favoriteSort.classList.remove('yes');
                document.getElementsByClassName('list')[0].classList.remove('only-favorite')
            }
        }
    }

    create() {
        this.#createBlock.classList.remove('hidden');
        this.#createText.value = '';
        this.#createText.focus();
        this.#createButton.onclick = () => {
            if (this.#createText.value !== '') {
                this.#string = this.#createText.value;
                this.#createBlock.classList.add('hidden');
                this.#list.push(new Node(this.#string));
                let arr;
                arr = document.getElementsByClassName('ok');
                [...arr].forEach(x => x.addEventListener("click", () => {
                    this.sort();
                }));
            } else {
                this.#createText.focus();
            }
        }
    }

    sort() {
        this.#sort = document.getElementsByClassName('select')[0].value;

        this.#sortList = this.#list.filter(x => x.getNote() !== null);

        switch (this.#sort) {
            case 'old':
                this.#sortList.sort((b, a) => this.dateSort(a, b));
                break;
            case 'new':
                this.#sortList.sort((a, b) => this.dateSort(a, b));
                break;
            case 'complete':
                this.#sortList.sort((a, b) => this.completeSort(a, b));
                break;
            default:
                this.#sortList.sort((b, a) => this.completeSort(a, b));
        }

        for (let j = 1; j < this.#sortList.length; j++) {
            for (let i = 1; i < this.#sortList.length; i++) {
                this.#sortList[i].reverse(this.#sortList[i - 1].getNote());
            }
        }
    }

    dateSort(a, b) {
        return a.getDate() - b.getDate();
    }

    completeSort(a, b) {
        return a.getComplete() - b.getComplete();
    }
}