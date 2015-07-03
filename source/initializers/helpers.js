var moment = require('moment');

Ember.WYSIWYG = Ember.TextArea.extend({

    renderEditor: function() {
        var _this = this;

        _this.$().trumbowyg({
            id: 'ember-wysiwyg',
            btns: ['viewHTML',
                '|', 'formatting',
                '|', 'btnGrp-design',
                '|', 'link',
                '|', 'btnGrp-justify',
                '|', 'btnGrp-lists',
                '|', 'horizontalRule']
        }).on('tbwblur tbwpaste tbwfocus tbwchange', function() {
            setTimeout(function() {
                if(_this.$()) {
                    _this.set('value', _this.$().trumbowyg('html'));
                }
            }, 100);
        });

    }.on('didInsertElement')

});


Ember.Handlebars.helper('format-text', function(text) {
    text = Ember.Handlebars.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new Ember.Handlebars.SafeString(text);
});

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

Ember.Handlebars.helper( 'bg-img', function( url ) {
    var html = "style=\"background-image:url(\'" + url + "\');\"";
    return new Ember.Handlebars.SafeString(html);
} );

//for alternating section layout
Ember.Handlebars.helper('section-class', function(id, offset){

    if(offset)
        id += offset;

    if(id%2 == 0)
        return "tri-sec-one";
    else
        return "tri-sec-two";

    //if( id%3 == 0 ){
    //   return 'tri-sec-one';
    //}
    //else if(id%3 == 1){
    //   return 'tri-sec-two';
    //}
    //else {
    //   return 'tri-sec-three';
    //}


});