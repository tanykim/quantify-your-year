import chroma from 'chroma-js';

const colors = {
  blue: ['#F0FFFF', '#87CEEB', 'SlateBlue', '#031968'],
  red: ['lightyellow', 'orange', 'deeppink', 'darkred'],
  green: ['lightyellow', 'lightgreen', 'darkgreen'],
  teal: ['lightyellow', 'turquoise', 'Teal'],
  purple: ['lightyellow', 'coral', 'mediumvioletred', 'purple'],
  brown: ['lightyellow', 'LightSalmon', 'darkOrange', 'Brown']
};

const getColorForTwoDirection = (isReverse) => {
  return isReverse ? 'two-blue' : 'two-red';
};

const getRandomColor = () => {
  const themes = Object.keys(colors);
  const random = Math.floor(Math.random() * themes.length);
  return themes[random];
}

const getColorBrewer = (setting, color) => {
  const {steps, distance} = setting;
  const brewer = chroma.bezier(colors[color]).scale().domain(steps);
  return steps.map(step => brewer(step + distance / 2));
}

const getTwoColorsBrewer = (setting, isReverse) => {
  // from red to blue
  const {steps, distance, min, max} = setting;
  let colorScale= ['#d73027','#f17d4e','#febf7d','#ffffbf','#b5d0de','#7ba2cc','#4575b4'];
  if (isReverse) {
    // if positive number means negative meaning, reverse.
    colorScale.reverse();
  }
  const brewer = chroma.scale(colorScale).domain([min, max]);
  return steps.map(step => brewer(step + distance / 2));
}

const getBlockColor = (brewer, steps, value) => {
  // out of legend boundary
  let color;
  if (value > steps[steps.length - 1]) {
    color = 'black';
  } else if (value < steps[0]) {
    color = '#ced4da';
  } else {
    let index = 0;
    for (let i = 1; i < steps.length; i++) {
      if (value < steps[i]) {
        index = i - 1;
        break;
      }
    }
    color = brewer[index]
  }
  return color;
}

const twoColors = {
  'two-red': '#d73027',
  'two-blue': '#4575b4',
};

const getMaxColor = (c) => {
  // two directional charts, get the opposite color for the positive values
  if (c.slice(0, 3) === 'two') {
    return c === 'two-blue' ? twoColors['two-red'] : twoColors['two-blue'];
  } else {
    return colors[c][colors[c].length - 1];
  }
}

const getColorForNegative = (c) => {
  return twoColors[c];
}

export {
  colors,
  getColorForTwoDirection,
  getRandomColor,
  getColorBrewer,
  getTwoColorsBrewer,
  getBlockColor,
  getMaxColor,
  getColorForNegative,
};
