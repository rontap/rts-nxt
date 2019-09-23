// Circle Object and its methods
ccl = () => Math.randInt(90)
class Circle {

    
    static advs = {
        'false' : {
            size:1,
            ampt:1
        },
        'collider': {
            exp:10,
            size:1,
            color:'#FF9800',
            ampt:1
            
        },
        'spawner' : {
            exp:12,
            size:1,
            color:'#795548',
            ampt:1
           
        },
        'blocker' : {
            exp:15,
            size:1,
            color:'#d32f2f',
            ampt:.75
        },        
        'runner' : {
            exp:10,
            size:1,
            color:'#ffeb3b',
            ampt:1
        },
        'halfling' : {
            exp:2,
            size:.66,
            color:'#444444',
            ampt:1.25
        },
        'killer' : {
            exp:25,
            size:1.25,
            color:'#222222',
            ampt:.5
        },
        'vanisher' : {
            exp:5,
            size:.75,
            color:'#9c27b0',
            ampt:.7
        },
        'negator' : {
            exp:1,
            size:.8,
            color:'#222',
            ampt:.8
        }
    }
    static hasAdv = (key) => (Circle.adv.indexOf(key) >= 0)
    // storing data 
    advData() {
        return Circle.advs[this.isAdvanced]
    }
    constructor(adv = false)  {
        let stats = Circle.advs[adv];
        this.isShowing = true;
        this.x = Math.random()*innerWidth 
        this.y = Math.random()*innerHeight
        this.deltaX = Math.random()*(stats.ampt)*2 -stats.ampt
        this.deltaY = Math.random()*(stats.ampt)*2 -stats.ampt
        //this.color = `rgba(${col()},${col()},${col()},0.5)` // col function returns an int 0-255
        this.hsl=[ccl(),ccl()]
        this.color=`hsl(30,${this.hsl[0]}%,${this.hsl[1]}%,0.5)`
        this.isMoving = true
        this.collided = 0
        this.radius = (radius + ((Math.random()*2-1)*(radius*.2))) *stats.size
        this.isAdvanced = adv || false;    
    }

    //get the next frame
    iterate() {
        if (this.isMoving) {
            this.x += this.deltaX*speed;         
            this.y += this.deltaY*speed;
        }
    }
    collide() {
        //this.color = `rgba(${col()},${col()},${col()},0.5)`; 
       
        let k = Math.floor((this.collided/maxColls)*225+30);
        
        this.color=`hsla(${k},${this.hsl[0]}%,${this.hsl[1]}%,0.5)`
        this.collided++;
    }
    checkEdge() {
        // if next iteration would be on the edge
        
        // checking if circles are out of boundary (because of resizing)
        if ((this.x  +  this.radius) > innerWidth) {
            this.x = innerWidth-  this.radius;
        }
        if ((this.y  +  this.radius) > (innerHeight-80)) {
            this.y = (innerHeight-80)-  this.radius;
        }
        if ((this.x  -  this.radius) < 0) {
            this.x =   this.radius ;
        }
        if ((this.y  -  this.radius) <tutorialPaddingTop) {
            this.y =   this.radius + tutorialPaddingTop;
        }

        // collision with the wall
        // current implementation: the delta changes its sign to mimic bouncing off the wall
        if ((this.x + this.deltaX + this.radius) > innerWidth || (this.x + this.deltaX -  this.radius) < 0) {
            this.deltaX *= -1;
            this.collide();
        }
        if ((this.y + this.deltaY +  this.radius) > (innerHeight-80) || (this.y + this.deltaY - this.radius) < tutorialPaddingTop) {
            this.deltaY *= -1;
            this.collide();
        }
    }
    

    // Pythagoras theorem calculation
    distanceFromPoint(x,y) {
        return Math.sqrt( Math.pow(this.x-x,2) + Math.pow(this.y-y,2) ) 
    }
   
    
}