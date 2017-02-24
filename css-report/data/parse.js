let _ = require( 'lodash' );
let randomID = require( 'random-id' );
let cssstats = require( 'cssstats' );
let fs = require( 'fs-extra' );
let moment = require( 'moment' );

let data = require( './data.json' );

// These are also defined in Sheet.vue in case we want different things for Page vs Stylesheet
let uniqueProperties = [ 'color', 'backgroundColor', 'fontSize', 'fontFamily', 'mediaQueries' ]; // Unique properties we want to get details about

function getUniques( statObj, properties ) {
    let returnObj = {};

    properties.forEach( ( prop ) => {
        returnObj[ prop ] = {};
        if ( prop === 'fontSize' ) {
            returnObj[ prop ].allValues = statObj.stats.declarations.getAllFontSizes();
        } else if ( prop === 'fontFamily' ) {
            returnObj[ prop ].allValues = statObj.stats.declarations.getAllFontFamilies();
        } else if ( prop === 'mediaQueries' ) {
            returnObj[ prop ].allValues = statObj.stats.mediaQueries.values;
        } else {
            returnObj[ prop ].allValues = statObj.stats.declarations.properties[ _.kebabCase( prop ) ];
        }

        returnObj[ prop ].counts = _.countBy( returnObj[ prop ].allValues, _.identity );
        returnObj[ prop ].total = _.keys( returnObj[ prop ].counts ).length;
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

function parseData( data, cedar ) {
    let page = data.page,
        links = data.links,
        tags = data.styles,
        allCss = data.css;

    let overview = {};
    overview.stats = cssstats( allCss );
    overview.uniques = getUniques( overview, uniqueProperties );
    overview.styleSheetsCount = links.length;
    overview.styleTagsCount = tags.length;

    // Get CSSStats for stylesheets
    let statsArr = [];
    links.forEach( ( link ) => {
        statsArr.push( getStats( link, false ) );
    } );
    tags.forEach( ( tag ) => {
        statsArr.push( getStats( tag, true ) );
    } );

    // Get unique properties per stylesheet and build page overview data from stats
    let allStats = [];
    let uniques = {};
    let cedarDiff = {};
    statsArr.forEach( ( statObj ) => {

        let tempUniques = {};
        tempUniques.stats = statObj;
        tempUniques.id = randomID( 10 );
        tempUniques.name = statObj.name;
        tempUniques.uniques = getUniques( statObj, uniqueProperties );
        tempUniques.specificityGraph = statObj.stats.selectors.getSpecificityGraph();
        tempUniques.specificityArr = _.slice( statObj.stats.selectors.getSortedSpecificity(), 0, 10 );
        tempUniques.cedar = {};

        // Parse the unique stats
        uniqueProperties.forEach( ( prop ) => {
            uniques[ prop ] = _.mergeWith( uniques[ prop ], tempUniques.uniques[ prop ].counts, ( objVal, srcVal ) => {
                if ( !objVal ) {
                    objVal = 0;
                }
                return objVal + srcVal;
            } );

            // individual sheet diff with Cedar
            tempUniques.cedar[ prop ] = {};
            tempUniques.cedar[ prop ].data = _.difference( _.keys( tempUniques.uniques[ prop ].counts ), _.keys( cedar[ prop ].counts ) );
            tempUniques.cedar[ prop ].total = _.keys( tempUniques.cedar[ prop ].data ).length;

            // total diff with Cedar
            cedarDiff[ prop ] = {};
            cedarDiff[ prop ].data = _.difference( _.keys( uniques[ prop ] ), _.keys( cedar[ prop ].counts ) );
            cedarDiff[ prop ].total = _.keys( cedarDiff[ prop ].data ).length;

            overview.uniques[ prop ].total = _.keys( uniques[ prop ] ).length;
            overview.uniques[ prop ].diff = cedarDiff[ prop ].total;
        } );

        allStats.push( tempUniques );
    } );

    // bind to returnObj
    let returnObj = {};
    returnObj.page = page;
    returnObj.overview = overview;
    returnObj.allStats = allStats;
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
        let pageObj = parseData( d, cedarUniques );
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