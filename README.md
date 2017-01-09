# activity-log
Calendar-based visualization of one kind of activity

## URL and Datasets
The URL would be ```your_project_address/#/[AUTHOR]-[ACTIVITY_TOPIC]-[YEAR]```.
Name your data and setting file following the convention above (e.g., tanyoung-swimming-2016.json).
Save the two files in ```src/data``` and ```src/settings``` respectively.

## Setting File Format
The setting file contains following information. For example,
```
{
  "year": 2016,
  "author": "Tanyoung",
  "gender": "female", //gender of the person, choose from female, male, and other
  "topic": "swimming",
  "pastVerb": "swam", //verb matching the activity topic
  "type": "distance", //measurement of the activity, e.g., duration, distance, steps
  "metric": "yard", //unit of the type, use singular form. e.g., minute, meter, step,
  "abbr": "yd", //same as metric if no abbreviation is common. e.g., m, yd, km,
  "considerFrequency": true //false if most of the days have data so the number of days with valid data does not give insights.
  "color": "blue" //choose the highlight color from blue, red
}
```
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


## Compile CSS
```
lessc src/index.less src/index.css
```

## Made with React
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
