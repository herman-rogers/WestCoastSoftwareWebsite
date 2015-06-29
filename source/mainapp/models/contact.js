App.Contact = DS.Model.extend( {

    name: DS.attr( 'string' ),
    email: DS.attr( 'string' ),
    body: DS.attr( 'string' )
    //created_at: DS.attr()

} );