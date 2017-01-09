// import less from 'less';
import chroma from 'chroma-js';

const colors = {
  blue: ['#F0FFFF', '#87CEEB', 'SlateBlue', '#031968'],
  red: ['lightyellow', 'orange', 'deeppink', 'darkred'],
  green: ['lightyellow', 'lightgreen', 'darkgreen'],
  teal: ['lightyellow', 'turquoise', 'Teal'],
  purple: ['lightyellow', 'coral', 'mediumvioletred', 'purple']
}

var brewer;
 // = chroma.bezier(['#ffec99', '#1862AB']).scale();
var steps;
var distance;
var maxColor;

function getColorRange(s, d, c) {
  steps = s;
  distance = d;
  brewer = chroma.bezier(colors[c]).scale().domain(s);
  maxColor = colors[c][colors[c].length - 1];
}

function getFillColor(val) {
  let rounded = val;
  for (var i = 0; i < steps.length - 1; i++) {
    if (val - steps[i] < distance) {
      rounded = steps[i] + distance / 2
      break;
    }
  }
  return brewer(rounded);
}

function getMaxColor() {
  return maxColor;
}
export { getColorRange, getFillColor, getMaxColor };