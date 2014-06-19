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


  var makeContent = function(pattern){
    var patterns = {};
    $('.sg--viewport').html('');

    if(pattern !== undefined){
      var patternsTree = patternlab.logic.getPatternsTree();
      patterns = patternsTree.find([{name: "path", value: pattern}]);
    }else{
      // Load all patterns
      patterns = patternlab.logic.getAllPatterns();
    }
    patterns = patternlab.logic.sortPatterns(patterns);
    for(var type in patterns){
      if(patterns[type].length !== 0){
        createEncart(type, patterns);
      }
    }
  };

  var createEncart = function(type, patterns){
    $('.sg--viewport').append('<div class="sg--'+type+'-content">'+'<h1>'+type+'</h1>'+'</div>');
    for(var i in patterns[type]){
      var pattern = patterns[type][i];
      loadPattern(pattern.name, type, pattern.path);
    }
  };

  var loadPattern = function(name, category, path){

    $.get(patternlab.logic.getPatternTemplate(path), function(template) {
      var rendered = Mustache.render(template);
      $('.sg--viewport').find('.sg--'+category+'-content').append('<h2>'+name+'</h2>'+rendered);
    });

  };

  /*** PUBLIC METHODES ***/
  patternlab.styleguide = {
    makeHeader: makeHeader,
    makeContent: makeContent,
  };

}(PatternLab));
