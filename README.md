# rei-sequoia
Tooling to help support REI digital design systems

## Audit extension
1. Clone or download repo
2. In Chrome open ``Settings`` > ``Extensions``
3. Check ``Developer mode``
4. Click ``Load unpacked extension``
5. Navigate to directory of ``audit-chrome-extension`` and click OK
7. Click ``Options`` for the extension (it will set up for 'rei-cedar' by default) and configure as needed then click ``Save``.
8. Click the extension icon to audit any page currently being viewed.

## CSS Report
View the most recently run report [here](https://rei.github.io/rei-sequoia/css-report/dist/index.html)
**OR**
If you'd like to run it locally, follow these instructions:
1. Clone or download repo
2. ``cd css-report``
3. ``npm install``
4. ``npm run report`` (this runs ``npm run scrape`` which gets the data and saves the raw values to a file, ``npm run process`` which reads that file and generates statistics for the pages then saves them to a file the app uses, and  ``npm run dev`` which loads the webpack server and opens the results)

To update the gh-page report, run ``npm run update`` and commit changes back to the master branch.
