var getCss = require( 'get-css' ),
    fs = require( 'fs-extra' );

var pageArr = [ {
        description: 'Empty Page (header/footer)',
        url: 'https://www.rei.com/test'
    },
    {
        description: 'Home Page',
        url: 'https://www.rei.com/'
    },
    {
        description: 'Hub Page',
        url: 'https://www.rei.com/h/camping-and-hiking'
    },
    {
        description: 'Search Results',
        url: 'https://www.rei.com/search.html?q=buff&ir=q%3Abuff&page=1'
    },
    {
        description: 'Product Page',
        url: 'https://www.rei.com/product/691367/buff-original-buff'
    },
    {
        description: 'Empty Cart Page',
        url: 'https://www.rei.com/ShoppingCart'
    },
    {
        description: 'Opt-Outside Home Page',
        url: 'https://www.rei.com/opt-outside'
    },
    {
        description: 'Brand Page',
        url: 'https://www.rei.com/b/rei'
    },
    {
        description: 'Garage Home Page',
        url: 'https://www.rei.com/rei-garage'
    },
    {
        description: 'Adventures Home Page',
        url: 'https://www.rei.com/adventures'
    },
    {
        description: 'Expert Advice Landing Page',
        url: 'https://www.rei.com/learn/expert-advice.html'
    },
    {
        description: 'Expert Advice Article Page',
        url: 'https://www.rei.com/learn/expert-advice/appalachian-gear-list.html'
    },
    {
        description: 'Blog Home Page',
        url: 'http://blog.rei.com/'
    },
    {
        description: 'Membership Landing Page',
        url: 'https://www.rei.com/membership/benefits'
    },
    {
        description: 'Learn Landing Page',
        url: 'https://www.rei.com/learn.html'
    },
    {
        description: 'Stewardship Landing Page',
        url: 'https://www.rei.com/stewardship.html'
    },
    {
        description: 'Find a Store Landing Page',
        url: 'https://www.rei.com/map/store'
    },
    {
        description: 'Store Landing Page',
        url: 'https://www.rei.com/stores/seattle.html'
    },
    {
        description: 'Terms of Use',
        url: 'https://www.rei.com/help/terms-of-use.html'
    },
    {
        description: 'Mobile Apps',
        url: 'https://www.rei.com/mobile.html'
    }
];

var getCssOptions = {
    timeout: 10000,
    verbose: true
};

function getData( pages ) {
    var pageData = [];
    var promises = [];

    // Loop through all pages and scrape data
    for ( var i = 0, l = pages.length; i < l; i++ ) {
        ( function ( page ) {
            var promise = getCss( page.url, getCssOptions )
                .then( function ( res ) {
                    var pageObj = {};
                    pageObj.page = page;
                    pageObj.title = res.pageTitle;
                    pageObj.links = res.links;
                    pageObj.styles = res.styles;
                    pageObj.css = res.css;

                    pageData.push( pageObj );
                } )
                .catch( function ( error ) {
                    console.error( error );
                } );
            promises.push( promise );
        }( pages[ i ] ) );
    }

    // send all data to build the page once promises are resolved and we have data
    Promise.all( promises ).then( function ( r ) {
        var json = JSON.stringify( pageData );

        fs.outputFile( './src/assets/data.json', json, function ( err ) {
            if ( err ) {
                console.error( err );
            }
            console.log( 'Data Gathered!' );
        } )
    } );
}

getData( pageArr );
