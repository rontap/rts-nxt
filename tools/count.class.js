class Microcount {
  constructor() {
    this.names=[];
    this.counts=[];
  }
  add() {
    let nth=this.names.length;
    this.names[nth]="count"+nth;
    this.counts[nth]=0;
    this.refreshUI();
  }
  countUp(id) {
    this.counts[id]++;
    this.refreshUI();

  }
  remove(id) {
      this.names.splice(id,1);
      this.counts.splice(id,1);
      this.refreshUI();

  }
  rename(id) {
      __counts(id);
      //THIS IS NOT GOOD

  }
  refreshUI() {
    let nth=this.names.length;
    sect.innerHTML="";
    for (i=0; i<nth; i++) {
      let currRemove = "<i class='material-icons' onclick='counter.remove("+i+")'>clear</i> ";
      let currRename = "<i class='material-icons' onclick='counter.rename("+i+")'>create</i>";
      let currReset  = "<i class='material-icons' onclick='counter.counts["+i+"]=0;counter.refreshUI();'>replay</i>";
      let currFwd    = "<i class='material-icons' onclick='counter.counts["+i+"]+=10;counter.refreshUI();'>forward_10</i>";
      sect.innerHTML+="<div class='chip'><span onclick='counter.countUp("+i+")' >"+this.names[i]+"  <chip style='margin:0 -30px 0 30px;'><i class='material-icons red' >adjust</i>"+this.counts[i]+"</chip></span> <span>"+currRename+currFwd+currReset+currRemove+" </span></div>";


    }
  }
}
