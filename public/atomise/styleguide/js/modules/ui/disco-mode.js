/**
 * UI - Disco mode
 * Dependancie: sizeIframe module
 */
(function(atomiseUI){
  'use strict';

  /*** PRIVATE VARIABLES ***/
  var enabled = false,
      interval = 1000,
      maxViewportWidth = 2600, // Maxiumum Size for Viewport
      minViewportWidth = 240, // Minimum Size for Viewport
      discoID;

  /*** PRIVATE METHODES ***/

  /**
   * Returns a random number between min and max
   * @param {float} min Minimum value (minimum viewport size)
   * @param {float} max Maximum value (maximum viewport size)
   */
	var getRandom = function(min, max){
		return Math.floor(Math.random() * (max - min) + min);
	};

  /**
   * Processing disco mode
   * Dependencie: sizeIframe
   */
  var process = function(){
    atomiseUI.resize.resize(getRandom(minViewportWidth, maxViewportWidth));
  };

  /**
   * Start the disco mode
   */
  var startDiscoMode = function(){
    enabled = true;
    Atomise.event.send('ui:discoMode:started');
    discoID = setInterval(process, interval);
  };

  /**
   * Stop the disco mode
   */
  var stopDiscoMode = function(){
    enabled = false;
    clearInterval(discoID);
    discoID = false;
    Atomise.event.send('ui:discoMode:stopped');
  };

  /**
   * Enable or Disable the disco mode
   * @param {object} e Default jQuery object
   */
  var handleClick = function(e){
    e.preventDefault();

    if(atomiseUI.hayMode){
      atomiseUI.hayMode.stop();
    }

    if(enabled){
      stopDiscoMode();
    }else{
      startDiscoMode();
    }
  };

  /**
   * Handle UI actions
   */
  var bindUIactions = function(){
    $(document).on('click', '#sg--size-disco', handleClick);
  };

  /*** PUBLIC METHODES ***/
  atomiseUI.discoMode = {
    bindUIactions: bindUIactions,
    stop: stopDiscoMode
  };

}(Atomise.ui));
