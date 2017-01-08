import * as d3 from 'd3-format';
import moment from 'moment';

//abc -> Abc
function capitalize(str) {
  return str[0].charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

//e.g., 1200 unit -> 1,200 units
function pluralize(n, unit, total) {
  if (n === total) {
    return `every ${unit}`;
  } else {
    return `${n.toLocaleString()} ${unit}${n !== 1 ? `s`: ``}`;
  }
}

function locale(n) {
  return Math.round(n).toLocaleString();
}

//add SI prefix - k, M...
function prefix(n) {
  if (n >= 0.0001 && n < 10000) {
    return n;
  } else {
    return d3.format('.0s')(n);
  }
}

function getMomentDay(year, unit, id) {
  return moment(year, 'YYYY').add(id, `${unit}s`);
}

function getDurationAcrossMonth(sd, ed, isDay) {
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

function humanizeUnitId(year, unit, id) {
  const d = getMomentDay(year, unit, id);
  if (unit === 'day') {
    return d.format('ddd MMM D');
  } else if (unit === 'week') {
    const sd = d.startOf('week');
    const ed = sd.clone().add(6, 'days');
    return getDurationAcrossMonth(sd, ed);
  } else {
    return moment(+id + 1, 'M').format('MMMM');
  }
}

function humanizeDuration(year, unit, id, count) {
  let sd;
  if (unit === 'day') {
    sd = getMomentDay(year, unit, id);
  } else if (unit === 'week') {
    sd = getMomentDay(year, unit, id).startOf('week');
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

function pronoun(gender, isHead) {
  let pn = 'xe';
  if (gender === 'female') {
    pn = 'she';
  } else if (gender === 'male') {
    pn = 'he';
  }
  return isHead ? capitalize(pn) : pn;
}
export { capitalize, pluralize, locale, prefix, humanizeUnitId, humanizeDuration, pronoun };