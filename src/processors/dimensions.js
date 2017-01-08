import moment from 'moment';

function getDimensions(year) {
  const startDate = moment(year, 'YYYY');
  const endDate = startDate.clone().endOf('year');
  const noOfWeeks = Math.ceil(endDate.diff(startDate.clone().startOf('week'), 'days') / 7);

  //bootstrap max width is 1140
  const containerW = Math.min(1140, document.getElementById('root').clientWidth);

  const margin = {
    legend: 60,
    top: 40,
    left: 60,
    right: 1,
    bottom: 20
  };

  const rectW = Math.floor((containerW - margin.left - margin.right) / noOfWeeks);

  //vis dimensions
  return {
    year: year,
    noOfWeeks: noOfWeeks,
    startDay: startDate.day(),
    endDay: endDate.day(),
    rectW: rectW,
    margin: margin,
    w: noOfWeeks * rectW,
    h: rectW * 7
  };
}

function getPoints(rectW, h, margin, year, month, sd, sw) {

  const startDay = sd || moment([year, month]).day();
  const startWeek = sw || moment([year, month]).week() - 1;

  const x = startWeek * rectW;
  const y = startDay * rectW;

  const sY = h + margin.bottom;
  const diff = startDay === 0 ? 0 : rectW;
  const eY = -margin.top;

  return {x, y, sY, diff, eY, startDay, startWeek};
}

function getPath(props, month) {
  const p = getPoints(props.rectW, props.h, props.margin, props.year, month);
  return `M ${p.x}, ${p.sY} V ${p.y} h ${p.diff} V ${p.eY}`;
}

function getAreaPath(rectW, h, margin, year, month) {
  const sp = getPoints(rectW, h, margin, year, month);
  let np;
  if (+month < 11) {
    np = getPoints(rectW, h, margin, year, +month + 1);
  } else {
    np = getPoints(rectW, h, margin, year, +month + 1, sp.startDay + 31, sp.startWeek + 5);
  }
  return `M ${sp.x}, ${h} V ${sp.y} h ${sp.diff} V 0 H ${np.x} h ${np.diff} V ${h} Z`;
}

export { getDimensions, getPoints, getPath, getAreaPath };