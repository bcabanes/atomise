/**
 * UI - Stephen Hay Mode -
 * "Start with the small screen first,
 * then expand until it looks like shit.
 * Time for a breakpoint!"
 */
(function(patternlabUI){
  'use strict';

  /*** PRIVATE VARIABLES ***/
  var enabled = false;

  /*** PRIVATE METHODES ***/

  var killHayMode = function(){
    var currentWidth = $sgViewport.width();
		hayMode = false;
		$sgViewport.removeClass('hay-mode');
		$('#sg--gen-container').removeClass('hay-mode');
		sizeiframe(Math.floor(currentWidth));
  };

  /**
   * Show or hide navigation menu
   */
  var handleClick = function(e){
    $(document).trigger('ui:killDiscoMode');
    if(enabled){ killHayMode(); }
    startHeyMode();
  };

  /**
   * Handle UI actions
   */
  var bindUIactions = function(){
    $(document).on('click', '#sg--size-hay', handleClick);
  };

  /*** PUBLIC METHODES ***/
  patternlabUI.navigationToggle = {
    bindUIactions: bindUIactions,
  };

}(PatternLab.ui));
