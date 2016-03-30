# Blood Sugar Simulator

## Overview
In general, eating food raises blood sugar and exercise lowers blood sugar.  We have created a simplified model of how these factors affect blood sugar.  Write a simulator that accepts several inputs of two types, food and exercise, each with a timestamp.  The output should be a “graph” of blood sugar over the course of the day, and a graph of the amount of “glycation” that occurred during the day.  

#### Food:
In our model, eating food will increase blood sugar linearly for two hours.  The rate of increase depends on the food as defined in a database that we will provide.  See the glycemic index column. (NOTE this is only loosely based on science)

#### Exercise:
Exercise decreases blood sugar linearly for one hour.

Normalization:
Blood sugar starts at 80 at the beginning of the day. If neither food nor exercise is affecting your blood sugar (it has been more than 1 or 2 hours), it will approach 80 linearly at a rate of 1 per minute.

#### Glycation:
For every minute your blood sugar stays above 150, increment “glycation” by 1.  This is a measure of how much crystallized sugar is accumulating in your blood stream which increases heart disease risk.


## Libraries Used

- [Angular2](https://angular.io)
- [DatetimePicker](https://eonasdan.github.io/bootstrap-datetimepicker/)
- [PapaParse](http://papaparse.com)
- [ZinChart](http://www.zingchart.com)
