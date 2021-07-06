"use strict";

class sortAlgorithms {
    constructor(time) {
        this.list = document.querySelectorAll(".cell");
        this.size = this.list.length;
        this.time = time;
        this.help = new Helper(this.time, this.list);
    }

    // BUBBLE SORT
    _BubbleSort = async () => {
        
        for(let outPointer = 0 ; outPointer < this.size - 1 ; ++outPointer) 
        {
            for(let inPointer = 0 ; inPointer < this.size - outPointer - 1 ; ++inPointer) 
            {
                await this.help._mark(inPointer);
                await this.help._mark(inPointer+1);
                if(await this.help._compare(inPointer, inPointer+1)) {
                    await this.help._swap(inPointer, inPointer+1);
                }
                await this.help._unmark(inPointer);
                await this.help._unmark(inPointer+1);
            }
            this.list[this.size - outPointer - 1].setAttribute("class", "cell done");
        }
        this.list[0].setAttribute("class", "cell done");
    }

    // INSERTION SORT
    _InsertionSort = async () => {

        for(let outPointer = 0 ; outPointer < this.size - 1 ; ++outPointer) 
        {
            let inPointer = outPointer;
            while(inPointer >= 0 && await this.help._compare(inPointer, inPointer+1))
            {
                await this.help._mark(inPointer);
                await this.help._mark(inPointer+1);
                await this.help._pause();

                await this.help._swap(inPointer, inPointer+1);

                await this.help._unmark(inPointer);
                await this.help._unmark(inPointer+1);
                inPointer -= 1;
            }
        }
        for(let counter = 0 ; counter < this.size ; ++counter) {
            this.list[counter].setAttribute("class", "cell done");
        }
    }

    // SELECTION SORT
    _SelectionSort = async () => {

        for(let outPointer = 0 ; outPointer < this.size ; ++outPointer) 
        {
            let minIndex = outPointer;
            for(let inPointer = outPointer ; inPointer < this.size ; ++inPointer)
            {
                await this.help._markSpl(minIndex);
                await this.help._mark(inPointer);
                if(await this.help._compare(minIndex, inPointer))
                {
                    await this.help._unmark(minIndex);
                    minIndex = inPointer;
                }
                await this.help._unmark(inPointer);
                await this.help._markSpl(minIndex);
            }
            await this.help._mark(minIndex);
            await this.help._mark(outPointer);
            await this.help._pause();

            await this.help._swap(minIndex, outPointer);
            await this.help._unmark(minIndex);
            this.list[outPointer].setAttribute("class", "cell done");
        }
    }

    // MERGE SORT
    _MergeSort = async () => {
        await this._MergeDivider(0, this.size - 1);
        for(let counter = 0 ; counter < this.size ; ++counter) {
            this.list[counter].setAttribute("class", "cell done");
        }
    }

    _MergeDivider = async (start, end) => {
        if(start < end) {
            let mid = start + Math.floor((end - start)/2);
            await this._MergeDivider(start, mid);
            await this._MergeDivider(mid+1, end);
            await this._Merge(start, mid, end);
        }
    }

    _Merge = async (start, mid, end) => {
        let newList = new Array();
        let frontCounter = start;
        let midCounter = mid + 1;
        
        while(frontCounter <= mid && midCounter <= end)
        {
            let Fval = Number(this.list[frontCounter].getAttribute("value"));
            let Sval = Number(this.list[midCounter].getAttribute("value"));
            if(Fval >= Sval) {
                newList.push(Sval);
                ++midCounter;
            }
            else {
                newList.push(Fval);
                ++frontCounter;
            }
        }
        while(frontCounter <= mid)
        {
            newList.push(Number(this.list[frontCounter].getAttribute("value")));
            ++frontCounter;
        }
        while(midCounter <= end)
        {
            newList.push(Number(this.list[midCounter].getAttribute("value")));
            ++midCounter;
        }

        for(let counter = start ; counter <= end ; ++counter) {
            this.list[counter].setAttribute("class", "cell current");
        }
        for(let counter = start, point = 0 ; counter <= end && point < newList.length ; ++counter, ++point)
        {
            await this.help._pause();
            this.list[counter].setAttribute("value", newList[point]);
            this.list[counter].style.height = `${3.5*newList[point]}px`;
        }
        for(let counter = start ; counter <= end ; ++counter) {
            this.list[counter].setAttribute("class", "cell");
        }
    }

    // QUICK SORT
    _QuickSort = async () => {
        await this._QuickDivider(0, this.size-1);
        for(let counter = 0 ; counter < this.size ; ++counter) {
            this.list[counter].setAttribute("class", "cell done");
        }
    }

    _QuickDivider = async (start, end) => {
        if(start < end) {
            let pivot = await this._Partition(start, end);
            await this._QuickDivider(start, pivot-1);
            await this._QuickDivider(pivot+1, end);
        }
    }

    _Partition = async (start, end) => {
        let pivot = this.list[end].getAttribute("value");
        let prevIndex = start - 1;

        await this.help._markSpl(end);
        for(let counter = start ; counter < end ; ++counter)
        {
            let currValue = Number(this.list[counter].getAttribute("value"));
            await this.help._mark(counter);
            if(currValue < pivot)
            {
                prevIndex += 1;
                await this.help._mark(prevIndex);
                await this.help._swap(counter, prevIndex);
                await this.help._unmark(prevIndex);
            }
            await this.help._unmark(counter);
        }
        await this.help._swap(prevIndex+1, end);
        await this.help._unmark(end);
        return prevIndex + 1;
    }

    // Heap Sort
    _HeapSort = async () => {
        
        for(let counter = this.size - 1 ; counter >= 0 ; counter--)
        {
            await this.help._pause();
            await this._Heapify(this.size, counter);
        }
        for(let counter = this.size - 1 ; counter > 0 ; counter--)
        {
            await this.help._mark(counter);
            await this.help._mark(0);

            await this.help._swap(0, counter);

            await this.help._unmark(counter);
            await this.help._unmark(0);
            await this.help._pause();

            await this._Heapify(counter, 0);
        }
        for(let counter = 0 ; counter < this.size ; ++counter) {
            this.list[counter].setAttribute("class", "cell done");
        }
    }

    _Heapify = async (currLen, index) => {

        let largest = index;
        let Lchild = 2*index + 1;
        let Rchild = 2*index + 2;

        let maxValue = this.list[largest].getAttribute("value");
        let Lvalue = (Lchild < currLen) ? this.list[Lchild].getAttribute("value") : -1;
        let Rvalue = (Rchild < currLen) ? this.list[Rchild].getAttribute("value") : -1;

        if(Lvalue !== -1 && parseInt(Lvalue) > parseInt(maxValue)) {
            largest = Lchild;
            maxValue = Lvalue;
        }
        if(Rvalue !== -1 && parseInt(Rvalue) > parseInt(maxValue)) {
            largest = Rchild;
        }
        if(largest != index)
        {
            await this.help._mark(largest);
            await this.help._mark(index);

            await this.help._swap(index, largest);
            
            await this.help._unmark(largest);
            await this.help._unmark(index);
            await this.help._pause();

            await this._Heapify(currLen, largest);
        }
    }
};