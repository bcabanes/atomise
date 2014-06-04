/**
 * UI - Resize the viewport
 */
(function(patternlabUI){
  'use strict';

  /*** PRIVATE VARIABLES ***/
  var $bodySize = parseInt($('body').css('font-size')), //Body size of the document,
      clientWidth = document.body.clientWidth,
      maxViewportWidth = 2600, // Maxiumum Size for Viewport
      minViewportWidth = 240, // Minimum Size for Viewport
      sizePxClass = '.sg--size-px',
      $sizePx, // Px size input element in toolbar
      sizeEmClass = '.sg--size-em',
		  $sizeEm, // Em size input element in toolbar
      sgCaptureClass = '.sg--capture',
      $sgCapture, // Area were the mouse's moves are captured
      viewportResizeHandleWidth = 14; // Width of the viewport drag-to-resize handle

  /*** PRIVATE METHODES ***/

  /**
   * Init
   */
  var init = function(){
    // Init Variables
    $sizePx    = $(sizePxClass);
    $sizeEm    = $(sizeEmClass);
    $sgCapture = $(sgCaptureClass);

    var originViewportWidth = $('.sg--viewport').width();
    $('.sg--gen-container').width(originViewportWidth);

    var testWidth = screen.width;
    if(window.orientation !== undefined){
      testWidth = (window.orientation === 0) ? screen.width : screen.height;
    }
    if(($(window).width() == testWidth) && ('ontouchstart' in document.documentElement) && ($(window).width() <= 1024)){
      $('.sg--rightpull-container').width(0);
    }else{
      $('.sg--viewport').width(originViewportWidth - viewportResizeHandleWidth);
    }

    updateSizeReading($('.sg--viewport').width());

    // Listen for resize changes
    if(window.orientation !== undefined){
      var origOrientation = window.orientation;
      window.addEventRegistration('orientationchange', function(){
        if(window.orientation != origOrientation){
          $('.sg--gen-container').width($(window).width());
          $('.sg--viewport').width($(window).width());
          updateSizeReading($(window).width());
          origOrientation = window.orientation;
        }
      }, false);
    }
  };

  /**
   * Unbind event on Handles Pull
   */
  var unbindHandlePulls = function(){
    $sgCapture.unbind('mousemove');
		$sgCapture.css("display","none");
  };

  /**
   * Set the viewport width to small state
   * @param {object} e Default jQuery event object
   */
  var setSmall = function(e){
    if(e !== undefined){
      e.preventDefault();
    }

    PatternLab.event.send('ui:setSmall');

    resizeViewport(randomize(minViewportWidth, 500));
  };

  /**
   * Set the viewport width to medium state
   * @param {object} e Default jQuery event object
   */
  var setMedium = function(e){
    if(e !== undefined){
      e.preventDefault();
    }

    PatternLab.event.send('ui:setMedium');

    resizeViewport(randomize(500, 800));
  };

  /**
   * Set the viewport width to large state
   * @param {object} e Default jQuery event object
   */
  var setLarge = function(e){
    if(e !== undefined){
      e.preventDefault();
    }

    PatternLab.event.send('ui:setLarge');

    resizeViewport(randomize(800, 1200));
  };

  /**
   * Set the viewport width to full state
   * @param {object} e Default jQuery event object
   */
  var setFull = function(e){
    if(e !== undefined){
      e.preventDefault();
    }

    PatternLab.event.send('ui:setFull');

    resizeViewport(clientWidth);
  };

  /**
   * Set the viewport width to random state
   * @param {object} e Default jQuery event object
   */
  var setRandom = function(e){
    if(e !== undefined){
      e.preventDefault();
    }

    PatternLab.event.send('ui:setRandom');

    resizeViewport(randomize(minViewportWidth, clientWidth));
  };

  /**
   * Handle widening the "viewport"
   * @param {object} event Default jQuery event object
   */
  var handlePulls = function(event){
    // Capture default data
    var origClientX = event.clientX,
        originViewportWidth = $('.sg--viewport').width();

    // Show the cover
    $sgCapture.css('display', 'block');

    // Add the mouse move event and capture data. Also update the viewport width
    $sgCapture.mousemove(function(event){
      var viewportWidth;

      viewportWidth = originViewportWidth + 2*(event.clientX - origClientX);

      if(viewportWidth > minViewportWidth){
        if(!PatternLab.data.get('viewportWidth')){
          PatternLab.data.add('viewportWidth', viewportWidth);
        }else{
          PatternLab.data.update('viewportWidth', viewportWidth);
        }

        // Call the action for resizing the viewport
        resizeViewport(viewportWidth, false);
      }

    });
  };

  /**
   * Save the size in the data global object
   * @param {float} size The value that has to be saved
   */
  var saveSize = function(size){
    if(!PatternLab.data.get('viewportWidth')){
      PatternLab.data.add('viewportWidth', size);
    }else{
      PatternLab.data.update('viewportWidth', size);
    }
  };

  /**
   * Actions when keyDown event is fired on the Pixel input
   * @param {object} e Global jQuery object
   */
  var pixelInputDown = function(e){
    var val = Math.floor($(this).val());

    if(e.keyCode === 38){ // If the up arrow key is hit
      val++;
      resizeViewport(val, false);
    }else if(e.keyCode === 40){ // If the down arrow key is hit
      val--;
      resizeViewport(val, false);
    }else if(e.keyCode === 13){ // If the Enter key is hit
      e.preventDefault();
      resizeViewport(val, true); // Resize the viewport to value of text box
      $(this).blur();
    }
  };

  /**
   * Action when keyUp event is fired on the Pixel input
   */
  var pixelInputUp = function(){
    var val = parseFloat($(this).val());
    updateSizeReading(val, 'px', 'updateEmInput');
  };

  /**
   * Actions when keyDown event is fired on the Em input
   * @param {object} e Global jQuery object
   */
  var emInputDown = function(e){
    var val = parseFloat($(this).val());

    if(e.keyCode === 38){ // If the up arrow key is hit
      val++;
      resizeViewport(Math.floor(val*$bodySize), false);
    }else if(e.keyCode === 40){ // If the down arrow key is hit
      val--;
      resizeViewport(Math.floor(val*$bodySize), false);
    }else if(e.keyCode === 13){ // If the Enter key is hit
      e.preventDefault();
      resizeViewport(Math.floor(val*$bodySize), true);
      $(this).blur();
    }
  };

  /**
   * Action when keyUp event is fired on the Em input
   */
  var emInputUp = function(){
    var val = parseFloat($(this).val());
    updateSizeReading(val, 'em', 'updatePxInput');
  };

  /**
   * Update Pixel and Em inputs
   * @param {float} size   The size input number
   * @param {string} unit   The type of unit: either px or em. Default is px. Accepted values are 'px' and 'em'
   * @param {object} target What inputs to update. Both by default
   */
  var updateSizeReading = function(size, unit, target){
    var emSize, pxSize;

    if(unit === 'em'){
      emSize = size;
      pxSize = Math.floor(size*$bodySize);
    }else{
      pxSize = size;
      emSize = size/$bodySize;
    }

    if(target === 'updatePxInput'){
      $sizePx.val(pxSize);
    }else if(target === 'updateEmInput'){
      $sizeEm.val(emSize.toFixed(2));
    }else{
      $sizeEm.val(emSize.toFixed(2));
      $sizePx.val(pxSize);
    }
  };

  /**
   * Resize the viewport
   * @param {float} size      This is the target size of the viewport
   * @param {boolean} animate This is a boolean for switching the CSS animation ON or OFF. True by defautl.
   */
  var resizeViewport = function(size, animate){
    var newSize;

    if(size > maxViewportWidth){
      newSize = maxViewportWidth;
    }else if(size < minViewportWidth){
      newSize = minViewportWidth;
    }else{
      newSize = size;
    }

    // Conditionally remove CSS animation class from viewport
    if(animate === false){
      $('.sg--viewport').removeClass('sg--viewport-animate');
      $('.sg--gen-container').removeClass('sg--viewport-animate');
    }else{
      $('.sg--viewport').addClass('sg--viewport-animate');
      $('.sg--gen-container').addClass('sg--viewport-animate');
    }

    // Resize viewport wrapper to desired size + size of drag resize handler
    $('.sg--gen-container').width(newSize+viewportResizeHandleWidth);

    // Resize viewport to desired size
    $('.sg--viewport').width(newSize);

    // Update values in toolbar
    updateSizeReading(newSize);

    // Save current viewport to PaternLab's data
    saveSize(newSize);
  };


  /**
   * Returns a random number between min and max
   * @param  {int} min The minimal integer
   * @param  {int} max The maximal integer
   * @return {int}     The result
   */
	var randomize = function(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	};


  /**
   * Handle UI actions
   */
  var bindUIactions = function(){
    $(document).on('mouseup', 'body', unbindHandlePulls);
    $(document).on('keyup', sizePxClass, pixelInputUp);
    $(document).on('keydown', sizePxClass, pixelInputDown);
    $(document).on('keyup', sizeEmClass, emInputUp);
    $(document).on('keydown', sizeEmClass, emInputDown);
    $(document).on('mousedown', '.sg--rightpull', handlePulls);
    $(document).on('click', '#sg--size-s', setSmall);
    $(document).on('click', '#sg--size-m', setMedium);
    $(document).on('click', '#sg--size-l', setLarge);
    $(document).on('click', '#sg--size-full', setFull);
    $(document).on('click', '#sg--size-random', setRandom);
  };

  /*** PUBLIC METHODES ***/
  patternlabUI.resize = {
    init: init,
    bindUIactions: bindUIactions,
    resize: resizeViewport,
    updateSizeReading: updateSizeReading
  };

}(PatternLab.ui));
