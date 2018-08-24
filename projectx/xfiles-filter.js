//filtering data out

filter = {};
filter.splitOn = [24,48];
filter.sum= [];

filter.maxSound=3500;
function connectedFilter(array) {

  filter.sum= [
    Math.sum(array.slice(0,filter.splitOn[0]))/4500,
    Math.sum(array.slice(filter.splitOn[0],filter.splitOn[1]))/4500,
    Math.sum(array.slice(filter.splitOn[1],array.length))/4500
  ];
  filter.color = new Color(
    Math.round(filter.sum[0]*255),
    Math.round(filter.sum[1]*255),
    Math.round(filter.sum[2]*255))
  $('h1.on').style.color=filter.color.hex;

  

}
