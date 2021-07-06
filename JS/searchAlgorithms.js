"use strict";

class searchAlgorithms {
    constructor(time) {
        this.list = document.querySelectorAll(".s-cell");
        this.size = this.list.length;
        this.time = time;
        this.help = new Helper(this.time, this.list);
        this.queryValue = Number(document.querySelector('.input').value);
    }

    // Linear Search
    _LinearSearch = async () => {
        
        for(let index = 0 ; index < this.size ; ++index)
        {
            await this.help._pause();
            this._current(index);

            let nodeValue = Number(this.list[index].innerHTML);
            if(nodeValue === this.queryValue) {
                this._mark(index);
                break;
            }
            else {
                await this.help._pause();
                this._visited(index);
            }
        }
    }

    // Binary Search
    _BinarySearch = async () => {

        let start = 0, end = this.size - 1;
        while(start <= end)
        {
            let center = start + Math.floor((end - start)/2);
            let midValue = Number(this.list[center].innerText);
            
            await this.help._pause();
            this._current(center);
            
            if(midValue === this.queryValue)
            {
                this._mark(center);
                return;
            }
            await this.help._pause();

            if(midValue > this.queryValue) {
                this._markRest(center, end);
                end = center - 1;
            }
            else {
                this._markRest(start, center);
                start = center + 1;
            }
        }
    }

    _markRest = (start, end) => {
        for(let index = start ; index <= end ; ++index) {
            this._visited(index);
        }
    }

    _mark = (index) => {
        this.list[index].setAttribute('class', 's-cell done');
    }

    _current = (index) => {
        this.list[index].setAttribute('class', 's-cell current');
    }

    _visited = (index) => {
        this.list[index].setAttribute('class', 's-cell visited');
    }
};