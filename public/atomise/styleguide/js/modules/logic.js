/**
 * Logic module
 */
(function(atomise){
  'use strict';

  /*** PRIVATE VARIABLES ***/
  var patternsJson,
      patternsTree;

  /*** PRIVATE METHODES ***/
  /**
   * Get the json file and makes it an object
   */
  var setPatternsJson = function(){
    $.get(atomise.settings.patternsJsonPath, function(data){
      patternsJson = data;
      atomise.event.send('logic:json:handled');
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
    patternsTree = getPatternsTree();
    return patternsTree.find([
      {name: "extension", value: "mustache"}
    ]);
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
    for(var i in patterns){
      var pattern = patterns[i];
      var prefix = pattern.path.split('/')[0];
      for (var basePattern in sortedPatterns) {
        if(prefix == basePattern){
          sortedPatterns[basePattern].push(pattern);
          break;
        }
      }
    }

    return sortedPatterns;
  };

  /**
   * Return the styleguide template
   * @param {string} name Name of mustache template
   */
  var getStyleguideTemplate = function(name){
    return atomise.settings.styleGuideFilePath + name + '.mustache';
  };

  /**
   * Return the pattern template path
   * @param {string} name Name of mustache template
   */
  var getPatternTemplate = function(name){
    return atomise.settings.patternsFilePath + name;
  };

  /*** PUBLIC METHODES ***/
  atomise.logic = {
    setPatternsJson: setPatternsJson,
    getPatternsTree: getPatternsTree,
    getAllPatterns: getAllPatterns,
    getStyleguideTemplate: getStyleguideTemplate,
    getPatternTemplate: getPatternTemplate,
    sortPatterns: sortPatterns
  };

}(Atomise));
