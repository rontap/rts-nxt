// History manager

// .push
// .undo
// .redo
// .clearAll
// ~ maxlength
// ~ ??

class History{
    constructor(maxLength){
        this.data = [];
        this.maxLength= maxLength || Infinity;
        this.length = 0;
        this.pointer = -1;


        return this;
    }
    push(element) {
        if (this.pointer+1 != this.data.length) {
            //dont store the same data twice.
            if(element === this.data[this.pointer]) return element;

            //overwriting history

            this.data = this.data.slice(0,this.pointer);
            this.pointer--;

        } else if (this.data.length+1==this.maxLength){
            //if maxLength is exceeded, keep history size
            this.data=this.data.slice(1,this.data.length);
            this.pointer--;
        }

        this.data.push(element);
        this.pointer++;

        return this.data.last();
    }
    undo() {
        if (this.pointer == -1) return null;
        return this.data[--this.pointer];
    }
    redo() {
        if (this.pointer+1==this.data.length) return null;
        return this.data[++this.pointer];
    }

}

// >>> < +
//push push push undo push
