/**
 * UI - Load Pattern
 */
(function(patternlabUI){
  'use strict';

  /*** PRIVATE VARIABLES ***/

  /*** PRIVATE METHODES ***/
  var loadPattern = function(){
    var anchor = $(this).attr('href');
    var pattern = anchor.replace('#', '');
    PatternLab.styleguide.makeContent(pattern);
  };

  /**
   * Handle UI actions
   */
  var bindUIactions = function(){
    $(document).on('click', '.sg--nav-loadable', loadPattern);
  };

  /*** PUBLIC METHODES ***/
  patternlabUI.loadPattern = {
    bindUIactions: bindUIactions,
  };

}(PatternLab.ui));
