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
            uniques[ _.camelCase( property ) ] = {};
            uniques[ _.camelCase( property ) ].values = _.uniq( stats.declarations.properties[ property ] );
            uniques[ _.camelCase( property ) ].counts = _.countBy( stats.declarations.properties[ property ], _.identity );
        } );

        uniques.fontSize = {};
        uniques.fontSize.values = _.uniq( stats.declarations.getAllFontSizes() );
        uniques.fontSize.counts = _.countBy( stats.declarations.getAllFontSizes(), _.identity );
        uniques.fontSizeSorted = this.sortFontSizes( uniques.fontSize.values );

        uniques.fontFamily = {};
        uniques.fontFamily.values = _.uniq( stats.declarations.getAllFontFamilies() );
        uniques.fontFamily.counts = _.countBy( stats.declarations.getAllFontFamilies(), _.identity );

        uniques.mediaQueries = {};
        uniques.mediaQueries.values = _.uniq( stats.mediaQueries.values );
        uniques.mediaQueries.counts = _.countBy( stats.mediaQueries.values, _.identity );

        // uniques.zIndexSorted = this.sortZIndices( uniques.zIndex );

        return uniques;
    },
    parseStats: function ( style, isStyle ) {
        let styleObj = {};
        if ( isStyle ) {
            styleObj.name = '<style> tag';
            styleObj.css = style;
        } else {
            styleObj.name = style.link;
            styleObj.css = style.css;
        }
        styleObj.uniques = {};
        styleObj.trueUniques = {};
        styleObj.stats = cssstats( styleObj.css );
        if ( styleObj.stats ) {
            styleObj.uniques.id = randomID( 10 );
            styleObj.uniques.data = this.parseUniques( styleObj.stats );
        }

        return styleObj;
    },
    parsePageData: function ( links, styles ) {
        let pageData = {};
        pageData.size = 0;
        pageData.rules = 0;
        pageData.selectors = 0;
        pageData.declarations = 0;
        pageData.mediaQueries = 0;
        pageData.styleSheetsCount = links.length;
        pageData.styleTagsCount = styles.length;
        pageData.uniques = {};
        pageData.styleData = [];
        let uniquesArr = [];

        // Linked css stats
        links.forEach( ( link ) => {
            let linkObj = this.parseStats( link, false );
            if ( linkObj.stats ) {
                pageData.size += linkObj.stats.gzipSize;
                pageData.rules += linkObj.stats.rules.total;
                pageData.selectors += linkObj.stats.selectors.total;
                pageData.declarations += linkObj.stats.declarations.total;
                uniquesArr.push( linkObj.uniques );
            }
            pageData.styleData.push( linkObj );
        } )

        // Style tag stats
        styles.forEach( ( style ) => {
            let styleObj = this.parseStats( style, true );
            if ( styleObj.stats ) {
                pageData.size += styleObj.stats.gzipSize;
                pageData.rules += styleObj.stats.rules.total;
                pageData.selectors += styleObj.stats.selectors.total;
                pageData.declarations += styleObj.stats.declarations.total;
                uniquesArr.push( styleObj.uniques );
            }
            pageData.styleData.push( styleObj );
        } );

        // Get total uniques
        uniquesArr.forEach( ( unique ) => {
            let uniqueData = unique.data;
            let props = _.keys( uniqueData );
            props.forEach( function ( prop ) {
                pageData.uniques[ prop ] = _.union( pageData.uniques[ prop ], uniqueData[ prop ].values );
            } );
        } );

        // Get stylesheet uniques
        pageData.styleData.forEach( ( styleObj ) => {
            let props = _.keys( styleObj.uniques.data );
            let othersArr = _.reject( uniquesArr, {
                id: styleObj.uniques.id
            } );

            let compareObj = {};

            props.forEach( ( prop ) => {
                compareObj[ prop ] = [];

                othersArr.forEach( ( o ) => {
                    let otherVals = _.keys( o.data[ prop ].counts );
                    compareObj[ prop ] = _.concat( compareObj[ prop ], otherVals );
                } );

                let styleVals = _.keys( styleObj.uniques.data[ prop ].counts )
                let diffArr = _.difference( styleVals, compareObj[ prop ] );

                styleObj.trueUniques[ prop ] = [];
                diffArr.forEach( ( d ) => {
                    let uniqueObj = {};
                    uniqueObj.value = d;
                    uniqueObj.count = styleObj.uniques.data[ prop ].counts[ d ];
                    styleObj.trueUniques[ prop ].push( uniqueObj );
                } );
            } );
        } );

        return pageData;
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
