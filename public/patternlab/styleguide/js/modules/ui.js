/**
 * UI module
 */
(function(patternlab){
  'use strict';

  /*** PRIVATE VARIABLES ***/

  /*** PRIVATE METHODES ***/

  /**
   * Call all UI actions that we need
   */
  var fireUIfunctions = function(){
    patternlab.ui.accordionDropdown.bindUIactions();
  };

  /**
   * Listen to the event whose say it begings
   */
  var init = function(){
    $(document).on('header:built', fireUIfunctions);
  };

  /*** PUBLIC METHODES ***/
  patternlab.ui = {
    init: init,
  };

}(PatternLab));
