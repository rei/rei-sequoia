chrome.browserAction.onClicked.addListener( function ( tab ) {
    chrome.storage.sync.get( [ 'guide', 'ignored' ], function ( res ) {
        var ignoredArr = [];
        if ( res.ignored ) {
            var str = res.ignored.split( /[\s,]+/ ).join();
            ignoredArr = str.split( ',' )
        }
        chrome.tabs.sendMessage( tab.id, {
            guide: res.guide,
            ignored: ignoredArr
        }, function ( response ) {

        } );
    } );
} );
