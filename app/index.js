import 'styles/style.scss' 
import GameOfLife from 'GameOfLife'
import adder from 'patterns/adder.gif'
import puftrn from 'patterns/puftrn.gif'
import p136 from 'patterns/p136.gif'
import out from 'patterns/out2.png'

let game

const p = new Image()
p.src = out

p.onload = () => {
    game = new GameOfLife('grid', p.width, p.height, p)
}