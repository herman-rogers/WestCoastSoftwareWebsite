var moment = require('moment');

Ember.Handlebars.helper( 'formatted-text', function( text ) {
    return new Ember.Handlebars.SafeString(text);
} );

Ember.Handlebars.helper( 'truncate', function( text, options ) {
    var limit = options.hash.limit || 50;

    if ( text.length < limit ) {
        return text;
    }
    formatText = text.substr( 0, (limit - 3) ) + '...';
    return formatText;
} );