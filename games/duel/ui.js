function drawLine(event) {
    if (event.buttons == 1)
     {
       if (!isLineDrawn) {
          startID = [p2l(l2p(event.layerX)),p2l(l2p(event.layerY))];
          drawTime=SIZE;
       }

       ctx2.clearAll();
       ctx2.beginPath();
       ctx2.strokeStyle=colors[playerID];
       ctx2.lineWidth=4;
       ctx2.moveTo(startID[0],startID[1]);
       ctx2.lineTo(event.layerX,event.layerY);
       isLineDrawn=true;
       ctx2.stroke();

       ctx2.fillStyle = "#2222222";
       ctx2.beginPath();
       ctx2.arc(startID[0],startID[1], SIZE , 0, 2 * Math.PI);
       ctx2.fill();

       if (drawTime<SIZE*2) { drawTime += .5;}
       ctx0.clearAll();
       ctx0.fillStyle = colors[ playerID ] + "cc";
       ctx0.beginPath();
       ctx0.arc(startID[0],startID[1], drawTime , 0, 2 * Math.PI);
       ctx0.fill();
     }
}



function drawBg() {
  for (i=0;i<WIDTH;i++) {
    for (j=0; j<HEIGHT;j++) {
        let xTemp = 5*SIZE*(i+1);
        let yTemp = 5*SIZE*(j+1);

        let con = field[i][j].connection;
        for (k=0;k<con.length;k++) {
          ctx.beginPath();
          if (MUM) ctx.strokeStyle=colors[field[i][j].owner];
          else ctx.strokeStyle = colors[ field[i][j].subtree + 1 ];
          ctx.lineWidth=3;
          ctx.moveTo(p2l(con[k][0]),p2l(con[k][1]));
          ctx.lineTo(p2l(field[i][j].x),p2l(field[i][j].y));
          ctx.stroke();
        }


        if (MUM) ctx.fillStyle = colors[ field[i][j].owner ];
        else     ctx.fillStyle = colors[ field[i][j].subtree + 1 ];
        ctx.beginPath();
        ctx.arc(xTemp, yTemp, SIZE, 0, 2 * Math.PI);
        ctx.fill();

    }
  }
}
