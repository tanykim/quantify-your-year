import _ from 'underscore';
import moment from 'moment';
import { locale, humanizeUnitId, humanizeDuration } from './formats';

function getSum(data) {
  let sum = 0;
  data.forEach((d) =>
    sum += d.value
  );
  return sum;
}

function getNumberOfDaysInYear(year) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0) ? 366 : 365;
}

function getAverages(data, year) {
  const byDay = getSum(data) / data.length;
  const byWeek = byDay * 7;
  const byMonth = byDay * getNumberOfDaysInYear(year);
  return {
    day: locale(byDay),
    week: locale(byWeek),
    month: locale(byMonth)
  }
}

function mapDataByUnit(data, year) {
  //first day, week, month = 0
  let byUnit = {
    day: _.object(_.map(data, function (d) {
      return [moment(d.date, 'M/D/YYYY').dayOfYear() - 1, d.value]
    })),
    week: {},
    month: {}
  };
  _.each(data, function (d, i) {
    //week
    let w = moment(d.date, 'M/D/YYYY').week() - 1;
    if (i === 0) {
      byUnit.week[w] = d.value;
    } else if (moment(d.date, 'M/D/YYYY').week() > moment(data[i-1].date, 'M/D/YYYY').week()) {
      byUnit.week[w] = d.value;
    } else {
      byUnit.week[w] += d.value;
    }
    //month
    let m = moment(d.date, 'M/D/YYYY').month();
    if (i === 0) {
      byUnit.month[m] = d.value;
    } else if (moment(d.date, 'M/D/YYYY').month() > moment(data[i-1].date, 'M/D/YYYY').month()) {
      byUnit.month[m] = d.value;
    } else {
      byUnit.month[m] += d.value;
    }
  });

  return byUnit;
}

function getTotalCount(year) {
  return {
    day: getNumberOfDaysInYear(year),
    week: moment(year, 'YYYY').weeksInYear(),
    month: 12
  };
}

function getValueRange(min, max) {
  //get chroma range: brew colors upto 10
  const minDiff = Math.floor((max - min) / 11).toString();
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
  while (currentStep < max + distance);

  return {min, max, steps, distance};
}

function getCalendar(data, year) {
  const byUnit = mapDataByUnit(data, year);
  const units = ['day', 'week', 'month'];
  const total = getTotalCount(year);
  const max = _.object(units.map((unit) =>
    [unit, {val: _.max(byUnit[unit]), list: []}]
  ));
  _.each(units, function (unit) {
    _.each(byUnit[unit], function (v, k) {
      if(v === max[unit].val) {
        max[unit].list.push(humanizeUnitId(year, unit, k));
      }
    });
  });

  //value range for legend
  const range = _.object(units.map((unit) =>
    [unit, getValueRange(_.min(byUnit[unit]), max[unit].val)]
  ));

  return {byUnit, total, max, range};
}

function getStatsByUnit(data, year) {
  const byUnit = mapDataByUnit(data, year);
  const units = ['day', 'week', 'month'];
  const total = getTotalCount(year);
  const active = {
    day: _.size(data),
    week: _.size(byUnit.week),
    month: _.size(byUnit.month)
  };

  //get the list conscutive day/week/month first
  const consecutive = _.object(units.map((unit) =>
    [unit, {active: [], inactive: []}]
  ));
  _.each(units, function (unit) {
    let prevStatus = _.isUndefined(byUnit[unit][0]) ? 'inactive': 'active';
    consecutive[unit][prevStatus][0] = {count: 1, start: 0};
    consecutive[unit][prevStatus === 'active' ? 'inactive' : 'active'][0] = {count: 0, start: null};
    _.each(_.range(total[unit]), function (i) {
      if (i > 0) {
        let status = _.isUndefined(byUnit[unit][i]) ? 'inactive' : 'active';
        //check with the previous value; same value -> incrase count, diff -> add new array
        if (status === prevStatus) {
          const len = consecutive[unit][status].length;
          consecutive[unit][status][len - 1].count++;
        } else {
          consecutive[unit][status].push({count: 1, start: i});
        }
        prevStatus = status;
      }
    });
  });

  //get max vals
  const consec = _.object(_.map(units, function (unit) {
    const maxCount = _.object(['active', 'inactive'].map((status) =>
      [status, _.max(consecutive[unit][status].map((val) => val.count))]
    ));
    const maxStarts = _.object(_.map(['active', 'inactive'], function (status, i) {
      const filtered = _.filter(consecutive[unit][status], function (val) {
        return val.count === maxCount[status];
      });
      const count = maxCount[status];
      return [status, {
        list: filtered.map((val) => humanizeDuration(year, unit, val.start, count)),
        count
      }];
    }));
    return [unit, maxStarts];
  }));

  return { total, active, consec };
}

function getDataByDay(data) {
  const byDayObj = _.groupBy(data, function (d) {
    return moment(d.date, 'M/D/YYYY').day();
  });
  return _.map(_.range(7), function (day) {
    return {
      freq: byDayObj[day] ? byDayObj[day].length : 0,
      value: byDayObj[day] ? getSum(byDayObj[day]) : 0
    };
  });
}

export { getSum, getAverages, getCalendar, getStatsByUnit, getDataByDay };