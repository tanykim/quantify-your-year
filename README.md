# activity-log
Calendar-based nisualization of one kind of activity

## URL and Dataset
The URL would be ```your_project_address/#[USER_NAME]-#[ACTIVITY_TYPE]-#[YEAR]```.
Name your dataset following the convention above (e.g., tanyoung-swimming-2016.json).

## Dataset Format
Have the dataset ready in the format of ```src/data.json```.
The data should be an array of dates with valid numbered data value. For example,
```
{
  "date": "11/30/2016",
  "value": 2600
}
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
