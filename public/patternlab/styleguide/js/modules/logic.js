/**
 * Logic module
 */
(function(patternlab){
  'use strict';

  /*** PRIVATE VARIABLES ***/
  var patternsJson,
      patternsTree;

  /*** PRIVATE METHODES ***/
  /**
   * Get the json file and makes it an object
   */
  var setPatternsJson = function(){
    $.get(patternlab.settings.patternsJsonPath, function(data){
      patternsJson = data;
      patternlab.event.send('logic:json:handled');
    });
  };

  /**
   * Build the pattern tree from json file
   * @param {json} patterns Patterns JSON file generated
   */
  var setPatternsTree = function(){
    patternsTree = new FileTree();
    patternsTree.init(".", [
      'atoms',
      'molecules',
      'organisms',
      'templates',
      'pages'
    ]);
    patternsTree.setTree(patternsJson);
    return patternsTree;
  };

  /**
   * Return the patterns tree object
   */
  var getPatternsTree = function(){
    if(patternsTree === undefined){
      patternsTree = setPatternsTree();
      return patternsTree;
    }
    return patternsTree;
  };

  /**
   * Get all patterns
   */
  var getAllPatterns = function(){
    var visitor = new BuildArrayVisitor();
    patternsTree = getPatternsTree();
    patternsTree.acceptVisitor(visitor);
    return visitor.getPatterns();
  };

  /**
   * Sort patterns given in different categories
   * @param {object} patterns All patterns
   */
  var sortPatterns = function(patterns){

    var sortedPatterns = {
      'atoms': [],
      'molecules': [],
      'organisms': [],
      'templates': [],
      'pages': []
    };
    for(var pattern in patterns){
      var prefix = patterns[pattern].split('/')[0];
      var obj = {};
      obj[pattern] = patterns[pattern];
      if(prefix == 'atoms'){
        sortedPatterns.atoms.push(obj);
        obj = null;
      }else if(prefix == 'molecules'){
        sortedPatterns.molecules.push(obj);
        obj = null;
      }else if(prefix == 'organisms'){
        sortedPatterns.organisms.push(obj);
        obj = null;
      }else if(prefix == 'templates'){
        sortedPatterns.templates.push(obj);
        obj = null;
      }else if(prefix == 'pages'){
        sortedPatterns.pages.push(obj);
        obj = null;
      }
    }

    return sortedPatterns;
  };

  /**
   * Return the styleguide template
   * @param {string} name Name of mustache template
   */
  var getStyleguideTemplate = function(name){
    return patternlab.settings.styleGuideFilePath + name + '.mustache';
  };

  /**
   * Return the pattern template path
   * @param {string} name Name of mustache template
   */
  var getPatternTemplate = function(name){
    return patternlab.settings.patternsFilePath + name;
  };

  /*** PUBLIC METHODES ***/
  patternlab.logic = {
    setPatternsJson: setPatternsJson,
    getPatternsTree: getPatternsTree,
    getAllPatterns: getAllPatterns,
    getStyleguideTemplate: getStyleguideTemplate,
    getPatternTemplate: getPatternTemplate,
    sortPatterns: sortPatterns
  };

}(PatternLab));
