"use strict";

class Helper {
    constructor(time, list = []) {
        this.time = parseInt(400/time);
        this.list = list;
    }

    _mark = async (index) => {
        this.list[index].setAttribute("class", "cell current");
    }

    _markSpl = async (index) => {
        this.list[index].setAttribute("class", "cell min");
    }

    _unmark = async (index) => {
        this.list[index].setAttribute("class", "cell");
    }
    
    _pause = async() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, this.time);
        });
    }

    _compare = async (index1, index2) => {
        await this._pause();

        let value1 = Number(this.list[index1].getAttribute("value"));
        let value2 = Number(this.list[index2].getAttribute("value"));
        if(value1 > value2) {
            return true;
        }
        return false;
    }

    _swap = async (index1, index2) => {
        await this._pause();

        let value1 = this.list[index1].getAttribute("value");
        let value2 = this.list[index2].getAttribute("value");
        
        this.list[index1].setAttribute("value", value2);
        this.list[index1].style.height = `${4*value2}px`;
        this.list[index2].setAttribute("value", value1);
        this.list[index2].style.height = `${4*value1}px`;
    }
};