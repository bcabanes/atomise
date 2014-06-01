/**
 * UI - Stephen Hay Mode -
 * "Start with the small screen first,
 * then expand until it looks like shit.
 * Time for a breakpoint!"
 */
(function(patternlabUI){
  'use strict';

  /*** PRIVATE VARIABLES ***/
  var enabled = false,
      $sgViewport = $('.sg--viewport'), // Viewport element
      maxViewportWidth = 2600, // Maxiumum Size for Viewport
      minViewportWidth = 240, // Minimum Size for Viewport
      viewportResizeHandleWidth = 14; // Width of the viewport drag-to-resize handle

  /*** PRIVATE METHODES ***/

  /**
   * Enable the Hay! mode
   */
  var startHayMode = function(){
    enabled = true;
    $('.sg--gen-container').removeClass('sg--viewport-animate').width(minViewportWidth+viewportResizeHandleWidth);
    $sgViewport.removeClass('sg--viewport-animate').width(minViewportWidth);

    var timeoutID = window.setTimeout(function(){
      $('.sg--gen-container').addClass('hay-mode').width(maxViewportWidth+viewportResizeHandleWidth);
      $sgViewport.addClass('hay-mode').width(maxViewportWidth);

      setInterval(function(){
        var vpsize = $sgViewport.width();
        patternlabUI.resize.updateSizeReading(vpsize);
      }, 100);
    }, 200);
  };

  /**
   * Disable the Hay! mode
   */
  var stopHayMode = function(){
    var currentWidth = $sgViewport.width();
		enabled = false;
		$sgViewport.removeClass('hay-mode');
		$('.sg--gen-container').removeClass('hay-mode');
		patternlabUI.resize.resize(Math.floor(currentWidth));
  };

  /**
   * Enable or disable the Hay! mode
   * @param {object} e Default jQuery event object
   */
  var handleClick = function(e){
    e.preventDefault();
    if(patternlabUI.discoMode){
      patternlabUI.discoMode.stop();
    }
    if(enabled){
      stopHayMode();
    }else{
      startHayMode();
    }
  };

  /**
   * Handle UI actions
   */
  var bindUIactions = function(){
    $(document).on('click', '#sg--size-hay', handleClick);
  };

  /*** PUBLIC METHODES ***/
  patternlabUI.hayMode = {
    bindUIactions: bindUIactions,
    stop: stopHayMode
  };

}(PatternLab.ui));
