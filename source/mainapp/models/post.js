/**
 * Created by josh on 06/07/2015.
 */

App.Post = DS.Model.extend( {

    title: DS.attr( 'string' ),
    image_url: DS.attr( 'string' ),
    post_body: DS.attr( 'string' ),
    type: DS.attr('string'),
    authorId: DS.attr('number'),
    created_at: DS.attr()

} );