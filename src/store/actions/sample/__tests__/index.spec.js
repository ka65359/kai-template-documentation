import fetchMock from "fetch-mock";
import { sampleFetch } from "../index.js";
//import store from "store";
//import _ from 'lodash';

// mock must be at top outside tests
/*
jest.mock('lodash');
const actualLodash = jest.requireActual('lodash');
const trueJSONParse = JSON.parse;
*/

describe("sample actions tests", function() {
  afterAll(function() {
    fetchMock.restore();
  });

  describe("sampleFetch()", () => {
    let dispatch;
    let payload;
    let rslt;

    beforeEach(function() {
      payload = {};
      dispatch = jest.fn();
    });

    afterEach(function() {
      dispatch.mockReset();
      dispatch = null;
      payload = null;
      rslt = null;
      fetchMock.reset();
      fetchMock.restore();
    });

    test("it handles no params", (done) => {
      fetchMock.get("*", {});
      rslt = sampleFetch()(dispatch);
      expect(rslt).toBeInstanceOf(Promise);
      rslt
        .then(() => {
          let err = "We succeeded when we shouldn't have";
          expect(err).toBeFalsey();
        })
        .catch(() => {
          expect(dispatch).not.toHaveBeenCalled();
          done();
        });
    });

    test("it handles internal server errors", (done) => {
      fetchMock.mock("*", 500);
      rslt = sampleFetch(payload)(dispatch);
      expect(rslt).toBeInstanceOf(Promise);
      rslt
        .then(() => {
          let err = "We succeeded when we shouldn't have";
          expect(err).toBeFalsey();
        })
        .catch(() => {
          expect(dispatch).not.toHaveBeenCalled();
          done();
        });
    });

    test("it calls dispatch on success with hits", (done) => {
      fetchMock.get("*", {
        ok: true,
        status: 200,
        hits: [1, 2, 3]
      });
      rslt = sampleFetch(payload)(dispatch);
      expect(rslt).toBeInstanceOf(Promise);
      rslt
        .then(() => {
          // expect(someFunc).toHaveBeenCalled();
          done();
        })
        .catch((err) => {
          expect("Error: " + err).toBeFalsey();
        });
    });
  });

  describe("moreTests()", function() {
    beforeEach(function() {
      /*
      Object.keys(actualLodash).forEach(entry => {
        try {
          _[entry].mockImplementation(actualLodash[entry]);
        } catch (e) {
          // do nothing
        }
      });
      */
    });

    afterEach(function() {});

    xtest("don't run this test", () => {
      expect(true).toBeFalsey();
    });
  });
});
