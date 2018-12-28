# Typography-diff-tool

Created to help with testing font face updates to get an idea of the impact a font change will have.

## Setup

cd to the directory and `npm install`

## 1. Defining pages to test

Add the `url` and a `label` to the `scenarioConfigs` array defined in `backstop.js`. Each of these will then be constructed in to scenarios for backstopjs to take screenshots of. Viewport sizes can also be defined here.

## 2. Adding fonts to override

The idea for this solution came from [here](https://www.zachleat.com/web/rename-font/)

Add new `@font-face` rules in `backstop_data/engine_scripts/puppet/onReady.js`. This injects a `<style>` definition into the document with the string defined there as the content.

`font-family`, `font-weight`, and (sometimes) `font-style` need to match the definition you are trying to override. You also need to have the font installed locally on your machine for the local() src definitions to work.

## 3. Testing

`npm run reference` to generate reference screenshots

`npm run compare` to generate test images and diffs to the reference images

NOTE: `@font-face` overrides from step 2 are only applied during `npm run compare`.
