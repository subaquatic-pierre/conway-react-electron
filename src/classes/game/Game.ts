import Player from './Player';

export default class Game {
    private speed : number;
    private running: boolean;
    
    public players: Player[];

    constructor(speed: number, players: Player[]){
        this.running = false;
        this.speed = speed;
        this.players = players;
    }

    private _setRunning(value: boolean):void {
        this.running = value;
    }

    public stop() {
        this._setRunning(false);
    }

    public start(): void {
        // Do not start game if already running
        if(this.running == true){
            console.log('The game is already running !');
            return;
        }

        // Start the game loop
        let counter: number = 0;
        while(true){

            setTimeout(() => {
                this.updatePlayers();
                counter++;
            }, this.speed * 1000);

            // Stop loop if number of iterations is complete
            if(counter == 5){
                this.stop();
                break;
            }
        }
    }

    public updatePlayers(): void {
        console.log("This is where we update the players")
        // for(const player in this.players){
        //     player.draw();
        // }
    }
}