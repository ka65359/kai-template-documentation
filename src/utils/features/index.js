const FLAG_DEFAULTS = {
  useSomeNewFeature: false
};

export default new (class {
  constructor() {
    this.flags = this._init(FLAG_DEFAULTS, window.location.search);
  }

  isEnabled(key) {
    return this.flags[key];
  }

  _init(defaults = [], search) {
    const flags = this._parseSearch(search);
    return Object.assign({}, defaults, flags);
  }

  _parseSearch(search) {
    try {
      const flags = {};
      const pairs = (search + "").match(/([^?=&]*)/g) || [];

      pairs.forEach((pair) => {
        const [key, value] = pair.split("=");
        flags[key] = (value + "").toLowerCase() === "true";
      });

      return flags;
    } catch (e) {
      return {};
    }
  }
})();
