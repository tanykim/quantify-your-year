# Quantify Your Year
Calendar-based visualization of one kind of activity over the course of a calendar year

## URL and Datasets
The URL would be ```your_project_address/#/[AUTHOR]-[ACTIVITY_TOPIC]-[YEAR]```.
Name your data and setting files following the convention above (e.g., tanyoung-swimming-2016.json).
Save the two files in ```src/data``` and ```src/settings``` respectively. Also update ```src/settings/datasets.json```.

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
  "metric": "yard",
  "abbr": "yd",
  "considerFrequency": true
  "color": "blue"
}
```
* Gender: gender of the person, choose from female, male, and other
* Past Verb: a past tense verb matching the activity topic
* type: Measurement of the activity, e.g., duration, distance, steps
* Meric: Unit of the type, use singular form. e.g., minute, meter, step,
* Abbr: Same as metric if no abbreviation is common. e.g., m, yd, km
* Consider Frequency: False if most of the days have data so the number of days with valid data does not give insights.
* Color: Choose the highlight color from blue, red, teal, green, purple. If not configured, one color is randomly selected.

If the frequency matters (e.g., one may not swim every day), this project provides further analysis including consecutive days/week/month.

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
If you log your data on Google Spreadsheet, try this convenient [converter](https://www.npmjs.com/package/google-spreadsheet-to-json).

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

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
