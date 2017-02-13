var _ = require( 'lodash' );
let cssstats = require( 'cssstats' );
let randomID = require( 'random-id' );

module.exports = {
    parseUniques: function ( stats ) {
        if ( !stats ) {
            return false;
        }

        var uniques = {};
        var uniqueProperties = [ 'color', 'background-color' ]; // font-size, font-family, z-index, and media queries done below

        uniqueProperties.forEach( ( property ) => {
            uniques[ _.camelCase( property ) ] = _.uniq( stats.declarations.properties[ property ] );
        } );

        uniques.fontSize = _.uniq( stats.declarations.getAllFontSizes() );
        uniques.fontFamily = _.uniq( stats.declarations.getAllFontFamilies() );
        uniques.fontSizeSorted = this.sortFontSizes( uniques.fontSize );
        uniques.mediaQueries = _.uniq( stats.mediaQueries.values );
        uniques.zIndexSorted = this.sortZIndices( uniques.zIndex );

        return uniques;
    },
    parsePageData: function ( links, styles ) {
        let totalObj = {};
        totalObj.size = 0;
        totalObj.rules = 0;
        totalObj.selectors = 0;
        totalObj.declarations = 0;
        totalObj.mediaQueries = 0;
        totalObj.styleSheetsCount = links.length;
        totalObj.styleTagsCount = styles.length;
        totalObj.uniques = {};
        totalObj.styleData = [];
        let uniquesArr = [];

        // Linked css stats
        links.forEach( ( link ) => {
            let linkObj = {};
            linkObj.name = link.link;
            linkObj.css = link.css;
            linkObj.uniques = {};
            linkObj.trueUniques = {};
            linkObj.stats = cssstats( link.css );
            if ( linkObj.stats ) {
                totalObj.size += linkObj.stats.gzipSize;
                totalObj.rules += linkObj.stats.rules.total;
                totalObj.selectors += linkObj.stats.selectors.total;
                totalObj.declarations += linkObj.stats.declarations.total;
                linkObj.uniques.id = randomID( 10 );
                linkObj.uniques.data = this.parseUniques( linkObj.stats );
                uniquesArr.push( linkObj.uniques );
            }
            totalObj.styleData.push( linkObj );
        } )

        // Style tag stats
        styles.forEach( ( style ) => {
            let styleObj = {};
            styleObj.name = '<style> tag';
            styleObj.css = style;
            styleObj.uniques = {};
            styleObj.trueUniques = {};
            styleObj.stats = cssstats( style );
            if ( styleObj.stats ) {
                totalObj.size += styleObj.stats.gzipSize;
                totalObj.rules += styleObj.stats.rules.total;
                totalObj.selectors += styleObj.stats.selectors.total;
                totalObj.declarations += styleObj.stats.declarations.total;
                styleObj.uniques.id = randomID( 10 );
                styleObj.uniques.data = this.parseUniques( styleObj.stats );
                uniquesArr.push( styleObj.uniques );
            }
            totalObj.styleData.push( styleObj );
        } );

        // Get total uniques
        uniquesArr.forEach( ( unique ) => {
            let uniqueData = unique.data
            let props = _.keys( uniqueData );
            props.forEach( function ( prop ) {
                totalObj.uniques[ prop ] = _.union( totalObj.uniques[ prop ], uniqueData[ prop ] );
            } );
        } );

        // Get stylesheet uniques
        totalObj.styleData.forEach( ( styleObj ) => {
            let props = _.keys( styleObj.uniques.data );
            let othersArr = _.reject( uniquesArr, {
                id: styleObj.uniques.id
            } );

            let compareObj = {};

            props.forEach( ( prop ) => {
                compareObj[ prop ] = [];
                othersArr.forEach( ( o ) => {
                    compareObj[ prop ] = _.concat( compareObj[ prop ], o.data[ prop ] );
                } );
                styleObj.trueUniques[ prop ] = _.difference( styleObj.uniques.data[ prop ], compareObj[ prop ] );
            } );
        } );

        return totalObj;
    },
    sortFontSizes: function ( fontSizes ) {
        let that = this;
        var sortBy = function ( a, b ) {
            let c = that.fontSizeToPx( a );
            let d = that.fontSizeToPx( b );
            if ( c > d ) {
                return -1;
            } else {
                return 1;
            }
        };
        var sorted = fontSizes;
        if ( !sorted ) {
            return false;
        }
        return sorted.sort( sortBy );
    },
    fontSizeToPx: function ( value ) {
        var raw;

        if ( typeof value !== 'string' ) {
            value = value.toString();
        }

        raw = parseFloat( value, 10 );
        if ( value.match( /px$/ ) ) {
            return raw;
        }
        if ( value.match( /em$/ ) ) {
            return raw * 16;
        }
        if ( value.match( /%$/ ) ) {
            return raw * 0.16;
        }
        switch ( value ) {
        case 'inherit':
            return 16;
        case 'xx-small':
            return 9;
        case 'x-small':
            return 10;
        case 'small':
            return 13;
        case 'medium':
            return 16;
        case 'large':
            return 18;
        case 'x-large':
            return 24;
        case 'xx-large':
            return 32;
        case 'small':
            return 13;
        case 'larger':
            return 19;
        default:
            return 1024;
        }
    },
    sortZIndices: function ( zIndices ) {
        var sorted = zIndices;
        if ( !sorted ) {
            return false;
        }
        return sorted.sort( function ( a, b ) {
            return a - b;
        } );
    }
};
