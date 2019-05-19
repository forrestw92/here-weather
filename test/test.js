const mocha = require("mocha");
const chai = require("chai"),
  expect = chai.expect,
  should = chai.should();
const Weather = require("../dist/index");
const weather = new Weather();
const authConfig = {
  app_id: "DemoAppId01082013GAL",
  app_code: "AJKnXv84fjrb0KIHawS0Tg"
};
describe("here-weather", function() {
  describe("Settings", function() {
    describe("Set Auth", function() {
      weather.setAuth(authConfig);
      it("Should be object ", function() {
        weather.getAuth.should.be.a("object");
      });
      it("Should have app_id and app_code ", function() {
        const auth = weather.getAuth;
        expect(auth).to.have.property("app_id");
        expect(auth).to.have.property("app_code");
      });
      it("Should have app_id and app_code ", function() {
        const auth = weather.getAuth;
        expect(auth).to.have.property("app_id");
        expect(auth).to.have.property("app_code");
      });
      it("Should equal user input ", function() {
        const auth = weather.getAuth;
        expect(auth.app_id).to.equal(authConfig.app_id);
        expect(auth.app_code).to.equal(authConfig.app_code);
      });
    });
    describe("Set settings", function() {
      it("Should set metric", function() {
        weather.metric(false);
        const { metric } = weather.getSettings;
        expect(metric).to.equal(false);
      });
      it("Should set language", function() {
        weather.language("english_us");
        const { language } = weather.getSettings;
        expect(language).to.equal("english_us");
      });
      it("Should set one observation", function() {
        weather.oneobservation(true);
        const { oneobservation } = weather.getSettings;
        expect(oneobservation).to.equal(true);
      });
      it("Should set hourlydate", function() {
        weather.hourlydate("2019-05-15T16:21:40");
        const { hourlydate } = weather.getSettings;
        expect(hourlydate).to.equal("2019-05-15T16:21:40");
      });
      it("Should set location by name", function() {
        weather.location({ name: "Austin,Texas" });
        const { location } = weather.getSettings;
        expect(location).to.have.property("name");
        expect(location.name).to.equal("Austin,Texas");
      });
      it("Should set location by zip", function() {
        weather.location({ zipcode: 73301 });
        const { location } = weather.getSettings;
        expect(location).to.have.property("zipcode");
        expect(location.zipcode).to.equal(73301);
      });
      it("Should set location by latitude and longitude", function() {
        weather.location({ latitude: 30.2672, longitude: 97.7431 });
        const { location } = weather.getSettings;
        expect(location).to.have.property("latitude");
        expect(location).to.have.property("longitude");
        expect(location.latitude).to.equal(30.2672);
        expect(location.longitude).to.equal(97.7431);
      });
      describe("Validate Language", function() {
        it("Should fail on invalid language", function() {
          weather.language("Not_a_language");
          expect(function() {
            weather.validateLanguage(weather.getSettings.language);
          }).to.throw("Invalid language");
        });
      });
    });
    describe("Reset Settings", function() {
      it("Should reset all settings", function() {
        weather.resetSettings();
        const {
          location,
          hourlydate,
          oneobservation,
          language,
          metric
        } = weather.getSettings;
        const { app_id, app_code } = weather.getAuth;
        expect(location).to.equal(undefined);
        expect(hourlydate).to.equal(undefined);
        expect(oneobservation).to.equal(undefined);
        expect(language).to.equal(undefined);
        expect(metric).to.equal(undefined);
        expect(app_id).to.equal(undefined);
        expect(app_code).to.equal(undefined);
      });
    });
  });
  describe("Request Data", function() {
    it("Should return data", async function() {
      weather.setAuth(authConfig);
      weather.location({ name: "Austin,Texas" });
      const api = weather.apiUrl;
      const query = api + weather.buildRequest("forecast_7days");
      const response = await weather.request(query);
      response.should.be.a("object");
    });
    it("Should auth fail", async function() {
      const api = weather.apiUrl;
      await weather
        .request(api + "invalid_query")
        .catch(({ response, statusCode }) => {
          response.should.be.a("object");
          expect(response).to.have.property("Type");
          expect(response).to.have.property("Message");
          response.Message.should.be.a("Array");
          statusCode.should.equal(400);
        });
    });
    it("Should fail by invalid product", async function() {
      const api = weather.apiUrl;
      const query = `${api}?product=invalid_product&app_id=${
        authConfig.app_id
      }&app_code=${authConfig.app_code}`;
      await weather.request(query).catch(({ response, statusCode }) => {
        response.should.be.a("object");
        expect(response).to.have.property("Type");
        expect(response).to.have.property("Message");
        response.Message.should.be.a("Array");
        expect(response.Message[0]).to.equal(
          "Mandatory Weather product is missing"
        );
        statusCode.should.equal(400);
      });
    });
    it("Should fail bad url", async function() {
      await weather.request().catch(error => {
        expect(error.message).to.equal("connect ECONNREFUSED 127.0.0.1:443");
      });
    });
  });
  describe("Request Query", function() {
    beforeEach("Reset Settings", function() {
      weather.resetSettings();
      weather.setAuth(authConfig);
    });

    it("Should have correct query string", function() {
      weather.language("english_us");
      weather.location({ name: "Austin,Texas" });
      weather.metric(false);
      weather.oneobservation(false);
      weather.hourlydate("2019-05-15T16:21:40");
      const request = weather.buildRequest("forecast_7days_simple");
      const searchParams = new URLSearchParams(request);
      expect(searchParams.has("metric")).to.equal(true);
      expect(searchParams.has("name")).to.equal(true);
      expect(searchParams.has("oneobservation")).to.equal(true);
      expect(searchParams.has("app_id")).to.equal(true);
      expect(searchParams.has("app_code")).to.equal(true);
      expect(searchParams.has("language")).to.equal(true);
      expect(searchParams.has("hourlydate")).to.equal(true);
      expect(searchParams.has("product")).to.equal(true);

      expect(searchParams.get("metric")).to.equal("false");
      expect(searchParams.get("name")).to.equal("Austin,Texas");
      expect(searchParams.get("oneobservation")).to.equal("false");
      expect(searchParams.get("app_id")).to.equal(authConfig.app_id);
      expect(searchParams.get("app_code")).to.equal(authConfig.app_code);
      expect(searchParams.get("language")).to.equal("english_us");
      expect(searchParams.get("hourlydate")).to.equal("2019-05-15T16:21:40");
      expect(searchParams.get("product")).to.equal("forecast_7days_simple");
    });

    it("Should delete undefined settings", function() {
      weather.metric(undefined);
      weather.location(undefined);
      weather.oneobservation(undefined);
      weather.hourlydate(undefined);
      weather.language(undefined);
      const request = weather.buildRequest("forecast_7days_simple");
      const searchParams = new URLSearchParams(request);
      expect(searchParams.has("metric")).to.equal(false);
      expect(searchParams.has("location")).to.equal(false);
      expect(searchParams.has("oneobservation")).to.equal(false);
      expect(searchParams.has("hourlydate")).to.equal(false);
      expect(searchParams.has("language")).to.equal(false);
    });
    it("Should fail with no auth", function() {
      weather.setAuth({ app_code: undefined, app_id: undefined });
      expect(function() {
        weather.buildRequest("forecast_7days_simple");
      }).to.throw("Must call setAuth before requesting data.");
    });
  });
  describe("Forecast Request", function() {
    before("Reset Settings", function() {
      weather.resetSettings();
      weather.setAuth(authConfig);
      weather.location({ name: "Austin,Texas" });
    });
    describe("Forecast 7 Days - Simple", function() {
      it("Should have correct return data", async function() {
        const {
          feedCreation,
          forecastLocation,
          forecast
        } = await weather.forecastSimple();
        const feedCreationDate = new Date(feedCreation);
        feedCreationDate.should.be.a("date");
        forecastLocation.should.be.a("object");
        forecast.should.be.a("array");
      });
    });

    describe("Forecast 7 Days - Extended", function() {
      it("Should have correct return data", async function() {
        const {
          feedCreation,
          forecastLocation,
          forecast
        } = await weather.forecastExtended();
        const feedCreationDate = new Date(feedCreation);
        feedCreationDate.should.be.a("date");
        forecastLocation.should.be.a("object");
        forecast.should.be.a("array");
      });
    });
    describe("Forecast Astronomy", function() {
      it("Should have correct return data", async function() {
        const {
          feedCreation,
          astronomyLocation,
          astronomy
        } = await weather.forecastAstronomy();
        const feedCreationDate = new Date(feedCreation);
        feedCreationDate.should.be.a("date");
        astronomyLocation.should.be.a("object");
        astronomy.should.be.a("array");
      });
    });

    describe("Forecast Hourly", function() {
      it("Should have correct return data", async function() {
        const {
          feedCreation,
          forecastLocation,
          forecast
        } = await weather.forecastHourly();
        const feedCreationDate = new Date(feedCreation);
        feedCreationDate.should.be.a("date");
        forecastLocation.should.be.a("object");
        forecast.should.be.a("array");
      });
    });
    describe("Forecast By Observation", function() {
      it("Should return many observation locations", async function() {
        weather.oneobservation(false);
        weather.location({ latitude: 30.264264, longitude: -97.747502 });
        const {
          feedCreation,
          observationLocations
        } = await weather.forecastObservation();
        const feedCreationDate = new Date(feedCreation);
        feedCreationDate.should.be.a("date");
        observationLocations.should.be.a("array");
      });
      it("Should return one observation location", async function() {
        weather.oneobservation(true);
        weather.location({ latitude: 30.264264, longitude: -97.747502 });
        const {
          feedCreation,
          observationLocations
        } = await weather.forecastObservation();
        const feedCreationDate = new Date(feedCreation);
        feedCreationDate.should.be.a("date");
        observationLocations.should.be.a("array");
        observationLocations.length.should.equal(1);
      });
    });
    describe("Forecast Alerts", function() {
      it("Should have correct return data", async function() {
        const { feedCreation, alertLocation, alerts } = await weather.alerts();

        const feedCreationDate = new Date(feedCreation);
        feedCreationDate.should.be.a("date");
        alertLocation.should.be.a("object");
        alerts.should.be.a("array");
      });
    });
    describe("Forecast NWS Alerts", function() {
      it("Should have correct return data", async function() {
        const { feedCreation, nwsAlerts } = await weather.nwsAlerts();
        const feedCreationDate = new Date(feedCreation);
        feedCreationDate.should.be.a("date");
        try {
          nwsAlerts.should.be.a("object");
        } catch (e) {
          expect(nwsAlerts).to.equal(undefined);
        }
      });
    });
  });
  describe("Function Test", function() {
    it("Should return weather API", function() {
      const api = weather.apiUrl;
      expect(api).to.equal(
        "https://weather.cit.api.here.com/weather/1.0/report.json?"
      );
    });
    it("Should return language codes", function() {
      expect(weather.acceptedLanguageCodes).to.be.a("array");
      weather.acceptedLanguageCodes.length.should.equal(90);
    });
    it("Should return language names", function() {
      expect(weather.acceptedLanguageNames).to.be.a("array");
      weather.acceptedLanguageNames.length.should.equal(90);
    });
    it("Should return alert type descriptions", function() {
      expect(weather.alertTypeDescriptions).to.be.a("array");
      weather.alertTypeDescriptions.length.should.equal(29);
    });
    it("Should return single alert type description", function() {
      const type = weather.alertTypeDescription(1);
      expect(type).to.equal(
        "Strong Thunderstorms Anticipated – Strong thunderstorms anticipated during the next 24 hours"
      );
    });
  });
});
