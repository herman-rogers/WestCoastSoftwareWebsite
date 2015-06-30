App.User = DS.Model.extend( {

    name: DS.attr( 'string' ),
    email: DS.attr( 'string' ),
    password: DS.attr( 'string' ),
    created_at: DS.attr()

} );