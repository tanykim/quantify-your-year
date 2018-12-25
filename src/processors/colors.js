import chroma from 'chroma-js';

const colors = {
  blue: ['#F0FFFF', '#87CEEB', 'SlateBlue', '#031968'],
  red: ['lightyellow', 'orange', 'deeppink', 'darkred'],
  green: ['lightyellow', 'lightgreen', 'darkgreen'],
  teal: ['lightyellow', 'turquoise', 'Teal'],
  purple: ['lightyellow', 'coral', 'mediumvioletred', 'purple'],
  brown: ['lightyellow', 'LightSalmon', 'darkOrange', 'Brown']
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

const getBlockColor = (brewer, steps, value) => {
  // out of legend boundary
  let color;
  if (value > steps[steps.length - 1] || value < steps[0]) {
    color === 'grey';
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

const getMaxColor = (c) => {
  return colors[c][colors[c].length - 1];
}

export {colors, getRandomColor, getColorBrewer, getBlockColor, getMaxColor};