/**
 * UI - Load Pattern
 */
(function(atomiseUI){
  'use strict';

  /*** PRIVATE VARIABLES ***/

  /*** PRIVATE METHODES ***/
  var loadPattern = function(){
    var anchor = $(this).attr('href');
    var pattern = anchor.replace('#', '');
    Atomise.styleguide.makeContent(pattern);
  };

  /**
   * Handle UI actions
   */
  var bindUIactions = function(){
    $(document).on('click', '.sg--nav-loadable', loadPattern);
  };

  /*** PUBLIC METHODES ***/
  atomiseUI.loadPattern = {
    bindUIactions: bindUIactions,
  };

}(Atomise.ui));
