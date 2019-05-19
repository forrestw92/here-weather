const https = require("https");

class Weather {
  constructor() {
    this._authConfig = {
      app_code: undefined,
      app_id: undefined
    };
    this._location = undefined;
    this._language = undefined;
    this._metric = undefined;
    this._oneobservation = undefined;
    this._hourlydate = undefined;
    // prettier-ignore
    this._acceptedLanguageCodes = ["af-ZA", "sq", "am-ET", "ar", "as-IN", "az-AZ", "eu", "be", "bn-BD", "bn", "bs-BA", "bg-BG", "ca", "zh-CN", "zh-HK", "zh-TW", "hr-HR", "cs-CZ", "da-DK", "nl-NL", "en", "en-US", "et-EE", "fa", "fa-AF", "fi-FI", "fr-CA", "fr", "gl", "ka-GE", "de", "el-GR", "gu-IN", "ha", "he-IL", "hi-IN", "hu-HU", "is-IS", "ig-NG", "id-ID", "it", "ja-JP", "kn-IN", "ks-IN", "kk-KZ", "km-KH", "ky-KG", "ko-KR", "lo-LA", "lv-LV", "ln", "lt-LT", "mk-MK", "mg-MG", "ms-MY", "ml-IN", "mr-IN", "mn-MN", "no-NO", "or-IN", "pl-PL", "pt-BR", "pt-PT", "pa", "ps", "ro-RO", "ru-RU", "sr-YU", "st", "si-LK", "sk-SK", "sl-SL", "es-ES", "es-US", "sw", "sv", "tl-PH", "ta", "te-IN", "th-TH", "tg-TJ", "tr-TR", "tk", "uk-UA", "ur", "uz-UZ", "vi-VN", "xh", "yo", "zu"];
    // prettier-ignore
    this._acceptedLanguageNames = ["afrikaans", "albanian", "amharic", "arabic", "assamese", "azerbaijani", "basque", "belarusian", "bengali-bd", "bengali", "bosnian", "bulgarian", "catalan", "chinese_prc", "chinese_hk", "chinese_tw", "croatian", "czech", "danish", "dutch", "english", "english_us", "estonian", "farsi", "farsi-af", "finnish", "french_ca", "french", "galician", "georgian", "german", "greek", "gujarati", "hausa", "hebrew", "hindi", "hungarian", "icelandic", "igbo", "indonesian", "italian", "japanese", "kannada", "kashmiri", "kazakh", "khmer", "kirghiz", "korean", "lao", "latvian", "lingala", "lithuanian", "macedonian", "malagasy", "malay", "malayalam", "marathi", "mongolian", "norwegian", "oriya", "polish", "portuguese_br", "portuguese", "punjabi", "pushto", "romanian", "russian", "serbian", "sesotho", "sinhala", "slovak", "slovene", "spanish", "spanish_am", "swahili", "swedish", "tagalog", "tamil", "telugu", "thai", "tajik", "turkish", "turkmen_latin", "ukrainian", "urdu", "uzbek", "vietnamese", "xhosa", "yoruba", "zulu"]
    // prettier-ignore
    this._alertDescriptions = ["Strong Thunderstorms Anticipated – Strong thunderstorms anticipated during the next 24 hours", "Severe Thunderstorms Anticipated – Severe thunderstorms anticipated during the next 24 hours (supersedes the strong thunderstorm alert)", "Tornadoes Possible – Conditions are favorable for the formation of tornadoes (supercedes the severe thunderstorm alert)", "Heavy Rain Anticipated – More than 1 inch of rain in the next 24 hours (and less than 2 inches)", "Floods Anticipated – More than 2 inches of rain in the next 24 hours", "Flash Floods Anticipated – More than 1 inch of rain in any 6 hour time period (supersedes Flood Alert and Heavy Rain Alert)", "High Winds Anticipated – Winds greater than 35 mph", "Heavy Snow Anticipated – More than 6 inches of snow in a 12-hour period (anytime during the next 24 hours)", "Blizzard Conditions Anticipated – More than 6 inches of snow anticipated with winds greater than 35 mph", "Blowing Snow Anticipated – High winds anticipated with fresh snow on the ground (superseded by Blizzard Alert)", "Freezing Rain Anticipated – Light freezing rain and/or sleet anticipated", "Ice Storm Anticipated – Heavy freezing rain anticipated along with hazardous driving conditions", "Snow Advisory – More than 1 inch of snow anticipated during the next 24 hours (and less than 6 inches)", "Winter Weather Advisory – A mixture of winter-like conditions anticipated", "Heat Advisory – Comfort indices exceeding 110F", "Excessive Heat Alert – comfort indices above 115F with dew points above 80F (supersedes heat advisory)", "Wind Chill Alert – Issued when the wind chill is 20 below zero or lower with a minimum of a 10 mph wind", "Frost Advisory – Freezing temperatures and light winds (only issued during the Spring and Fall for low latitude/ low elevation locations)", "Freeze Advisory – A hard freeze anticipated (only issued during the Spring and Fall for low latitude/ low elevation locations)", "Fog Anticipated – Visibility expected to drop below 1/4 mile", "Dense Fog Anticipated – Visibility expected to drop below 1/8 mile (superSedes Fog Alert)", "Smog Anticipated – Low visibilities and warm temperatures", "Tropical Cyclone Conditions Anticipated – Winds greater than 40 mph with temperatures above 80F and heavy rain", "Hurricane Conditions Anticipated – Winds greater than 75 mph with temperatures above 80F and heavy rain", "Small Craft Advisory Anticipated – Winds greater than 25 mph anticipated", "Gale Warning Anticipated – Winds greater than 35 mph anticipated", "Winds greater than 35 mph anticipated – Winds greater than 50 mph anticipated", "Heavy Surf Advisory – Waves over 15 feet high", "Beach Erosion Advisory – High waves and wind anticipated"];
    this._weatherAPI =
      "https://weather.cit.api.here.com/weather/1.0/report.json?";
  }
  request(url) {
    return new Promise((resolve, reject) => {
      https
        .get(url, res => {
          let chunks = "";
          res.on("data", chunk => {
            chunks += chunk;
          });
          res.on("end", function() {
            if (res.statusCode === 200) {
              try {
                resolve({
                  data: JSON.parse(chunks)
                });
              } catch (e) {
                reject({ error: "Parse Error" });
              }
            } else {
              reject({
                response: JSON.parse(chunks),
                statusCode: res.statusCode
              });
            }
          });
        })
        .on("error", e => {
          reject(e);
        });
    });
  }
  /**
   * Removes undefined/empty object entries
   * @author https://flaviocopes.com/how-to-remove-object-property-javascript/#remove-a-property-without-mutating-the-object
   * @param {object} obj  Object to clean
   * @returns {object} Clean Object
   */
  _cleanObj(obj) {
    return Object.keys(obj).reduce((object, key) => {
      if (obj[key] !== undefined) {
        object[key] = obj[key];
      }
      return object;
    }, {});
  }
  /**
   * Converts object to query string
   * @param {object} obj
   * @returns {string} query string
   */
  _objToParms(obj) {
    return Object.keys(this._cleanObj(obj))
      .map(key => `${key}=${obj[key].toString().replace(/\s+/g, "")}`)
      .join("&");
  }
  validateLanguage(language) {
    if (
      this._acceptedLanguageCodes.indexOf(language) === -1 &&
      this._acceptedLanguageNames.indexOf(language) === -1
    ) {
      throw new Error("Invalid language");
    }
  }

  buildRequest(product) {
    const {
      _location: location,
      _language: language,
      _metric: metric,
      _oneobservation: oneobservation,
      _hourlydate: hourlydate,
      _authConfig: authConfig
    } = this;
    if (authConfig.app_id === undefined || authConfig.app_code === undefined) {
      throw new Error("Must call setAuth before requesting data.");
    }
    if (this._language) {
      this.validateLanguage(this._language);
    }
    return `${this._objToParms({
      product,
      ...location,
      language,
      metric,
      oneobservation,
      hourlydate,
      ...authConfig
    })}`;
  }

  get getSettings() {
    return {
      location: this._location,
      language: this._language,
      metric: this._metric,
      oneobservation: this._oneobservation,
      hourlydate: this._hourlydate
    };
  }
  get getAuth() {
    return this._authConfig;
  }

  get apiUrl() {
    return this._weatherAPI;
  }
  get acceptedLanguageCodes() {
    return this._acceptedLanguageCodes;
  }
  get acceptedLanguageNames() {
    return this._acceptedLanguageNames;
  }
  get alertTypeDescriptions() {
    return this._alertDescriptions;
  }

  resetSettings() {
    this._location = undefined;
    this._language = undefined;
    this._metric = undefined;
    this._oneobservation = undefined;
    this._hourlydate = undefined;
    this._authConfig = {
      app_code: undefined,
      app_id: undefined
    };
  }
  setAuth(auth) {
    const { app_code, app_id } = auth;
    this._authConfig = {
      app_code,
      app_id
    };
  }
  hourlydate(date) {
    this._hourlydate = date;
  }
  oneobservation(oneobservation) {
    this._oneobservation = oneobservation;
  }
  metric(metric) {
    this._metric = metric;
  }
  language(language) {
    this._language = language;
  }
  location(location) {
    this._location = location;
  }

  alertTypeDescription(type) {
    return this._alertDescriptions[parseInt(type) - 1];
  }
  forecastSimple() {
    return this.request(
      this._weatherAPI + this.buildRequest("forecast_7days_simple")
    ).then(({ data }) => {
      const { feedCreation, dailyForecasts } = data;
      const { forecastLocation } = dailyForecasts;
      const { forecast } = forecastLocation;
      delete forecastLocation.forecast;

      return { feedCreation, forecastLocation, forecast };
    });
  }
  forecastExtended() {
    return this.request(
      this._weatherAPI + this.buildRequest("forecast_7days")
    ).then(({ data }) => {
      const { feedCreation, forecasts } = data;
      const { forecastLocation } = forecasts;
      const { forecast } = forecastLocation;
      delete forecastLocation.forecast;

      return { feedCreation, forecastLocation, forecast };
    });
  }
  forecastHourly() {
    return this.request(
      this._weatherAPI + this.buildRequest("forecast_hourly")
    ).then(({ data }) => {
      const { feedCreation, hourlyForecasts } = data;
      const { forecastLocation } = hourlyForecasts;
      const { forecast } = forecastLocation;
      delete forecastLocation.forecast;

      return { feedCreation, forecastLocation, forecast };
    });
  }
  forecastObservation() {
    return this.request(
      this._weatherAPI + this.buildRequest("observation")
    ).then(({ data }) => {
      const { feedCreation, observations } = data;
      const { location: observationLocations } = observations;
      return { feedCreation, observationLocations };
    });
  }
  forecastAstronomy() {
    return this.request(
      this._weatherAPI + this.buildRequest("forecast_astronomy")
    ).then(({ data }) => {
      const { feedCreation, astronomy: astronomyLocation } = data;
      const { astronomy } = astronomyLocation;
      delete astronomyLocation.astronomy;

      return { feedCreation, astronomyLocation, astronomy };
    });
  }
  alerts() {
    return this.request(this._weatherAPI + this.buildRequest("alerts")).then(
      ({ data }) => {
        const { feedCreation, alerts: alertLocation } = data;
        const { alerts } = alertLocation;
        delete alertLocation.alerts;
        return { feedCreation, alertLocation, alerts };
      }
    );
  }
  nwsAlerts() {
    return this.request(
      this._weatherAPI + this.buildRequest("nws_alerts")
    ).then(({ data }) => {
      const { feedCreation } = data;
      return { feedCreation, nwsAlerts: data.nwsAlerts };
    });
  }
}

module.exports = Weather;
