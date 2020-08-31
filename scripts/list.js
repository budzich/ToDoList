import {Node} from './node.js';

export class List {
    #string;
    #date
    #list = [];
    #sort = document.getElementsByClassName('select')[0].value;
    #favoriteSort = document.getElementsByClassName('favorite-sort')[0];
    #createBlock = document.getElementsByClassName('create')[0];
    #createText = document.getElementsByClassName('create-text')[0];
    #createButton = document.getElementsByClassName('create-text-button')[0];

    constructor() {
        for (let i = 0; i < localStorage.length; i++) {
            this.#date = localStorage.key(i);

            this.#list.push(new Node(localStorage.getItem(this.#date).slice(2), this.#date, +localStorage.getItem(this.#date)[0], +localStorage.getItem(this.#date)[1]));
        }

        this.sort();

        setTimeout(() => {
            let arr = document.getElementsByClassName('ok');
            [...arr].forEach(x => x.addEventListener("click", () => {
                this.sort();
            }))
        }, 0);

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
                setTimeout(() => {
                    let arr = document.getElementsByClassName('ok');
                    [...arr].forEach(x => x.addEventListener("click", () => {
                        this.sort();
                    }))
                }, 0);
                return this.#list.push(new Node(this.#string));
            } else {
                this.#createText.focus();
            }
        }
    }

    sort() {
        this.#sort = document.getElementsByClassName('select')[0].value;

        for (let i = 0; i < this.#list.length; i++) {
            if (!this.#list[i]) {
                this.#list.splice(i, 1);
            }
        }

        switch (this.#sort) {
            case 'old':
                this.#list.sort((a, b) => b.getDate() - a.getDate());

                break;
            case 'new':
                this.#list.sort((a, b) => a.getDate() - b.getDate());

                break;

            case 'complete':
                this.#list.sort((a, b) => a.getComplete() - b.getComplete());

                break;
            case 'no-complete':
                this.#list.sort((a, b) => b.getComplete() - a.getComplete());
        }

        for (let j = 1; j < this.#list.length; j++) {
            for (let i = 1; i < this.#list.length; i++) {
                this.#list[i].reverse(this.#list[i - 1].getNote());
            }
        }
    }
}