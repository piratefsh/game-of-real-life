export default class GameOfLife {
    constructor(canvasId, width=100, height=100, pattern, scale, onStart){
        // canvas size
        this.size = {
            x: width,
            y: height
        }

        // starting pattern
        this.pattern = pattern 

        // frame per second of drawing
        this.startFps = 5
        this.fps = 15

        // scale of grid
        this.scale = parseInt(scale)

        // callbacks
        this.onStart = onStart

        // color of live cel
        this.cellColor = 'rgba(255, 69, 0, 0.8)'

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
        canvas.style.opacity = 0

        this.context = canvas.getContext('2d')
    }

    start(){
        // populate board
        // load pattern if passed in
        if (this.pattern){
            this.load(this.pattern)
        }
        // else load random
        else{
            this.random()
            
        }

        // show canvas
        this.context.canvas.style.opacity = 1

        // callback
        setTimeout(()=>{
            this.onStart()
        }, 1000)
        
        // start
        setTimeout(()=>{
            this.tick()
        }, 3000)

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

    checkers(){
        // populate grid randomly
        this.grid = this.grid.map((row, x) => {
            return row.map((cell, y) => {
                return (x + y) % 2 == 1
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
        this.draw()
    }

    tick(){
        this.update()
        this.draw()

        const fps = this.startFps < this.fps ? this.startFps+=0.5 : this.fps

        // set interval of draw frame
        setTimeout(() => {
            requestAnimationFrame(() => {
                this.tick()
            })
        }, 1000 / fps)
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


    scaleDraw(s){
        this.context.canvas.width = this.size.x * s
        this.context.canvas.height = this.size.y * s
        this.context.scale(s, s)

        this.context.fillStyle = this.cellColor
        this.grid.forEach((row, x) => {
            row.forEach((cell, y) => {
                if (cell){
                    this.context.fillRect(y, x, 1, 1)
                }
            })
        })
    }

    draw(){
        this.scaleDraw(this.scale)
    }
}