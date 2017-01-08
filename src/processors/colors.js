import chroma from 'chroma-js';

var brewer = chroma.bezier(['#ffec99', '#1862AB']).scale();
var steps;
var distance;

function getColorRange(s, d) {
  steps = s;
  distance = d;
  brewer.domain(s)
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

let maxColor = '#1862AB';

export { getColorRange, getFillColor, maxColor };