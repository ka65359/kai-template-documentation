import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// https://github.com/tmpvar/jsdom/issues/1137
if (!window.localStorage) {
  window.localStorage = {};
  Object.assign(window.localStorage, {
    removeItem: function removeItem(key) {
      delete this[key];
    }.bind(window.localStorage),
    setItem: function setItem(key, val) {
      this[key] = String(val);
    }.bind(window.localStorage),
    getItem: function getItem(key) {
      return this[key];
    }.bind(window.localStorage)
  });
}

// workaround for this issue
//  https://github.com/jsdom/jsdom/issues/1721#issuecomment-439222748
function noOp() {}
if (typeof window.URL.createObjectURL === "undefined") {
  Object.defineProperty(window.URL, "createObjectURL", { value: noOp });
}
configure({ adapter: new Adapter() });
