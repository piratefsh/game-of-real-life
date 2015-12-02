import 'styles/style.scss' 
import GameOfLife from 'GameOfLife'
import pattern from 'patterns/adder.gif'

const p = new Image()
p.onload = () => {
    const game = new GameOfLife('grid', p.width, p.height, p)
}
p.src = pattern 