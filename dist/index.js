"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var https = require("https");

var Weather = function () {
  function Weather() {
    _classCallCheck(this, Weather);

    this._authConfig = {
      app_code: undefined,
      app_id: undefined
    };
    this._location = undefined;
    this._language = undefined;
    this._metric = undefined;
    this._oneobservation = undefined;
    this._hourlydate = undefined;
    this._acceptedLanguageCodes = ["af-ZA", "sq", "am-ET", "ar", "as-IN", "az-AZ", "eu", "be", "bn-BD", "bn", "bs-BA", "bg-BG", "ca", "zh-CN", "zh-HK", "zh-TW", "hr-HR", "cs-CZ", "da-DK", "nl-NL", "en", "en-US", "et-EE", "fa", "fa-AF", "fi-FI", "fr-CA", "fr", "gl", "ka-GE", "de", "el-GR", "gu-IN", "ha", "he-IL", "hi-IN", "hu-HU", "is-IS", "ig-NG", "id-ID", "it", "ja-JP", "kn-IN", "ks-IN", "kk-KZ", "km-KH", "ky-KG", "ko-KR", "lo-LA", "lv-LV", "ln", "lt-LT", "mk-MK", "mg-MG", "ms-MY", "ml-IN", "mr-IN", "mn-MN", "no-NO", "or-IN", "pl-PL", "pt-BR", "pt-PT", "pa", "ps", "ro-RO", "ru-RU", "sr-YU", "st", "si-LK", "sk-SK", "sl-SL", "es-ES", "es-US", "sw", "sv", "tl-PH", "ta", "te-IN", "th-TH", "tg-TJ", "tr-TR", "tk", "uk-UA", "ur", "uz-UZ", "vi-VN", "xh", "yo", "zu"];
    this._acceptedLanguageNames = ["afrikaans", "albanian", "amharic", "arabic", "assamese", "azerbaijani", "basque", "belarusian", "bengali-bd", "bengali", "bosnian", "bulgarian", "catalan", "chinese_prc", "chinese_hk", "chinese_tw", "croatian", "czech", "danish", "dutch", "english", "english_us", "estonian", "farsi", "farsi-af", "finnish", "french_ca", "french", "galician", "georgian", "german", "greek", "gujarati", "hausa", "hebrew", "hindi", "hungarian", "icelandic", "igbo", "indonesian", "italian", "japanese", "kannada", "kashmiri", "kazakh", "khmer", "kirghiz", "korean", "lao", "latvian", "lingala", "lithuanian", "macedonian", "malagasy", "malay", "malayalam", "marathi", "mongolian", "norwegian", "oriya", "polish", "portuguese_br", "portuguese", "punjabi", "pushto", "romanian", "russian", "serbian", "sesotho", "sinhala", "slovak", "slovene", "spanish", "spanish_am", "swahili", "swedish", "tagalog", "tamil", "telugu", "thai", "tajik", "turkish", "turkmen_latin", "ukrainian", "urdu", "uzbek", "vietnamese", "xhosa", "yoruba", "zulu"];
    this._alertDescriptions = ["Strong Thunderstorms Anticipated – Strong thunderstorms anticipated during the next 24 hours", "Severe Thunderstorms Anticipated – Severe thunderstorms anticipated during the next 24 hours (supersedes the strong thunderstorm alert)", "Tornadoes Possible – Conditions are favorable for the formation of tornadoes (supercedes the severe thunderstorm alert)", "Heavy Rain Anticipated – More than 1 inch of rain in the next 24 hours (and less than 2 inches)", "Floods Anticipated – More than 2 inches of rain in the next 24 hours", "Flash Floods Anticipated – More than 1 inch of rain in any 6 hour time period (supersedes Flood Alert and Heavy Rain Alert)", "High Winds Anticipated – Winds greater than 35 mph", "Heavy Snow Anticipated – More than 6 inches of snow in a 12-hour period (anytime during the next 24 hours)", "Blizzard Conditions Anticipated – More than 6 inches of snow anticipated with winds greater than 35 mph", "Blowing Snow Anticipated – High winds anticipated with fresh snow on the ground (superseded by Blizzard Alert)", "Freezing Rain Anticipated – Light freezing rain and/or sleet anticipated", "Ice Storm Anticipated – Heavy freezing rain anticipated along with hazardous driving conditions", "Snow Advisory – More than 1 inch of snow anticipated during the next 24 hours (and less than 6 inches)", "Winter Weather Advisory – A mixture of winter-like conditions anticipated", "Heat Advisory – Comfort indices exceeding 110F", "Excessive Heat Alert – comfort indices above 115F with dew points above 80F (supersedes heat advisory)", "Wind Chill Alert – Issued when the wind chill is 20 below zero or lower with a minimum of a 10 mph wind", "Frost Advisory – Freezing temperatures and light winds (only issued during the Spring and Fall for low latitude/ low elevation locations)", "Freeze Advisory – A hard freeze anticipated (only issued during the Spring and Fall for low latitude/ low elevation locations)", "Fog Anticipated – Visibility expected to drop below 1/4 mile", "Dense Fog Anticipated – Visibility expected to drop below 1/8 mile (superSedes Fog Alert)", "Smog Anticipated – Low visibilities and warm temperatures", "Tropical Cyclone Conditions Anticipated – Winds greater than 40 mph with temperatures above 80F and heavy rain", "Hurricane Conditions Anticipated – Winds greater than 75 mph with temperatures above 80F and heavy rain", "Small Craft Advisory Anticipated – Winds greater than 25 mph anticipated", "Gale Warning Anticipated – Winds greater than 35 mph anticipated", "Winds greater than 35 mph anticipated – Winds greater than 50 mph anticipated", "Heavy Surf Advisory – Waves over 15 feet high", "Beach Erosion Advisory – High waves and wind anticipated"];
    this._weatherAPI = "https://weather.cit.api.here.com/weather/1.0/report.json?";
  }

  _createClass(Weather, [{
    key: "request",
    value: function request(url) {
      return new Promise(function (resolve, reject) {
        https.get(url, function (res) {
          var chunks = "";
          res.on("data", function (chunk) {
            chunks += chunk;
          });
          res.on("end", function () {
            if (res.statusCode === 200) {
              try {
                resolve({
                  data: JSON.parse(chunks)
                });
              } catch (e) {
                reject({
                  error: "Parse Error"
                });
              }
            } else {
              reject({
                response: JSON.parse(chunks),
                statusCode: res.statusCode
              });
            }
          });
        }).on("error", function (e) {
          reject(e);
        });
      });
    }
  }, {
    key: "_cleanObj",
    value: function _cleanObj(obj) {
      return Object.keys(obj).reduce(function (object, key) {
        if (obj[key] !== undefined) {
          object[key] = obj[key];
        }

        return object;
      }, {});
    }
  }, {
    key: "_objToParms",
    value: function _objToParms(obj) {
      return Object.keys(this._cleanObj(obj)).map(function (key) {
        return "".concat(key, "=").concat(obj[key].toString().replace(/\s+/g, ""));
      }).join("&");
    }
  }, {
    key: "validateLanguage",
    value: function validateLanguage(language) {
      if (this._acceptedLanguageCodes.indexOf(language) === -1 && this._acceptedLanguageNames.indexOf(language) === -1) {
        throw new Error("Invalid language");
      }
    }
  }, {
    key: "buildRequest",
    value: function buildRequest(product) {
      var location = this._location,
          language = this._language,
          metric = this._metric,
          oneobservation = this._oneobservation,
          hourlydate = this._hourlydate,
          authConfig = this._authConfig;

      if (authConfig.app_id === undefined || authConfig.app_code === undefined) {
        throw new Error("Must call setAuth before requesting data.");
      }

      if (this._language) {
        this.validateLanguage(this._language);
      }

      return "".concat(this._objToParms(_objectSpread({
        product: product
      }, location, {
        language: language,
        metric: metric,
        oneobservation: oneobservation,
        hourlydate: hourlydate
      }, authConfig)));
    }
  }, {
    key: "resetSettings",
    value: function resetSettings() {
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
  }, {
    key: "setAuth",
    value: function setAuth(auth) {
      var app_code = auth.app_code,
          app_id = auth.app_id;
      this._authConfig = {
        app_code: app_code,
        app_id: app_id
      };
    }
  }, {
    key: "hourlydate",
    value: function hourlydate(date) {
      this._hourlydate = date;
    }
  }, {
    key: "oneobservation",
    value: function oneobservation(_oneobservation) {
      this._oneobservation = _oneobservation;
    }
  }, {
    key: "metric",
    value: function metric(_metric) {
      this._metric = _metric;
    }
  }, {
    key: "language",
    value: function language(_language) {
      this._language = _language;
    }
  }, {
    key: "location",
    value: function location(_location) {
      this._location = _location;
    }
  }, {
    key: "alertTypeDescription",
    value: function alertTypeDescription(type) {
      return this._alertDescriptions[parseInt(type) - 1];
    }
  }, {
    key: "forecastSimple",
    value: function forecastSimple() {
      return this.request(this._weatherAPI + this.buildRequest("forecast_7days_simple")).then(function (_ref) {
        var data = _ref.data;
        var feedCreation = data.feedCreation,
            dailyForecasts = data.dailyForecasts;
        var forecastLocation = dailyForecasts.forecastLocation;
        var forecast = forecastLocation.forecast;
        delete forecastLocation.forecast;
        return {
          feedCreation: feedCreation,
          forecastLocation: forecastLocation,
          forecast: forecast
        };
      });
    }
  }, {
    key: "forecastExtended",
    value: function forecastExtended() {
      return this.request(this._weatherAPI + this.buildRequest("forecast_7days")).then(function (_ref2) {
        var data = _ref2.data;
        var feedCreation = data.feedCreation,
            forecasts = data.forecasts;
        var forecastLocation = forecasts.forecastLocation;
        var forecast = forecastLocation.forecast;
        delete forecastLocation.forecast;
        return {
          feedCreation: feedCreation,
          forecastLocation: forecastLocation,
          forecast: forecast
        };
      });
    }
  }, {
    key: "forecastHourly",
    value: function forecastHourly() {
      return this.request(this._weatherAPI + this.buildRequest("forecast_hourly")).then(function (_ref3) {
        var data = _ref3.data;
        var feedCreation = data.feedCreation,
            hourlyForecasts = data.hourlyForecasts;
        var forecastLocation = hourlyForecasts.forecastLocation;
        var forecast = forecastLocation.forecast;
        delete forecastLocation.forecast;
        return {
          feedCreation: feedCreation,
          forecastLocation: forecastLocation,
          forecast: forecast
        };
      });
    }
  }, {
    key: "forecastObservation",
    value: function forecastObservation() {
      return this.request(this._weatherAPI + this.buildRequest("observation")).then(function (_ref4) {
        var data = _ref4.data;
        var feedCreation = data.feedCreation,
            observations = data.observations;
        var observationLocations = observations.location;
        return {
          feedCreation: feedCreation,
          observationLocations: observationLocations
        };
      });
    }
  }, {
    key: "forecastAstronomy",
    value: function forecastAstronomy() {
      return this.request(this._weatherAPI + this.buildRequest("forecast_astronomy")).then(function (_ref5) {
        var data = _ref5.data;
        var feedCreation = data.feedCreation,
            astronomyLocation = data.astronomy;
        var astronomy = astronomyLocation.astronomy;
        delete astronomyLocation.astronomy;
        return {
          feedCreation: feedCreation,
          astronomyLocation: astronomyLocation,
          astronomy: astronomy
        };
      });
    }
  }, {
    key: "alerts",
    value: function alerts() {
      return this.request(this._weatherAPI + this.buildRequest("alerts")).then(function (_ref6) {
        var data = _ref6.data;
        var feedCreation = data.feedCreation,
            alertLocation = data.alerts;
        var alerts = alertLocation.alerts;
        delete alertLocation.alerts;
        return {
          feedCreation: feedCreation,
          alertLocation: alertLocation,
          alerts: alerts
        };
      });
    }
  }, {
    key: "nwsAlerts",
    value: function nwsAlerts() {
      return this.request(this._weatherAPI + this.buildRequest("nws_alerts")).then(function (_ref7) {
        var data = _ref7.data;
        var feedCreation = data.feedCreation;
        return {
          feedCreation: feedCreation,
          nwsAlerts: data.nwsAlerts
        };
      });
    }
  }, {
    key: "getSettings",
    get: function get() {
      return {
        location: this._location,
        language: this._language,
        metric: this._metric,
        oneobservation: this._oneobservation,
        hourlydate: this._hourlydate
      };
    }
  }, {
    key: "getAuth",
    get: function get() {
      return this._authConfig;
    }
  }, {
    key: "apiUrl",
    get: function get() {
      return this._weatherAPI;
    }
  }, {
    key: "acceptedLanguageCodes",
    get: function get() {
      return this._acceptedLanguageCodes;
    }
  }, {
    key: "acceptedLanguageNames",
    get: function get() {
      return this._acceptedLanguageNames;
    }
  }, {
    key: "alertTypeDescriptions",
    get: function get() {
      return this._alertDescriptions;
    }
  }]);

  return Weather;
}();

module.exports = Weather;