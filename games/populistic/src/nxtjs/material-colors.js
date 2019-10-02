// NXTJS Material design support for js
// RTS VI

/** taken from Material Design Color Swatches
  * CSS created by Aron Tatai, rontap.netne.net
  * part of NXT.JS core packages

  * version 1 - 2017 December
  * version 2 - 2018 January - Added More Colors
  * version 3 - 2018 May - Added even more colors
  * version 4 - 2018 August - Ported To JS
  * version 5 - 2018 September - Added functions for smart Queries
 **/
const MAT_COLORS = {
 'swatches': ['red','purple','dp','indigo','blue','lblue','cyan','teal','green','orange','brown','dgrey','black'],
 'get' : {
   byHue : (hue) => {
      let vals = [];
      Object.keys(MAT_COLORS).map( (val) => {
        if (val.indexOf('-'+hue)!=-1)  //an actual color
          vals.push(MAT_COLORS[val].replace(' ',''));
      });
      return vals;
   },
   byColor : (color,asMap) => {
     let vals = asMap ? new Map() : [];
     Object.keys(MAT_COLORS).map( (val,key) => {
       if (val.indexOf(color) != -1)
        asMap   ? vals.set(Number(val.replace(color+'-','')),MAT_COLORS[val].replace(' ',''))
                : vals.push(MAT_COLORS[val].replace(' ',''));
     })
     return vals;
   }
 },

 'red-100':' #FFCDD2',
 'red-200':' #EF9A9A',
 'red-300':' #E57373',
 'red-400':' #EF5350',
 'red-500 ':'#F44336 ',
 'red-600':' #E53935',
 'red-700':' #D32F2F',
 'red-800':' #C62828',
 'red-900':'  #B71C1C',

 'purple-100':' #E1BEE7',
 'purple-200':' #CE93D8',
 'purple-300':' #BA68C8',
 'purple-400':' #AB47BC',
 'purple-500  ':' #9C27B0',
 'purple-600':' #8E24AA',
 'purple-700':' #7B1FA2',
 'purple-800':' #6A1B9A',
 'purple-900':' #4A148C',

 'dp-100':' #D1C4E9',
 'dp-200':' #B39DDB',
 'dp-300':' #9575CD',
 'dp-400':' #7E57C2',
 'dp-500':' #673AB7',
 'dp-600':' #5E35B1',
 'dp-700':' #512DA8',
 'dp-800':' #4527A0',
 'dp-900':' #311B92',

 'indigo-100':' #C5CAE9',
 'indigo-200':' #9FA8DA',
 'indigo-300':' #7986CB',
 'indigo-400':' #5C6BC0',
 'indigo-500':' #3F51B5',
 'indigo-600':' #3949AB',
 'indigo-700':' #303F9F',
 'indigo-800':' #283593',
 'indigo-900':' #1A237E',

 'blue-100':' #BBDEFB',
 'blue-200':' #90CAF9',
 'blue-300':' #64B5F6',
 'blue-400':' #42A5F5',
 'blue-500':' #2196F3',
 'blue-600':' #1E88E5',
 'blue-700':' #1976D2',
 'blue-800':' #1565C0',
 'blue-900':' #0D47A1',

 'lblue-100':' #B3E5FC',
 'lblue-200':' #81D4FA',
 'lblue-300':' #4FC3F7',
 'lblue-400':' #29B6F6',
 'lblue-500':' #03A9F4',
 'lblue-600':' #039BE5',
 'lblue-700':' #0288D1',
 'lblue-800':' #0277BD',
 'lblue-900':' #01579B',

 'cyan-100':' #B2EBF2',
 'cyan-200':' #80DEEA',
 'cyan-300':' #4DD0E1',
 'cyan-400':' #26C6DA',
 'cyan-500':' #00BCD4',
 'cyan-600':' #00ACC1',
 'cyan-700':' #0097A7',
 'cyan-800':' #00838F',
 'cyan-900':' #006064',

 'teal-100':' #B2DFDB',
 'teal-200':' #80CBC4',
 'teal-300':' #4DB6AC',
 'teal-400':' #26A69A',
 'teal-500':' #009688',
 'teal-600':' #00897B',
 'teal-700':' #00796B',
 'teal-800':' #00695C',
 'teal-900':' #004D40',

 'green-100':' #C8E6C9',
 'green-200':' #A5D6A7',
 'green-300':' #81C784',
 'green-400':' #66BB6A',
 'green-500':' #4CAF50',
 'green-600':' #43A047',
 'green-700':' #388E3C',
 'green-800':' #2E7D32',
 'green-900':' #1B5E20',

 'orange-100':' #FFE0B2',
 'orange-200':' #FFCC80',
 'orange-300':' #FFB74D',
 'orange-400':' #FFA726',
 'orange-500':' #FF9800',
 'orange-600':' #FB8C00',
 'orange-700':' #F57C00',
 'orange-800':' #EF6C00',
 'orange-900':' #E65100',

 'brown-100':' #D7CCC8',
 'brown-200':' #BCAAA4',
 'brown-300':' #A1887F',
 'brown-400':' #8D6E63',
 'brown-500':' #795548',
 'brown-600':' #6D4C41',
 'brown-700':' #5D4037',
 'brown-800':' #4E342E',
 'brown-900':' #3E2723',

 'dgrey-100':' #CFD8DC',
 'dgrey-200':' #B0BEC5',
 'dgrey-300':' #90A4AE',
 'dgrey-400':' #78909C',
 'dgrey-500':' #607D8B',
 'dgrey-600':' #546E7A',
 'dgrey-700':' #455A64',
 'dgrey-800':' #37474F',
 'dgrey-900':' #263238',

 'black-300':' #E0E0E0 ',
 'black-400':' #BDBDBD ',
 'black-500':' #9E9E9E',
 'black-600':' #757575 ',
 'black-700':' #616161',
 'black-800':' #424242',
 'black-900':' #212121',

 'magenta-500':' #d81b60 ',
 'white' : 'White'
};

if (nxt != undefined) //allowing complete portability
  nxt.modules.push('material-colors.js');


// @4.0
