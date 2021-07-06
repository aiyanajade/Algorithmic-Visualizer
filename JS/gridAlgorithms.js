"use strict";

class gridAlgorithms {
    constructor(time) {
        this.grid = document.querySelectorAll(".gcell");
        this.ROW = 20;
        this.COL = 18;
        this.dx = [1, -1, 0, 0];
        this.dy = [0, 0, 1, -1];
        this.time = time;
        this.help = new Helper(this.time);

        this.visited = new Array(this.ROW);
        for(let row = 0 ; row < this.ROW ; ++row) {
            this.visited[row] = new Array(this.COL);
        }
        this._init();
    }

    // Initialising the current state of grid.
    _init = () => {
        for(let row = 0 ; row < this.ROW ; ++row) {
            for(let col = 0 ; col < this.COL ; ++col) {
                this.visited[row][col] = false;
            }
        }
        for(let inc = 0 ; inc < this.grid.length ; ++inc) 
        {
            if(this.grid[inc].getAttribute("class") == "gcell blocked")
            {
                const cell = this.grid[inc].getAttribute("value").split(",");
                this.visited[Number(cell[0])][Number(cell[1])] = true;
            }
        }
    }

    // DEPTH FIRST SEARCH
    _DFS = async () => {
        let path = [];
        await this._DFSHelper(0, 0, path);
    }

    _DFSHelper = async (x, y, path) => {
        if(x == this.ROW-1 && y == this.COL-1) {
            await this._path(path);
            throw new Error("Found!");
        }
        this.visited[x][y] = true;

        for(let itr = 0 ; itr < 4 ; ++itr)
        {
            let X = x + this.dx[itr];
            let Y = y + this.dy[itr];
            if(await this._SafeMove(X, Y))
            {
                await this.help._pause();
                await this._current(X, Y);
                
                path.push([X, Y]);
                await this._DFSHelper(X, Y, path);
                path.pop();
            }
        }
    }

    // BREADTH FIRST SEARCH
    _BFS = async () => {
        let reached = false;
        let path = [0, 0];

        let queue = new Array();
        queue.push(path);
        this.visited[0][0] = true;

        while(queue.length)
        {
            let cell = queue[0];
            queue.shift();

            if(cell[0] != 0 && cell[1] != 0) {
                await this._visited(cell[0], cell[1]);
            }

            for(let counter = 0 ; counter < this.dx.length ; ++counter)
            {
                let X = Number(this.dx[counter]) + Number(cell[0]);
                let Y = Number(this.dy[counter]) + Number(cell[1]);
                if(await this._SafeMove(X, Y))
                {
                    if(X == this.ROW-1 && Y == this.COL-1) {
                        reached = true;
                        break;
                    }
                    queue.push([X, Y]);
                    this.visited[X][Y] = true;

                    await this.help._pause();
                    await this._current(X, Y);
                }
            }
            if(reached == true) {
                break;
            }
        }
        // await this._MarkPath(p);
    }

    // Check if move is safe or not.
    _SafeMove = async (x, y) => {
        if(x >= 0 && y >= 0 && x < this.ROW && y < this.COL && this.visited[x][y] == false) {
            return true;
        }
        return false;
    }

    // Block the clicked cell.
    _block = (row, col) => {
        this.visited[row][col] = true;
    }

    // Mark the path from src to dest.
    _path = async (path) => {
        for(let cell = 0 ; cell < path.length - 1 ; ++cell)
        {
            for(let counter = 0 ; counter < this.grid.length ; ++counter) 
            {
                const index = this.grid[counter].getAttribute("value").split(",");
                const trow = Number(index[0]);
                const tcol = Number(index[1]);
                if(trow == path[cell][0] && tcol == path[cell][1])
                {
                    await this.help._pause();
                    this.grid[counter].setAttribute("class", "gcell path");
                    break;
                }
            }
        }
    }

    // Mark grid cell as visited cell.
    _visited = async (row, col) => {
        for(let counter = 0 ; counter < this.grid.length ; ++counter) 
        {
            const index = this.grid[counter].getAttribute("value").split(",");
            const trow = Number(index[0]);
            const tcol = Number(index[1]);
            if(trow == row && tcol == col)
            {
                this.grid[counter].setAttribute("class", "gcell visited");
                break;
            }
        }
    }

    // Mark grid cell as current cell.
    _current = async (row, col) => {
        for(let counter = 0 ; counter < this.grid.length ; ++counter) 
        {
            const index = this.grid[counter].getAttribute("value").split(",");
            const trow = Number(index[0]);
            const tcol = Number(index[1]);
            if(trow == row && tcol == col)
            {
                this.grid[counter].setAttribute("class", "gcell current");
                break;
            }
        }
    }
};

const markBlock = (cell) => {
    const index = cell.target.getAttribute("value").split(",");
    const row = Number(index[0]);
    const col = Number(index[1]);

    if((row == 0 && col == 0) || (row == 19 && col == 17)) {
        alert("This action can't be performed");
        return;
    }
    
    const mainAlgo = new gridAlgorithms();
    mainAlgo._block(row, col);

    cell.target.setAttribute("class", "gcell blocked");
}