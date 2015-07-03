App.User = DS.Model.extend( {

    name: DS.attr( 'string' ),
    email: DS.attr( 'string' ),
    password: DS.attr( 'string' ),
    about: DS.attr('string'),
    perm_level: DS.attr('number', {defaultValue: 0}),
    avatar_url: DS.attr('string'),
    created_at: DS.attr()

} );