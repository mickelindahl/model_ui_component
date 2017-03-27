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
 *   - `painters` {object} Three types of painters
 *     - `callback` {array}
 *       - `[].name` {string} Store output under this key
 *       - `[].value(data)` {callback} Function to render painter output
 *         - `data` {object} model data object
 *     - `plain` {array}
 *       - `[]` {string} Data key to use, stored under same name
 *     - `template` {array]
 *       - `[].name` {string} Store output under this key
 *       - `[].value` {string} Template for handlebars where `data` will be input params at compilation
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
    for (var key in this.painters){

        this.painters[key].forEach( function ( p ) {

            if ( key == 'template' ) {

                view[p.name] = handlebars.compile( p.template )( self.data )
            }
            else if ( key == 'callback' ) {

                view[p.name] = p.callback( self.data )

            } else  if ( key == 'plain' ){

                view[p] = self.data[p]

            }else{

                console.error('WARNING! Unknown type '+p.type,' p=', p)

            }

        } );


    }

    return view

}

module.exports = function ( opt ) {
    return new Model( opt );
}
