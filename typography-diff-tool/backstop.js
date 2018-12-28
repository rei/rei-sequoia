const process = require('process');
const _ = require('lodash');

const isTest = process.env.NODE_ENV === 'test' ? true : false;

// Add pages to test here.
const scenarioConfigs = [
  {
    label: 'Category',
    url: 'https://www.rei.com/c/snowboards',
  },
  {
    label: 'Search',
    url: 'https://www.rei.com/search?q=Burton',
  },
  {
    label: 'PDP',
    url: 'https://www.rei.com/product/122302/arbor-element-black-snowboard-mens-20182019',
  },
];

const scenarioDefaults = {
  "referenceUrl": "",
  "readyEvent": "",
  "readySelector": "",
  "delay": 500,
  "hideSelectors": [],
  "removeSelectors": [],
  "hoverSelector": "",
  "clickSelector": "",
  "postInteractionWait": 0,
  "selectors": [],
  "selectorExpansion": true,
  "expect": 0,
  "misMatchThreshold": 0.1,
  "requireSameDimensions": true,
  "isTest": isTest
}

function makeScenarios() {
  const scenariosArr = [];
  scenarioConfigs.forEach((config) => {
    scenariosArr.push(_.merge({}, config, scenarioDefaults));
  });
  return scenariosArr;
}

module.exports = {
  "id": "font-testing",
  "viewports": [
    {
      "label": "xs",
      "width": 360,
      "height": 640
    },
    {
      "label": "sm",
      "width": 768,
      "height": 1024
    },
    {
      "label": "md",
      "width": 1024,
      "height": 768
    },
    {
      "label": "lg",
      "width": 1366,
      "height": 768
    },
    {
      "label": "xl",
      "width": 1920,
      "height": 1080
    }
  ],
  "onBeforeScript": "puppet/onBefore.js",
  "onReadyScript": "puppet/onReady.js",
  "scenarios": makeScenarios(),
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "backstop_data/engine_scripts",
    "html_report": "backstop_data/html_report",
    "ci_report": "backstop_data/ci_report"
  },
  "report": ["browser"],
  "engine": "puppeteer",
  "engineOptions": {
    // "args": ['--no-sandbox']
  },
  "asyncCaptureLimit": 5,
  "asyncCompareLimit": 20,
  "debug": false,
  "debugWindow": false
}
