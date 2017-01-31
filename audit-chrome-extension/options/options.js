// Saves options to chrome.storage.sync
function save_options() {
    console.log( 'saving' );
    var guide = document.getElementById( 'guide' ).value;
    var ignored = document.getElementById( 'ignored' ).value;
    chrome.storage.sync.set( {
        guide: guide,
        ignored: ignored
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById( 'status' );
        status.textContent = 'Options saved.';
        setTimeout( function () {
            status.textContent = '';
        }, 750 );
    } );
}

// stored in chrome.storage.sync
function restore_options() {
    console.log( 'restoring' );
    chrome.storage.sync.get( {
        guide: 'rei-cedar',
        ignored: []
    }, function ( items ) {
        document.getElementById( 'guide' ).value = items.guide;
        document.getElementById( 'ignored' ).value = items.ignored;
    } );
}
document.addEventListener( 'DOMContentLoaded', restore_options );
document.getElementById( 'save' ).addEventListener( 'click', save_options );
