/**
 * StyleGuide module
 */
(function(patternlab){
  'use strict';

  /*** PRIVATE VARIABLES ***/
  var el = {
    header: 'header.sg--header'
  };

  /*** PRIVATE METHODES ***/
  /**
   * Build the navigation menu
   */
  var buildNavigation = function(){
    var visitor = new BuildMenuVisitor();
    var patternsTree = patternlab.logic.getPatternsTree();
    patternsTree.acceptVisitor(visitor);
    return visitor.getMenu();
  };


  /**
   * Create the header using the mustache template
   */
  var makeHeader = function(){
    $.get(patternlab.logic.getStyleguideTemplate('header'), function(template) {
      var navigation = buildNavigation();
      var rendered = Mustache.render(template, {patterns: navigation});
      $(el.header).append(rendered);

      // TEMPORARY send an event
      $(document).trigger('header:built');
    });
  };

  /*** PUBLIC METHODES ***/
  patternlab.styleguide = {
    makeHeader: makeHeader,
  };

}(PatternLab));
