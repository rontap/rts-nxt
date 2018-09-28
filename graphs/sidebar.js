// property settings
var sidebar ={};

sidebar.showEl = function(el) {
  console.log(el);
  $('#properties').innerHTML ='';
  Object.keys(el).map( (key) => {
      if (el[key] != null) {
        if (el[key].type == 'Object') {
            Object.keys(el[key]).map( (keyName) => {
              $('#properties').innerHTML+=`<span class="elem"><span>${keyName}</span><input value=${el[key][keyName]}></span>`;

            });
        }
        else  if (key!='edges'){
            if (graphPropWritable[key])
            $('#properties').innerHTML+=`<span class="elem"><span>${key}</span><input value=${el[key]}></span>`;
            else
            $('#properties').innerHTML+=`<span class="elem"><span>${key}</span><input value=${el[key]} disabled></span>`;


        }
      }


  });

}



const graphPropWritable = {
  id:false,
  name:{
    x:true,
    y:true,
    text:true
  },
  subgraph:false,
  type:false
}
