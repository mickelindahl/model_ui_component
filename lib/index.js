/**
 * Created by Mikael Lindahl (mikael) on 3/17/17.
 */

'use strict';

global.$ = global.jQuery = require( 'jquery' );
global.Tether = require( 'tether' );
var $ = global.$;

var handlebars = require( 'handlebars' );
var Promise = require( 'bluebird' );

/**
 * Model that holds data from a single row in a database table. It knows
 * how to create, update, fetch and delete it self. With painters objects
 * one can defined how a each element in a row should be rendered
 *
 * - `options`
 *   - `id` {string} Model identifier
 *   - `data` {string} Model data
 *   - `url` {url} Model url for POST, PUT, GET and DELETE
 *   - `painters` {array} List with painter objects
 *     - `[].callback(data)` {function} [WITH `type=="callback"`] Function to render painter output
 *       - `data` {object} model data object
 *     - `[].data_key {string} Key to data object to use
 *     - `[].name` {string} Key which the output from the painter will be stored under
 *     - `[].template` {string} [[WITH `type=="template"`] Template for handlebars where
 *     `data` will be input params at compilation
 *     - `[].type {string} plain | template | callback
 *
 * @constructor
 */
function Model( options ) {

    this.id = options.id;
    this.data = options.data;
    this.painters = options.painters;
    this.url = options.url;

}

Model.prototype.delete = function () {

    var self = this;

    return new Promise( function ( resolve, reject ) {

        $.ajax( {
            url: self.url.delete + '/' + self.id,
            method: 'DELETE',
            success: function ( res ) {

                resolve( res )

            },
            error: function ( xhr, status, error ) {

                reject( {
                    xhr: xhr,
                    status: status,
                    error: error
                } )

            }
        } )
    } )
};

/**
 * Crate and object with data as it should should be displayed in html.
 * The composition of the object is set py a set of painters objects acting
 * upon the model data
 *
 * @returns {object}
 */
Model.prototype.row = function () {

    var  self=this;

    var view = {};
    this.painters.forEach( function ( p ) {

        if ( p.type == 'template' ) {

            view[p.name] = handlebars.compile( p.template )( self.data )
        }
        else if ( p.type == 'callback' ) {

            view[p.name] = p.callback( self.data )

        } else  if ( p.type == 'plain' ){

            view[p.name] = self.data[p.data_key]

        }else{

            console.error('WARNING! Unknown type '+p.type,' p=', p)

        }

    } );

    return view

}

module.exports = function ( opt ) {
    return new Model( opt );
}
