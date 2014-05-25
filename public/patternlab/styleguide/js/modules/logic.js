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
   * Return the styleguide template
   * @param {string} name Name of mustache template
   */
  var getStyleguideTemplate = function(name){
    return patternlab.settings.styleGuideFilePath + name + '.mustache';
  };

  /*** PUBLIC METHODES ***/
  patternlab.logic = {
    setPatternsJson: setPatternsJson,
    getPatternsTree: getPatternsTree,
    getStyleguideTemplate: getStyleguideTemplate
  };

}(PatternLab));
