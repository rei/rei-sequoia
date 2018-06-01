let getCss = require( 'get-css' ),
    fs = require( 'fs-extra' ),
    request = require( 'request' );

let pageArr = [
  {
    id: 1,
    description: "Empty Page (header/footer)",
    url: "https://www.rei.com/test"
  },
  {
    id: 2,
    description: "Home Page",
    url: "https://www.rei.com/"
  },
  {
    id: 3,
    description: "Hub Page",
    url: "https://www.rei.com/h/camping-and-hiking"
  },
  {
    id: 4,
    description: "Search Results",
    url: "https://www.rei.com/search.html?q=buff&ir=q%3Abuff&page=1"
  },
  {
    id: 5,
    description: "Product Page -  bikes",
    url: "https://www.rei.com/product/106331/co-op-cycles-drt-11-bike"
  },
  {
    id: 6,
    description: "Product Page",
    url: "https://www.rei.com/product/119945/vuori-performance-jogger-pants-womens"
  },
  {
    id: 7,
    description: "Empty Cart Page",
    url: "https://www.rei.com/ShoppingCart"
  },
  {
    id: 8,
    description: "Opt-Outside Home Page",
    url: "https://www.rei.com/opt-outside"
  },
  {
    id: 9,
    description: "Brand Page",
    url: "https://www.rei.com/b/rei"
  },
  {
    id: 10,
    description: "Garage Home Page",
    url: "https://www.rei.com/rei-garage"
  },
  {
    id: 11,
    description: "Adventures Home Page",
    url: "https://www.rei.com/adventures"
  },
  {
    id: 12,
    description: "Expert Advice Landing Page",
    url: "https://www.rei.com/learn/expert-advice.html"
  },
  {
    id: 13,
    description: "Expert Advice Article Page",
    url: "https://www.rei.com/learn/expert-advice/appalachian-gear-list.html"
  },
  {
    id: 14,
    description: "Blog Home Page",
    url: "http://blog.rei.com/"
  },
  {
    id: 15,
    description: "Membership Landing Page",
    url: "https://www.rei.com/membership/benefits"
  },
  {
    id: 16,
    description: "Learn Landing Page",
    url: "https://www.rei.com/learn.html"
  },
  {
    id: 17,
    description: "Stewardship Landing Page",
    url: "https://www.rei.com/stewardship.html"
  },
  {
    id: 18,
    description: "Find a Store Landing Page",
    url: "https://www.rei.com/map/store"
  },
  {
    id: 19,
    description: "Store Landing Page",
    url: "https://www.rei.com/stores/seattle.html"
  },
  {
    id: 20,
    description: "Terms of Use",
    url: "https://www.rei.com/help/terms-of-use.html"
  },
  {
    id: 21,
    description: "Mobile Apps",
    url: "https://www.rei.com/mobile.html"
  }
];

let getCssOptions = {
    timeout: 10000,
    verbose: true
};

function getData( pages ) {
    let pageData = [];
    let promises = [];

    // Loop through all pages and scrape data
    for ( let i = 0, l = pages.length; i < l; i++ ) {
        ( function ( page ) {
            let promise = getCss( page.url, getCssOptions )
                .then( function ( res ) {
                    let pageObj = {};
                    pageObj.page = page;
                    pageObj.id = page.id;
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
    Promise.all( promises ).then( ( r ) => {
        let obj = {};
        request.get( 'https://raw.githubusercontent.com/rei/rei-cedar/master/dist/rei-cedar.min.css', ( err, resp, body ) => {
            if ( !err && resp.statusCode === 200 ) {
                obj.cedar = body;
                obj.data = pageData;
                let json = JSON.stringify( obj );

                fs.outputFile( './data/data.json', json, function ( err ) {
                    if ( err ) {
                        console.error( err );
                    }
                    console.log( 'Data Gathered!' );
                } );
            } else {
                console.error( err );
            }
        } );
    } );
}

getData( pageArr );