/**
 * Created by Mikael Lindahl (mikael) on 3/17/17.
 */

'use strict';

var MockBrowser = require( 'mock-browser' ).mocks.MockBrowser;
var mock = new MockBrowser();

global.window = mock.getWindow();
global.$ = global.jQuery = require( 'jquery' );
global.Tether = require( 'tether' );

var $ = global.$;

var mockjax = require( 'jquery-mockjax' )( $, window );

// Note that we expect `window` to be defined once this file is browserified and
// used in a browser. If it isn't Mockjax will have a problem!

mockjax( {
    url: /^\/test\/([\d]+)$/i,
    responseText: 'content',
    type:'DELETE'

} );

const debug = require( 'debug' )( 'breakpad:plugin:client_model:test:index' );

const Lab = require( "lab" );
const lab = exports.lab = Lab.script();

const code = require( "code" );

const Model = require( '../index' );


var data = {
    id:'1',
    car:'Volvo',
    price:'500k',
    price_badge: 'badge-success',
    color:'blue',
    icon_car:'#icon-car',
    is_new: true
};

var painters={

    plain:['car'],
    template:[ {
        name: 'price',
        template: '<span class="{{price_badge}}">{{price}}</span>'
    }],
    callback:[
        {
            name:'status',
            callback: (data)=>{

                return 'What ever you want '+data.color

            }
        }
    ]
}

lab.experiment( "model ui component", function () {

    lab.test( 'Test delete model server side', done => {

        Model(
            {
                id: 1,
                url: {
                    delete: '/test'
                }
            } )
            .delete()
            .then( res => {

                debug( res )

                done()
            } )

    } )

    lab.test( 'Test REJECT delete model server side', done => {

        Model(
            {
                id: 1,
                url: {
                    delete: '/wrong'
                }
            } )
            .delete()
            .catch( error => {

                debug( error )

                done()
            } )

    } )

    lab.test( 'Test generate row', done => {

        var row = Model(
            {
                id: 1,
                data:data,
                painters:painters
            } )
            .row()

        debug(row)
        done()
    } )

} )