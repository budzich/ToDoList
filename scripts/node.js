export class Node {
    #note
    #star
    #del
    #complete
    #wrap
    #nowrap
    #change
    #divInWrap
    #text
    #h3
    #p
    #date
    #changeBlock = document.getElementsByClassName('create-change')[0];
    #changeText = document.getElementsByClassName('create-change-text')[0];
    #changeButton = document.getElementsByClassName('create-change-text-button')[0];
    #list = document.getElementsByClassName('list')[0];

    constructor(string, date, favorite, complete) {
        this.#note = document.createElement('div');
        this.#note.className = 'note';

        if (favorite) {
            this.#note.classList.add('favorite');
        }

        if (complete) {
            this.#note.classList.add('complete');
        }

        this.#nowrap = document.createElement('div');
        this.#nowrap.className = 'nowrap';

        this.#wrap = document.createElement('div');
        this.#wrap.className = 'wrap';

        this.#p = document.createElement('p');
        this.#p.className = 'date';

        this.#star = document.createElement('div');
        this.#star.className = 'star';
        this.#star.onclick = () => {
            if (this.#note.classList.contains('favorite')) {
                this.#note.classList.remove('favorite');
                localStorage[this.#date] = `0${localStorage[this.#date][1]}${this.#h3.textContent}`;
            } else {
                this.#note.classList.add('favorite');
                localStorage[this.#date] = `1${localStorage[this.#date][1]}${this.#h3.textContent}`;
            }
        }

        this.#del = document.createElement('div');
        this.#del.className = 'delete';
        this.#del.onclick = () => {
            this.#note.remove();
            localStorage.removeItem(this.#date);

            delete this;
        }

        this.#complete = document.createElement('div');
        this.#complete.className = 'ok';
        this.#complete.onclick = () => {
            if (this.#note.classList.contains('complete')) {
                this.#note.classList.remove('complete');
                localStorage[this.#date] = `${localStorage[this.#date][0]}0${this.#h3.textContent}`;
            } else {
                this.#note.classList.add('complete');
                localStorage[this.#date] = `${localStorage[this.#date][0]}1${this.#h3.textContent}`;
            }
        }

        this.#change = document.createElement('div');
        this.#change.className = 'change';
        this.#change.onclick = () => {
            this.change();
        }

        this.#text = document.createElement('div');
        this.#divInWrap = document.createElement('div');
        this.#h3 = document.createElement('h3');
        this.#h3.textContent = string;

        if (date) {
            this.#date = new Date(date);
        } else {
            this.#date = new Date();
        }

        this.#p.textContent = this.#date.getFullYear() + '-' + ('0' + (this.#date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.#date.getDate()).slice(-2);

        this.#list.append(this.#note);

        this.#note.append(this.#wrap);
        this.#wrap.append(this.#divInWrap);
        this.#divInWrap.append(this.#star);
        this.#divInWrap.append(this.#change);
        this.#divInWrap.append(this.#del);
        this.#wrap.append(this.#text);
        this.#wrap.append(this.#p);
        this.#text.append(this.#h3);
        this.#note.append(this.#nowrap);
        this.#nowrap.append(this.#complete);

        if (!date) {
            localStorage.setItem(this.#date, `00${string}`);
        }
    }

    change() {
        this.#changeBlock.classList.remove('hidden');
        this.#changeText.value = this.#h3.textContent;
        this.#changeText.focus();
        this.#changeButton.onclick = () => {
            if (this.#changeText.value !== '') {
                this.#h3.textContent = this.#changeText.value;
                this.#changeBlock.classList.add('hidden');
                localStorage[this.#date] = `${localStorage[this.#date][0]}${localStorage[this.#date][1]}${this.#h3.textContent}`;
            } else {
                this.#changeText.focus();
            }
        }
    }

    getDate() {
        return this.#date;
    }

    getNote() {
        return this.#note;
    }

    getComplete() {
        if (+localStorage.getItem(this.#date)[1]) {
            return 1;
        } else {
            return 0;
        }
    }

    reverse(note) {
        this.#note.after(note);
    }
}