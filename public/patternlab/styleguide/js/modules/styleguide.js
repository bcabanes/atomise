/**
 * StyleGuide module
 */
(function(patternlab){
  'use strict';

  /*** PRIVATE VARIABLES ***/
  var el = {
        header: 'header.sg--header'
      },
      built = [];

  /*** PRIVATE METHODES ***/
  /**
   * Count each element of the el var
   */
  var countEl = function(){
    var i = 0;
    for(var single in el){
      i++;
    }
    return i;
  };

  /**
   * Test if there is more part to render
   * @param {string} el The element's name that juste been redered
   */
  var updateStyleGuideSate = function(rendered){
    built.push(rendered);
    if(built.length == countEl()){ // The styleguide is completly built
      patternlab.event.send('styleguide:build:ended');
    }
  };

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

      // Update styleguide sate to say the header is rendered
      updateStyleGuideSate('header');

    });
  };

  /*** PUBLIC METHODES ***/
  patternlab.styleguide = {
    makeHeader: makeHeader,
  };

}(PatternLab));
