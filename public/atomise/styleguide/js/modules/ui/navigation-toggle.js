/**
 * UI - Navigation toggle (small devices)
 */
(function(atomiseUI){
  'use strict';

  /*** PRIVATE VARIABLES ***/

  /*** PRIVATE METHODES ***/

  /**
   * Show or hide navigation menu
   */
  var toggleMenu = function(e){
    e.preventDefault();
		$('.sg--nav-container').toggleClass('active');
  };

  /**
   * Handle UI actions
   */
  var bindUIactions = function(){
    $(document).on('click', '.sg--nav-toggle', toggleMenu);
  };

  /*** PUBLIC METHODES ***/
  atomiseUI.navigationToggle = {
    bindUIactions: bindUIactions,
  };

}(Atomise.ui));
