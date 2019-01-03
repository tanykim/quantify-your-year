# Quantify Your Year
Calendar-based visualization of one kind of activity over the course of a calendar year

## URL and Datasets
The URL would be ```your_project_address/#/[AUTHOR]-[ACTIVITY_TOPIC]-[YEAR]```.
Name your setting and data files following the convention above (e.g., tanyoung-swimming-2016.json).

Also update ```src/settings/datasets.json``` if you want to show this dataset in the selection menu on top of the page.

## Setting File Format
The setting file contains following information. For example,
```
{
  "year": 2016,
  "author": "Tanyoung",
  "gender": "female",
  "topic": "swimming",
  "pastVerb": "swam",
  "type": "distance",
  "considerFrequency": true,
  "metric": "yard",
  "abbr": "yd",
  "color": "blue",
  "alt_unit": "meter",
  "conversion": 1.09361,
  "alt_abbr": "m",
  "decimal": 1,
  "hasNegative": false,
  "isReverse": false,
}
```
* Gender: gender of the person, choose from female, male, and other
* Past Verb: a past tense verb matching the activity topic
* Type: Measurement of the activity, e.g., duration, distance, steps
* Metric: Unit of the type, use singular form. e.g., minute, meter, step,
* Abbribiation (optional): Same as metric if no abbreviation is common. e.g., m, yd, km
* Consider Frequency: False if most of the days have data so the number of days with valid data does not give insights.
* Color (optional): Choose the highlight color from blue, red, teal, green, purple. If not configured, one color is randomly selected.
* Alternative Unit (optional): Specify an alternative unit if it exists.
* Alternative Abbribiation (optional)
* Decimal (optional): If the data values contain decimal number, specify.
* Has Negative: If the data contains negative values, specify as true.
* Is Reverse: If the data contains negative values, and the negative ones have positive meanings (e.g., production/consumtion of energy of solar panels)

If the frequency matters (e.g., one may not swim every day), this project provides further analysis including consecutive days/week/month.

Save this file as ```[AUTHOR]-[ACTIVITY_TOPIC]-[YEAR].json``` under ```src/settings```.

## Data File Format
The data should be an array of dates with valid numbered data value. For example,
```
[
  {
    "date": "1/2/2016",
    "value": 2600
  },
  {
    "date": "11/30/2016",
    "value": 2600
  }
]
```
Save this file as ```[AUTHOR]-[ACTIVITY_TOPIC]-[YEAR].json``` under ```src/data```.

If you log your data on Google Spreadsheet, try this convenient [converter](https://www.npmjs.com/package/google-spreadsheet-to-json).

I wrote some Python scripts to generate both dataset and setting JSON files with downloadable data from Facebook, Twitter, Google Takeout, PG&E, iOS Health App, and Metromile. Check out [this repo](https://github.com/tanykim/quantify-your-year-data-generator).

## Development
```
npm install
npm start
```

## Build
For production-ready files
```
npm run build
```

## Made with React
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).