/**
 * UI - Disco mode
 * Dependancie: sizeIframe module
 */
(function(patternlabUI){
  'use strict';

  /*** PRIVATE VARIABLES ***/
  var enabled = false,
      interval = 1000,
      minViewportWidth = 15,
      maxViewportWidth = 500,
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
    patternlabUI.sizeiframe(getRandom(minViewportWidth, maxViewportWidth));
  };

  /**
   * Start the disco mode
   */
  var startDiscoMode = function(){
    enabled = true;
    discoID = setInterval(process, interval);
  };

  /**
   * Handle UI actions
   */
  var bindUIactions = function(){
    $(document).on('click', '.sg--nav-toggle', toggleMenu);
  };

  /*** PUBLIC METHODES ***/
  patternlabUI.discoMode = {
    bindUIactions: bindUIactions,
  };

}(PatternLab.ui));
