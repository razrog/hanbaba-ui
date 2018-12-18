import $ from 'jquery';

$.ajaxSetup( {
  crossDomain: true,
  xhrFields:   {
    withCredentials: true,
  },
} );

export default class AjaxExecutor {

  static callServerGet( url, config, success, failure, always ) {
    $.get( url, config )
      .done( ( result ) => {
        success( result );
      } )
      .fail( ( error ) => {
        if ( failure ) {
          failure( error );
        }
      } )
      .always( () => {
        if ( always ) {
          always();
        }
      } );
  }

  static callServerPost( url, body, success, failure, always ) {
    $.post( url, body )
      .done( ( result ) => {
        success( result );
      } )
      .fail( ( error ) => {
        if ( failure ) {
          failure( error );
        }
      } )
      .always( () => {
        if ( always ) {
          always();
        }
      } );
  }

  static callServerDelete( url, data, success, failure, always ) {
    $.ajax( {
      url,
      data,
      method: 'DELETE',
      type:   'DELETE', // For jQuery < 1.9
    } )
      .done( ( result ) => {
        success( result );
      } )
      .fail( ( error ) => {
        if ( failure ) {
          failure( error );
        }
      } )
      .always( () => {
        if ( always ) {
          always();
        }
      } );
  }

  static uploadFileToServer( url, data, method, success, failure, always ) {
    $.ajax( {
      url,
      data,
      method,
      cache:       false,
      contentType: false,
      processData: false,
      type:        method, // For jQuery < 1.9
    } )
      .done( ( result ) => {
        success( result );
      } )
      .fail( ( error ) => {
        if ( failure ) {
          failure( error );
        }
      } )
      .always( () => {
        if ( always ) {
          always();
        }
      } );
  }
}
