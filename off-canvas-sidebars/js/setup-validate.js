;/**
 * Off-Canvas Sidebars - Setup Validate
 *
 * @author  Jory Hogeveen <info@keraweb.nl>
 * @package Off_Canvas_Sidebars
 * @since   0.5.6
 * @version 0.5.8
 * @global  ocsNavControl
 * @preserve
 */

if ( 'undefined' === typeof ocsSetupValidate ) {
	var ocsSetupValidate = {
		messages: {
			error_website_before: '<code>wp_body_open</code> hook is not correct.',
			error_website_after: '<code>wp_footer</code> hook is not correct.',
			error_canvas_child: 'Website canvas container is not a direct child of the HTML body tag.',
			error_canvas_empty: 'Website canvas container is empty.',
			error_sidebars_child: 'Off-Canvas Sidebars are not direct children of the HTML body tag.',
			errors_found: 'Errors found!',
			hooks_incorrect: 'Please check your hooks and priorities.',
			hooks_correct: 'Theme hooks are working!'
		}
	};
}

( function( $ ) {

	var $body = $( 'body' );

	/**
	 * Run validation.
	 *
	 * @since  0.5.6
	 * @return {null} Nothing.
	 */
	ocsSetupValidate.run = function() {

		var errors  = [],
			popup   = '',
			correct = false,
			color;

		if ( ! $( '[data-canvas]' ).length ) {
			errors.push( ocsSetupValidate.messages.error_website_before );
		} else if ( ! $body.children( '[data-canvas]' ).length ) {
			errors.push( ocsSetupValidate.messages.error_canvas_child );
		} else if ( $body.children( '[data-canvas]' ).is( ':empty' ) ) {
			errors.push( ocsSetupValidate.messages.error_canvas_empty );
		}

		if ( ! $( '#ocs_validate_website_after' ).length ) {
			errors.push( ocsSetupValidate.messages.error_website_after );
		} else if ( ! $body.children( '#ocs_validate_website_after' ).length ) {
			errors.push( ocsSetupValidate.messages.error_sidebars_child );
		}

		// Do notice.
		if ( ! errors.length ) {
			correct = true;
			popup = ocsSetupValidate.messages.hooks_correct;
			ocsSetupValidate.log( ocsSetupValidate.messages.hooks_correct );
		} else {
			$.each( errors, function( i, m ) {
				i = i+1;
				popup += '<li>' + i + ': ' + m + '</li>';
				ocsSetupValidate.log( m );
			} );
			popup = '<ul style="list-style: none;">' + popup + '</ul>';
			popup = '<b>' + ocsSetupValidate.messages.errors_found + '</b>' + popup + ocsSetupValidate.messages.hooks_incorrect;
		}

		if ( correct ) {
			color = '#46b450';
		} else {
			color = '#dc3232';
		}

		var style = 'min-width: 250px; background: #fff; color: #000; border: 5px solid ' + color +  '; box-shadow: 0 0 15px; text-align: center; padding: 15px;';
		popup = '<div style="' + style + '">' + popup + '</div>';

		ocsSetupValidate.popup( popup );
	};

	/**
	 * Show popup.
	 *
	 * @since  0.5.6
	 * @param  {string}  content  The popup content.
	 * @return {null} Nothing.
	 */
	ocsSetupValidate.popup = function( content ) {
		var style = 'background: rgba(0,0,0,0.5); position: fixed; display: flex; height: 100%; width: 100%; top: 0; left: 0; z-index: 9999999; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center;';

		$('#ocs-setup-validate-result').remove();
		$body.append( '<div id="ocs-setup-validate-result" style="' + style + '">' + content + '</div>' );
	};

	/**
	 * Log message in browser console.
	 *
	 * @since  0.5.6
	 * @param  {string}  message  The message.
	 * @return {null} Nothing.
	 */
	ocsSetupValidate.log = function( message ) {
		console.log( 'Off-Canvas Sidebars Setup Validator: ' + message );
	};

	ocsSetupValidate.run();

} ( jQuery ) );
