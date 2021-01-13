export default class Player {
    private x_pos: number;
    private y_pos: number;

    constructor(x:number, y:number){
        this.x_pos = x;
        this.y_pos = y;
    }

    public setPos(x:number, y:number) :void {
        this.x_pos = x;
        this.y_pos = y;
    }

    public draw():void {
        console.log('The player is drawn !')
        // implement draw method
    }
}