let _ = require( 'lodash' );
let randomID = require( 'random-id' );
let cssstats = require( 'cssstats' );
let fs = require( 'fs-extra' );
let moment = require( 'moment' );

let data = require( './data.json' );

// These are also defined in Sheet.vue in case we want different things for Page vs Stylesheet
let uniqueProperties = [ 'color', 'backgroundColor', 'fontSize', 'fontFamily', 'mediaQueries' ]; // Unique properties we want to get details about
let metrics = [ 'size', 'rules', 'selectors', 'declarations' ]; // Things we want a total count of for the page-stats area

function getTotals( stats, totalObj ) {
    totalObj.size += stats.gzipSize;
    totalObj.rules += stats.rules.total;
    totalObj.selectors += stats.selectors.total;
    totalObj.declarations += stats.declarations.total;

    return totalObj;
}

function getUniques( statObj, properties ) {
    let returnObj = {};
    returnObj.id = randomID( 10 );
    returnObj.name = statObj.name;
    returnObj.stats = statObj.stats;
    // returnObj.css = statObj.css;

    properties.forEach( ( prop ) => {
        returnObj[ prop ] = {};
        if ( prop === 'fontSize' ) {
            returnObj[ prop ].allValues = statObj.stats.declarations.getAllFontSizes();
            returnObj[ prop ].counts = _.countBy( returnObj[ prop ].allValues, _.identity );
        } else if ( prop === 'fontFamily' ) {
            returnObj[ prop ].allValues = statObj.stats.declarations.getAllFontFamilies();
            returnObj[ prop ].counts = _.countBy( returnObj[ prop ].allValues, _.identity );
        } else if ( prop === 'mediaQueries' ) {
            returnObj[ prop ].allValues = statObj.stats.mediaQueries.values;
            returnObj[ prop ].counts = _.countBy( returnObj[ prop ].allValues, _.identity );
        } else {
            returnObj[ prop ].allValues = statObj.stats.declarations.properties[ _.kebabCase( prop ) ];
            returnObj[ prop ].counts = _.countBy( returnObj[ prop ].allValues, _.identity );
        }
    } );

    return returnObj;
}

function getStats( style, isStyle ) {
    let styleObj = {};
    let css;
    if ( isStyle ) {
        styleObj.name = 'Internal Stylesheet <style>';
        css = style;
    } else {
        styleObj.name = style.link;
        css = style.css;
    }
    styleObj.stats = cssstats( css );

    return styleObj;
}

function parseData( page, links, tags, cedar ) {
    // set up overview object
    let overview = {};
    metrics.forEach( ( metric ) => {
        overview[ metric ] = 0;
    } );

    // Get CSSStats
    let statsArr = [];
    links.forEach( ( link ) => {
        statsArr.push( getStats( link, false ) );
    } );
    tags.forEach( ( tag ) => {
        statsArr.push( getStats( tag, true ) );
    } );

    // Get unique stats and build overview data from stats
    let allStats = [];
    let uniques = {};
    let cedarDiff = {};
    statsArr.forEach( ( statObj ) => {
        let tempUniques = getUniques( statObj, uniqueProperties );
        allStats.push( tempUniques );

        // Parse the unique stats
        uniqueProperties.forEach( ( prop ) => {
            uniques[ prop ] = _.mergeWith( uniques[ prop ], tempUniques[ prop ].counts, ( objVal, srcVal ) => {
                if ( !objVal ) {
                    objVal = 0;
                }
                return objVal + srcVal;
            } );

            cedarDiff[ prop ] = {};
            cedarDiff[ prop ].data = _.difference( _.keys( uniques[ prop ] ), _.keys( cedar[ prop ].counts ) );
            cedarDiff[ prop ].total = _.keys( cedarDiff[ prop ].data ).length;

            overview[ prop ] = _.keys( uniques[ prop ] ).length;
        } );

        overview = getTotals( statObj.stats, overview );
    } );

    // Page Overview Stats
    overview.styleSheetsCount = links.length;
    overview.styleTagsCount = tags.length;

    // bind to returnObj
    let returnObj = {};
    returnObj.page = page;
    returnObj.overview = overview;
    returnObj.allStats = allStats;
    returnObj.uniques = uniques;
    returnObj.cedarDiff = cedarDiff;
    returnObj.cedarUniques = cedar;

    return returnObj;
}

function main( data, cedarCss ) {
    // Run current cedar css through to get stats for comparison later
    let cedar = {};
    cedar.link = 'Cedar';
    cedar.css = cedarCss;
    let cedarStats = getStats( cedar );
    let cedarUniques = getUniques( cedarStats, uniqueProperties );

    let finalArr = [];
    let sorted = _.sortBy( data, ( d ) => {
        return d.page.id;
    } );
    sorted.forEach( ( d ) => {
        let pageObj = parseData( d.page, d.links, d.styles, cedarUniques );
        finalArr.push( pageObj );
    } );

    // console.log( finalArr );
    let finalObj = {};
    finalObj.updated = moment().format( 'MMMM Do YYYY, h:mm:ss a' );
    finalObj.data = finalArr;
    let json = JSON.stringify( finalObj );

    fs.outputFile( './src/assets/data.json', json, function ( err ) {
        if ( err ) {
            console.error( err );
        }
        console.log( 'Data Processed!' );
    } );
}

main( data.data, data.cedar );