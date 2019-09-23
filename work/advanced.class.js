class AdvCircle extends Circle {
    constructor(adv = false) {

        super(adv);
        let stats = Circle.advs[adv];
        this.advancedTimeLeft = advancedTimeCoefficient;
        this.advancedClicksLeft = Math.randInt(stats.exp) + 1;
    }
    collide() {
        //this.color = `rgba(${col()},${col()},${col()},0.5)`; 
        let k = Math.floor((this.collided/maxColls)*225+30);
        this.color=`hsla(${k},${this.hsl[0]}%,${this.hsl[1]}%,0.5)`
        this.collided++;

        if (this.isAdvanced == 'killer') {
            (Math.random()>.5) ?
            circles.push(new AdvCircle('halfling')) :
            circles.push(new Circle())
        }
        else if (this.isAdvanced == "vanisher") {
            this.isShowing = !this.isShowing
        }
    }
}