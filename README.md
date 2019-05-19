# here-weather
[![codecov](https://codecov.io/gh/forrestw92/here-weather/branch/master/graph/badge.svg?token=0B7JB80dIW)](https://codecov.io/gh/forrestw92/here-weather)
[![Build Status](https://travis-ci.org/forrestw92/here-weather.svg?branch=master)](https://travis-ci.org/forrestw92/here-weather)

A wrapper for [HERE Weather API](https://developer.here.com/documentation/weather/topics/overview.html) made for NodeJS

## Requirements

You will need a api key to access the weather data from HERE.com. You can create a free account [HERE Developer](https://developer.here.com)

## Installation

```
npm install here-weather
```

## How to use

Get your APP ID and APP CODE from here.com ready.

```
const weather = require("here-weather");
// Replace with your app details.
weather.setAuth({ app_id:"YOUR_APP_ID", app_code:"YOUR_APP_CODE" });

//7 Day forcast for city chicago with freedom units
weather.location({ name:"chicago" })
weather.metric(false);
weather.forecastSimple()
    .then(({ forecast }) => {
        return forecast.map(day => {
            return {
            highTemp: day.highTemperature,
            lowTemp: day.highTemperature,
            weatherIcon: {
                icon: day.iconLink,
                name: day.iconName
                }
            }
        })
    })
```

## Settings

```
//Required before any request is made.
weather.setAuth({ app_id: "YOUR_APP_ID", app_code: "YOUR_APP_CODE" })

//Required before any request is made.
//Use either location name,lat/long or zip.
weather.location({ name: "Austin,Texas" })
weather.location({ latitude:30.2672, longitude:97.7431 })
weather.location({ zipcode: 73301 })


//Use them freedom units!
weather.metric(false)

//Change the return data language
weather.language("english_us")

//Or Code
weather.language("en-US")

//Will return weather data from closest observation if true else will get many obervation weather data
weather.oneobservation(true)


//Date for which hourly forecasts are to be retrieved. The format is YYYY-MM-DD or YYYY-MM-DDThh:mm:ss
weather.hourlydate("2019-05-18")


//Will reset location,language,metric,oneobservation,hourlydate and auth info.
weather.resetSettings()
```

## Forecast

All forecast methods return a promise.
Before requesting any data you **MUST** set auth and location.

```
//Request a simplified seven day weather forecast
const { feedCreation, forecastLocation, forecast } = await weather.forecastSimple()

//Request a full seven day weather forecast
const { feedCreation, forecastLocation, forecast } = await weather.forecastExtended()


//Request an hour-by-hour seven day weather forecast
const { feedCreation, forecastLocation, forecast } = weather.forecastHourly()

//Request current weather observations around a named location, latitude and longitude and or zip code.
const { feedCreation, observationLocations } = await weather.forecastObservation()

//Request information on when the sun and moon will rise and set
const { feedCreation, astronomyLocation, astronomy } = await weather.forecastAstronomy()

//Request severe weather alerts around a city
const { feedCreation, alertLocation, alerts } = await weather.alerts()
//You can get the full alert description type by using
weather.alertTypeDescription(ALERT_TYPE);

//Request severe national weather alerts around a city
//nwsAlerts will be undefined if no alerts are found.
const { feedCreation, nwsAlerts } = await weather.nwsAlerts()
```


## Other

```
//Get all weather settings
const { location, language, metric, onebsercation, hourlydate} = weather.getSettings;

//Get auth config
const { app_code, app_id } = weather.getAuth;

//Get here api weather url
const url = weather.apiUrl;

//Get accepted language codes array
const languageCodes = weather.acceptedLanguageCodes;

//Get accepted language names array
const languageNames = weather.acceptedLanguageNames;

//Get weather alert type descriptions array
const alertDescription = weather.alertTypeDescriptions;

```
