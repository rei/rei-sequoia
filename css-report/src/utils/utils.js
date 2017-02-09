var _ = require( 'lodash' );

module.exports = {
    parseUniques: function ( stats ) {
        if ( !stats ) {
            return false;
        }

        var uniques = {};
        var uniqueProperties = [ 'color', 'background-color' ];

        uniqueProperties.forEach( ( property ) => {
            uniques[ _.camelCase( property ) ] = _.uniq( stats.declarations.properties[ property ] );
        } );

        uniques.fontSize = _.uniq( stats.declarations.getAllFontSizes() );
        uniques.fontFamily = _.uniq( stats.declarations.getAllFontFamilies() );
        uniques.fontSizeSorted = this.sortFontSizes( uniques.fontSize );
        uniques.zIndexSorted = this.sortZIndices( uniques.zIndex );

        return uniques;
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
