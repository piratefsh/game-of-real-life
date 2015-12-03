import 'styles/style.scss' 
import GameOfLife from 'GameOfLife'
import adder from 'patterns/adder.gif'
import puftrn from 'patterns/puftrn.gif'
import p136 from 'patterns/p136.gif'
import out from 'patterns/out2.png'
import ori from 'images/orig.png'
let game

const p = new Image()
const orig = new Image()

p.src = out
orig.src = ori

p.onload = () => {
    orig.onload = () => {
        const scale = parseInt(window.innerHeight*1.0 / p.height)
        game = new GameOfLife('grid', p.width, p.height, p, scale, hideBg)
        // game = new GameOfLife('grid', p.width, p.height, p)
        drawBg(orig, p.width*scale, p.height*scale)
    }
}

function hideBg(){
    const bgCanvas = document.getElementById('bg')
    bgCanvas.style.opacity = 0
    
}

function drawBg(img, w, h){
    const bgCanvas = document.getElementById('bg')
    const bgContext = bgCanvas.getContext('2d')
    bgCanvas.width = w
    bgCanvas.height = h
    bgContext.drawImage(img, 0, 0, w, h)
}