"use strict";

const start = async () => {
    let algoValue = Number(document.querySelector(".algo-menu").value);
    let speedValue = Number(document.querySelector(".speed-menu").value);

    if(speedValue === 0) {
        speedValue = 1;
    }
    if(algoValue === 0) {
        alert("No Algorithm Selected");
        return;
    }

    let algorithm = null;
    if(algoValue <= 6) {
        algorithm = new sortAlgorithms(speedValue);
    }
    else if(algoValue > 6 && algoValue <= 8) {
        algorithm = new gridAlgorithms(speedValue);
    }
    else {
        algorithm = new searchAlgorithms(speedValue);
    }

    if(algoValue === 1) {
        await algorithm._BubbleSort();
    }
    if(algoValue === 2) {
        await algorithm._SelectionSort();
    }
    if(algoValue === 3) {
        await algorithm._InsertionSort();
    }
    if(algoValue === 4) {
        await algorithm._MergeSort();
    }
    if(algoValue === 5) {
        await algorithm._QuickSort();
    }
    if(algoValue === 6) {
        await algorithm._HeapSort();
    }
    if(algoValue === 7) {
        await algorithm._DFS();
    }
    if(algoValue === 8) {
        await algorithm._BFS();
    }
    if(algoValue === 9) {
        await algorithm._LinearSearch();
    }
    if(algoValue === 10) {
        await algorithm._BinarySearch();
    }
};

const RenderScreen = async () => {
    let algoValue = Number(document.querySelector(".algo-menu").value);
    if(algoValue <= 6) {
        await RenderList();
    }
    else if(algoValue <= 8) {
        await RenderGrid();
        document.querySelectorAll("td").forEach(cell => cell.addEventListener("click", markBlock));
    }
    else {
        await RenderArray(false);
        if(algoValue == 10) await RenderArray(true);
    }
}

const RenderList = async () => {
    let sizeValue = Number(document.querySelector(".size-menu").value);

    if(sizeValue === 0) {
        sizeValue = 30;
    }
    await clearScreen();
    
    let list = await randomList(sizeValue);
    const arrayNode = document.querySelector(".array");
    for(const element of list)
    {
        const node = document.createElement("div");
        node.className = "cell";
        node.setAttribute("value", String(element));
        node.style.height = `${4*element}px`;
        arrayNode.appendChild(node);
    }
};

const RenderArray = async (sorted) => {
    let sizeValue = Number(document.querySelector(".size-menu").value);

    if(sizeValue === 0) {
        sizeValue = 30;
    }
    await clearScreen();

    let list = await randomList(sizeValue);
    if(sorted) list.sort((a, b) => a - b);

    const arrayNode = document.querySelector('.array');
    const Wrapper = document.createElement('div'); 
    Wrapper.className = 's-array';

    for(const element of list)
    {
        const node = document.createElement('div');
        node.className = 's-cell';
        node.innerText = element;
        Wrapper.appendChild(node);
    }
    arrayNode.appendChild(Wrapper);
}

const RenderGrid = async () => {
    await clearScreen();

    const region = document.querySelector(".array");
    const table  = document.createElement("table");
    table.className = "grid";
    const ROWSIZE = 20;
    const COLSIZE = 18;

    for(let row = 0 ; row < ROWSIZE ; ++row)
    {
        let tableRow = document.createElement("tr");
        for(let col = 0 ; col < COLSIZE ; ++col)
        {
            let tableData = document.createElement("td");
            if(row == 0 && col == 0) {
                tableData.className = "gcell src";
            }
            else if(row == ROWSIZE-1 && col == COLSIZE-1) {
                tableData.className = "gcell dest";
            }
            else {
                tableData.className = "gcell";
            }
            tableData.setAttribute("value", `${row},${col}`);
            tableRow.appendChild(tableData);
        }
        table.appendChild(tableRow);
    }
    region.appendChild(table);
};

const randomList = async (Length) => {
    let list = new Array();
    let lowerBound = 1;
    let upperBound = 100;

    for (let counter = 0; counter < Length ; ++counter) {
        let randomNumber = Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
        list.push(parseInt(randomNumber));
    }
    return list;
};

const clearScreen = async () => {
    document.querySelector(".array").innerHTML = "";
};

const response = () => {
    let Navbar = document.querySelector(".navbar");
    if(Navbar.className === "navbar") {
        Navbar.className += " responsive";
    }
    else {
        Navbar.className = "navbar";
    }
};

document.querySelector(".icon").addEventListener("click", response);

document.querySelector(".start").addEventListener("click", start);

document.querySelector(".size-menu").addEventListener("change", RenderScreen);

document.querySelector(".algo-menu").addEventListener("change", RenderScreen);

window.onload = RenderScreen;