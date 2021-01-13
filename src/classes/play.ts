import { Player, Game } from './game/index';

const player = new Player(1,1);
const game = new Game(1, [player])

export function startGameLoop():void {
    game.start();
}
