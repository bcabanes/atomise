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
  var updateStyleGuideState = function(rendered){
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

      // Update styleguide state to say the header is rendered
      updateStyleGuideState('header');

    });
  };

  //////////////////////////////////////////// NEED TO BE REBUILT
  var makeContent = function(pattern){
    if(pattern !== undefined){

    }else{
      // Load all patterns
      var patterns = patternlab.logic.getAllPatterns();
      patterns = patternlab.logic.sortPatterns(patterns);

      for(var type in patterns){
        createEncart(type, patterns);
      }
    }
  };

  var createEncart = function(type, patterns){
    $('.sg--viewport').append('<div class="sg--'+type+'-content">'+'<h1>'+type+'</h1>'+'</div>');
    for(var pattern in patterns[type]){
      var path = patterns[type][pattern][Object.keys(patterns[type][pattern])];
      loadPattern(Object.keys(patterns[type][pattern])[0], type,  path);
      path = null;
    }
  };

  var loadPattern = function(name, type, path){

    $.get(patternlab.logic.getPatternTemplate(path), function(template) {
      var rendered = Mustache.render(template);
      $('.sg--viewport').find('.sg--'+type+'-content').append('<h2>'+name+'</h2>'+rendered);
    });

  };

  //////////////////////////////////////////// END OF NEED TO BE REBUILT

  /*** PUBLIC METHODES ***/
  patternlab.styleguide = {
    makeHeader: makeHeader,
    makeContent: makeContent,
  };

}(PatternLab));
