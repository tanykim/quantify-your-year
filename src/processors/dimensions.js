import moment from 'moment';

const getCalendarInfo = (year) => {
  const startDate = moment(`${year}0101`, 'YYYYMMDD');
  const endDate = moment(`${year}1231`, 'YYYYMMDD');
  const startWeek = startDate.clone().startOf('week');
  const endWeek = endDate.clone().add(7, 'day').startOf('week');
  const noOfWeeks = endWeek.diff(startWeek, 'weeks');

  return {
    startDay: startDate.day(),
    endDay: endDate.day(),
    noOfWeeks,
    year,
  };
}

let containerW;

const getVisDimensions = (year) => {

  const calendarInfo = getCalendarInfo(year);
  const {noOfWeeks} = calendarInfo;

  containerW = containerW || document.getElementById('width').clientWidth - 30;

  let margin = {
    legend: 20,
    top: 40,
    left: 60,
    bottom: 8
  };

  const rectW = Math.max(Math.floor((containerW - margin.left) / noOfWeeks), 20);
  margin.right = rectW;
  const w = rectW * noOfWeeks;
  margin.left = Math.max(40, containerW - w - margin.right);

  return {
    rectW,
    margin,
    containerW,
    w: noOfWeeks * rectW,
    h: rectW * 7,
  };

}

const getPoints = (rectW, h, margin, year, month, sd, sw) => {
  const startDay =  sd != null ? sd : moment([year, month]).day();
  const startWeek = sw || moment([year, month]).week() - 1;

  const x = startWeek * rectW;
  const y = startDay * rectW;

  const sY = h + margin.bottom;
  const diff = startDay > 0 ? rectW : 0;
  const eY = -margin.top;

  return {x, y, sY, diff, eY, startDay, startWeek};
}

const getPath = (props, month) => {
  const p = getPoints(props.rectW, props.h, props.margin, props.year, month);
  return `M ${p.x}, ${p.sY} V ${p.y} h ${p.diff} V ${p.eY}`;
}

const getAreaPath = (rectW, h, margin, year, month) => {
  const sp = getPoints(rectW, h, margin, year, month);
  let np;
  if (+month < 11) {
    np = getPoints(rectW, h, margin, year, +month + 1);
  } else {
    // December has 31 days, 31 % 7 = 3
    const nysd = (sp.startDay + 3) % 7;
    // if the new year's first day is Sunday or Monday, diff should be rectW
    const nyw = sp.startWeek + (sp.startDay >= 4 ? 5 : 4);
    np = getPoints(rectW, h, margin, year, null, nysd, nyw);
  }
  return `M ${sp.x}, ${h} V ${sp.y} h ${sp.diff} V 0 H ${np.x} h ${np.diff} V ${np.y} h ${-np.diff} V ${h} Z`;
}

export { getCalendarInfo, getVisDimensions, getPoints, getPath, getAreaPath };