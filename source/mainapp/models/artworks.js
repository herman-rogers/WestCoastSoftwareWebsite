App.Artwork = DS.Model.extend( {

    title: DS.attr( 'string' ),
    artwork_url: DS.attr( 'string' ),
    description: DS.attr( 'string' ),
    type: DS.attr( 'string' ),
    created_at: DS.attr()

} );