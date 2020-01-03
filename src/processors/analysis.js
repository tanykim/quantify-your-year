import moment from 'moment';
import { locale, humanizeUnitId, humanizeDuration } from './formats';

const getConvertedData = (data, conversion, decimal) => {
  let newData = [];
  for (const d of data) {
    let {date, value, alt_unit} = d;
    const newVal = {date, value};
    if (alt_unit != null) {
      newVal.altValue = value;
      let converted = value * conversion;
      if (decimal != null) {
        converted = Math.round(converted * Math.pow(10, decimal)) / Math.pow(10, decimal);
      } else {
        converted = Math.round(converted);
      }
      newVal.value = converted;

    }
    newData.push(newVal);
  }
  return newData
}

const arrToObj = (arr) => {
  return arr.reduce((obj, pair) => {
      obj[pair[0]] = pair[1];
      return obj;
  }, {});
}

const getSum = (data) => {
  return data.map(d => d.value).reduce((accumulator, memo) => accumulator + memo, 0);
}

const getNumberOfDaysInYear = (year) => {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0) ? 366 : 365;
}

const getAverages = (sum, daysCount, year) => {
  return {
    day: locale(sum / daysCount),
    week: locale(sum / getNumberOfDaysInYear(year) * 7),
    month: locale(sum / 12),
  };
}

const getWeek = (date) =>{
  const md = moment(date, 'M/D/YYYY');
  let wId = md.week();
  if (wId === 1 && md.month() === 11) {
    wId = md.add(-7, 'days').week() + 1;
  }
  return wId;
}

const mapDataByUnit = (data, year) => {
  //first day, week, month = 0
  const byDay = arrToObj(data.map(d =>[moment(d.date, 'M/D/YYYY').dayOfYear() - 1, d.value]));
  let byUnit = {
    day: byDay,
    week: {},
    month: {}
  };

  for (const i in data) {
    const d = data[i];
    //week
    let w = getWeek(d.date) - 1;
    if (+i === 0) {
      byUnit.week[w] = d.value;
    } else if (getWeek(d.date) > getWeek(data[+i - 1].date)) {
      byUnit.week[w] = d.value;
    } else {
      byUnit.week[w] += d.value;
    }
    //month
    let m = moment(d.date, 'M/D/YYYY').month();
    if (+i === 0) {
      byUnit.month[m] = d.value;
    } else if (moment(d.date, 'M/D/YYYY').month() > moment(data[i - 1].date, 'M/D/YYYY').month()) {
      byUnit.month[m] = d.value;
    } else {
      byUnit.month[m] += d.value;
    }
  }
  return byUnit;
}

const getTotalCount = (year) => {
  return {
    day: getNumberOfDaysInYear(year),
    week: moment(year, 'YYYY').weeksInYear(),
    month: 12
  };
}

const getValueRange = (min, max, hasNegative) => {
  let newMax = max;
  // if values include negative, find a bigger abs
  if (hasNegative && min * -1 > max) {
    newMax = min * -1;

  }
  //get chroma range: brew colors upto 7 or 8
  const minDiff = Math.floor((newMax - min) / 8).toString();
  //steps increase 1, 2, 5, 10, 20, 50, 100, 200, 5000, 1000 ...
  let step = 10;
  const firstDigit = parseInt(minDiff[0], 0);
  if (firstDigit === 0) {
    step = 1;
  } else if (firstDigit < 2) {
    step = 2;
  } else if (firstDigit < 5) {
    step = 5;
  }
  const distance = step * Math.pow(10, (minDiff.length - 1));

  //color step values
  let currentStep = 0;
  let steps = [];
  do {
    if (currentStep + distance > min) {
      steps.push(currentStep);
    }
    currentStep += distance;
  }
  while (currentStep < newMax + distance);

  //if negative numbers, add mirrored negative numbers up front
  if (hasNegative) {
    const stepCount = steps.length;
    const dup = steps.slice(0);
    for (let i = 1; i < stepCount; i++) {
      dup.unshift(steps[i] * -1);
    }
    steps = dup;
  }

  return {min, max: newMax, steps, distance};
}

const getFence = (data) => {
  const sorted = data.sort((a, b) => a - b);
  const lowerQIdx = Math.round(data.length / 4);
  const upperQIdx = Math.round(data.length / 4 * 3);
  const interQRange = sorted[upperQIdx] - sorted[lowerQIdx];
  const innerFence = [
    sorted[lowerQIdx] - interQRange * 1.5,
    sorted[upperQIdx] + interQRange * 1.5,
  ];
  const outerFence = [
    sorted[lowerQIdx] - interQRange * 3,
    sorted[upperQIdx] + interQRange * 3,
  ];
  const outOfInnerFence = data.filter(d => d < outerFence[0] || d > innerFence[1]);
  // do not make too many outliers
  if (outOfInnerFence.length < Math.sqrt(data.length / 5)) {
    return innerFence;
  } else {
    return outerFence;
  }
}

const getCalendar = (data, year, hasNegative, isReverse) => {
  const byUnit = mapDataByUnit(data, year);
  const total = getTotalCount(year);

  const units = ['day', 'week', 'month'];
  const byUnitArray =  units.map(unit => Object.entries(byUnit[unit]).map(d => d[1]));

  // get max vals and range by unit
  const maxByUnit = {};
  const rangeByUnit = {};
  for (const i in units) {
    const unit = units[i];
    const unitData = byUnit[unit];
    const maxVal = Math.max(...byUnitArray[i]);
    const minVal = Math.min(...byUnitArray[i]);

    // if negative number has in fact better meaning, get minimal data
    const trueMaxVal = isReverse ? minVal : maxVal;

    let unitWithMax = [];
    for (const j in unitData) {
      if (unitData[j] === trueMaxVal) {
        unitWithMax.push(humanizeUnitId(year, unit, j));
      }
    }
    maxByUnit[unit] = {val: trueMaxVal, list: unitWithMax};

    // get ranges that excludes outliers
    const outerFence = getFence(byUnitArray[i]);

    rangeByUnit[unit] = getValueRange(
      Math.max(minVal, outerFence[0]),
      Math.min(maxVal, outerFence[1]),
      hasNegative,
    );
  }

  return {byUnit, total, max: maxByUnit, range: rangeByUnit};
}

const getStatsByUnit = (data, year) => {
  const byUnit = mapDataByUnit(data, year);
  const units = ['day', 'week', 'month'];
  const total = getTotalCount(year);
  const active = {
    day: data.length,
    week: Object.keys(byUnit.week).length,
    month:Object.keys(byUnit.month).length,
  };

  //get the list conscutive day/week/month first
  const consecutive = arrToObj(units.map(unit => [unit, {active: [], inactive: []}]));

  for (const unit of units) {
    let prevStatus = byUnit[unit][0] != null ? 'active' : 'inactive';
    consecutive[unit][prevStatus][0] = {count: 1, start: 0};
    consecutive[unit][prevStatus === 'active' ? 'inactive' : 'active'][0] = {count: 0, start: null};
    for (let i = 0; i < total[unit]; i++) {
      if (i > 0) {
        let status = byUnit[unit][i] != null ? 'active' : 'inactive';
        //check with the previous value; same value -> incrase count, diff -> add new array
        if (status === prevStatus) {
          const len = consecutive[unit][status].length;
          consecutive[unit][status][len - 1].count++;
        } else {
          consecutive[unit][status].push({count: 1, start: i});
        }
        prevStatus = status;
      }
    };
  }

  //get max vals
  const consec = arrToObj(units.map(unit => {
    const maxCount = arrToObj(['active', 'inactive'].map(status =>
      [status, Math.max(...consecutive[unit][status].map(val => val.count))]
    ));
    const maxStarts = arrToObj(['active', 'inactive'].map((status, i) =>{
      const filtered = consecutive[unit][status].filter(val => {
        return val.count === maxCount[status];
      });
      const count = maxCount[status];
      return [status, {
        list: filtered.map(val => humanizeDuration(year, unit, val.start, count)),
        count
      }];
    }));
    return [unit, maxStarts];
  }));

  return { total, active, consec };
}

const getDataByDay = (data) => {
  return [...Array(7).keys()].map(day => {
    const dateInDay = data.filter(d => moment(d.date, 'M/D/YYYY').day() === day);
    return {
      freq: dateInDay.length,
      value: getSum(dateInDay),
    };
  });
}

export {getConvertedData, getSum, getAverages, getWeek, getCalendar, getStatsByUnit, getDataByDay};
