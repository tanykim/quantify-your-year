import * as d3 from 'd3-format';
import moment from 'moment';

const spacize = (str) => {
  return str.split('_').join(' ');
}

//abc of abc -> Abc of Abc
const capitalize = (str) => {
  // add as dataset grows
  const preps = ['on', 'at', 'in', 'of', 'with'];
  return str.split('_').join(' ').split(' ').map(word => {
    if (preps.indexOf(word) > -1) {
      return word;
    } else {
      return word[0].charAt(0).toUpperCase() + word.slice(1);
    }
  }).join(' ');
}

//e.g., 1200 unit -> 1,200 units
const pluralize = (n, unit, total) => {
  if (n === total) {
    return `every ${unit}`;
  } else {
    return `${n.toLocaleString()} ${unit}${n !== 1 ? `s`: ``}`;
  }
}

const locale = (n, decimal) => {
  const pow = decimal || 1;
  return (Math.round(n * Math.pow(10, pow)) / Math.pow(10, pow)).toLocaleString();
}

//add SI prefix - k, M...
const prefix = (n) => {
  if (n === 0) {
    return 0;
  } else if (n >= 0.0001 && n < 10000) {
    return n;
  } else {
    return d3.format('.2s')(n);
  }
}

const getMomentDay = (year, unit, id) => {
  return moment(year, 'YYYY').add(id, `${unit}s`);
}

const getDurationAcrossMonth = (sd, ed, isDay) => {
  //start day format
  let sf = 'MMMM D';
  //end day format
  let ef;
  if (isDay) {
    sf = 'ddd MMM D';
    ef = 'ddd MMM D';
  } else {
    ef = sd.format('M') === ed.format('M') ? `D` : `MMMM D`;
  }
  return `${sd.format(sf)} - ${ed.format(ef)}`;
}

const humanizeUnitId = (year, unit, id) => {
  const d = year != null ? getMomentDay(year, unit, id) : moment(id, 'M/D/YYYY');
  if (unit === 'day') {
    return d.format('ddd MMM D');
  } else if (unit === 'week') {
    const sd = d.startOf(id === 0 ? 'year' : 'week');
    const ed = sd.clone().add(6, 'days');
    return getDurationAcrossMonth(sd, ed);
  } else {
    return moment(+id + 1, 'M').format('MMMM');
  }
}

const humanizeDuration = (year, unit, id, count) => {
  if (count === 1) {
    return humanizeUnitId(year, unit, id);
  }
  let sd;
  if (unit === 'day') {
    sd = getMomentDay(year, unit, id);
  } else if (unit === 'week') {
    sd = getMomentDay(year, unit, id).startOf(id === 0 ? 'year' : 'week');
  } else {
    sd = moment(unit + 1, 'M');
  }
  let ed;
  if (unit === 'day') {
    ed = sd.clone().add(count - 1, 'days');
  } else if (unit === 'week') {
    ed = sd.clone().add((count - 1) * 7 + 6, 'days');
  } else {
    ed = moment(id + count, 'M');
  }
  let finalStr;
  if (unit === 'month') {
    finalStr = `${sd.format('MMMM')} - ${ed.format('MMMM')}`;
  } else {
    finalStr = getDurationAcrossMonth(sd, ed, true);
  }
  return finalStr;
}

const pronoun = (gender, isHead) => {
  let pn = 'xe';
  if (gender === 'female') {
    pn = 'she';
  } else if (gender === 'male') {
    pn = 'he';
  }
  return isHead ? capitalize(pn) : pn;
}

export {spacize, capitalize, pluralize, locale, prefix, humanizeUnitId, humanizeDuration, pronoun};