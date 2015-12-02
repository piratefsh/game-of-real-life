export default class GameOfLife {
    constructor(canvasId, width=100, height=100, pattern){
        // canvas size
        this.size = {
            x: width,
            y: height
        }
        // frame per second of drawing
        this.fps = 12

        // create empty grid
        const rows = new Array(height); rows.fill(1)
        this.grid = rows.map((row) => {
            row = new Uint8Array(width); row.fill(1)
            return row
        })

        // size canvas and get context
        const canvas = document.getElementById(canvasId)
        canvas.width = `${width}`
        canvas.height = `${height}`

        this.context = canvas.getContext('2d')
        
        // populate board
        // load pattern if passed in
        if (pattern){
            this.load(pattern)
        }
        // else load random
        else{
            this.random()
            
        }

        // start
        this.tick()

    }

    load(pat){
        // clear canvas and draw pattern
        this.context.clearRect(0, 0, this.size.x, this.size.y)
        this.context.drawImage(pat, 0, 0)

        // get cell data from pixels
        const imageData = this.context.getImageData(0, 0, this.size.x, this.size.y)
        const data = imageData.data 

        // create grid out of pattern
        this.grid = this.grid.map((row, x) => {
            return row.map((cell, y) => {
                 const i = (x * this.size.x + y) * 4
                 return data[i+3] > 0 ? 1 : 0
            })
        })

        this.draw()
    }

    random(){
        // populate grid randomly
        this.grid = this.grid.map((row) => {
            return row.map((cell) => {
                return Math.random() > 0.75 ? 1 : 0
            })
        })
    }

    tick(){
        this.update()
        this.draw()

        // set interval of draw frame
        setTimeout(() => {
            requestAnimationFrame(() => {
                this.tick()
            })
        }, 1000 / this.fps)
    }

    update(){
        this.grid = this.grid.map((row, x) => {
            return row.map((cell, y) => {
                const n = this.neighbours(x, y) 
                // if live cell
                if (cell){
                    // if has < 2 live neighbours, die
                    if (n < 2) return 0

                    // if has 2-3 live neighbours, live
                    else if (n == 2 || n == 3) return 1

                    // if > 3 live neighbours, die
                    else if (n > 3) return 0

                }
                // if dead cell
                else {
                    // if has 3 live neighbours, becomes live
                    if (n == 3) return 1

                    // else, remain dead
                    return 0
                }
            })
        })
    }

    neighbours(x, y){
        // get number of live neighbours for cell

        let neighbours = 0
        
        const top       = x > 0
        const bottom    = x < this.grid.length - 1
        const left      = y > 0
        const right     = y < this.grid[x].length - 1

        if(top){
            neighbours = this.grid[x-1][y] ? neighbours+1 : neighbours
        }
        if(bottom){
            neighbours = this.grid[x+1][y] ? neighbours+1 : neighbours
        }
        if(left){
            neighbours = this.grid[x][y-1] ? neighbours+1 : neighbours
        }
        if(right){
            neighbours = this.grid[x][y+1] ? neighbours+1 : neighbours
        }
        if (top && left){
            neighbours = this.grid[x-1][y-1] ? neighbours+1 : neighbours
        }
        if (top && right){
            neighbours = this.grid[x-1][y+1] ? neighbours+1 : neighbours
        }
        if (bottom && left){
            neighbours = this.grid[x+1][y-1] ? neighbours+1 : neighbours
        }
        if (bottom && right){
            neighbours = this.grid[x+1][y+1] ? neighbours+1 : neighbours
        }

        return neighbours
    }


    draw(){
        const imageData = this.context.createImageData(this.size.x, this.size.y)
        const data = imageData.data

        this.grid.forEach((row, x) => {
            row.forEach((cell, y) => {
                const opacity = cell != 0 ? 255 : 0
                const i = (x * this.size.x + y) * 4
                data[i] = 0
                data[i + 1] = 0
                data[i + 2] = 255
                data[i + 3] = opacity
            })
        })

        this.context.putImageData(imageData, 0, 0)
    }
}