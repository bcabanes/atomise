/**
 * UI module
 */
(function(atomise){
  'use strict';

  /*** PRIVATE VARIABLES ***/

  /*** PRIVATE METHODES ***/

  /**
   * Call all UI actions that we need
   */
  var fireUIfunctions = function(){
    atomise.ui.accordionDropdown.bindUIactions();
    atomise.ui.navigationToggle.bindUIactions();
    atomise.ui.resize.init();
    atomise.ui.resize.bindUIactions();
    atomise.ui.discoMode.bindUIactions();
    atomise.ui.hayMode.bindUIactions();
    atomise.ui.loadPattern.bindUIactions();
  };

  /**
   * Initialization of the module
   */
  var init = function(){
    fireUIfunctions();
  };

  /*** PUBLIC METHODES ***/
  atomise.ui = {
    init: init,
  };

}(Atomise));
