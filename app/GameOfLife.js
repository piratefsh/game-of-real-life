export default class GameOfLife {
    constructor(canvasId, width, height){
        this.size = {
            x: width,
            y: height
        }

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
        
        // frame per second of drawing
        this.fps = 2

        this.random()
        this.tick()
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
        // for(let x = 0; x < this.grid.length; x++){
        //     for(let y = 0; y < this.grid[x].length; y++){
        //         // get num of neighbours

        //         // if live cell
        //             // if has < 2 live neighbours, die

        //             // if has 2-3 live neighbours, live

        //             // if > 3 live neighbours, die

        //         // if dead cell
        //             // if has 3 live neighbours, becomes live
        //     }
        // }
        const res = this.grid.map((row, x) => {
            return row.map((cell, y) => {
                const n = this.neighbours(x, y) 
                if (cell){
                    if (n < 2) return 0
                    if (n == 2 || n == 3) return 1
                    return 0

                }
                else {
                    if (n > 3) return 1
                    return 0
                }
            })
        })

        this.grid = res

    }

    neighbours(x, y){
        let neighbours = 0
        // get neighbours of cell
        const top = x > 0
        const bottom = x < this.grid.length - 1
        const left = y > 0
        const right = y < this.grid[x].length - 1

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
            neighbours = this.grid[x+1][y+1] ? neighbours+1 : neighbours
        }
        if (bottom && right){
            neighbours = this.grid[x+1][y+1] ? neighbours+1 : neighbours
        }
        return neighbours
    }

    draw(){
        const imageData = this.context.createImageData(this.size.x, this.size.y)
        const data = imageData.data

        //new Uint8ClampedArray(this.size.x * this.size.y * 4)
        this.grid.forEach((row, x) => {
            row.forEach((cell, y) => {
                const color = cell != 0 ? 0 : 255
                const i = (x * this.size.x + y) * 4
                data[i] = color
                data[i + 1] = color
                data[i + 2] = color
                data[i + 3] = 255
            })
        })

        // const imageData = new ImageData(data, this.size.x, this.size.y)
        this.context.putImageData(imageData, 0, 0)
    }
}