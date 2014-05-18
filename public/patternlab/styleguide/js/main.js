

var app = (function() {

  'use strict';
  var privateVariable = 'app fired!',
      docElem = document.documentElement;

  return {
    publicFunction: function() {
      console.log(privateVariable);
    },
    userAgentInit: function() {
      docElem.setAttribute('data-useragent', navigator.userAgent);
    }
  };

})();

var styleguide = (function(){
  'use strict';

  // Private vars
  var styleGuideFilePath = 'patternlab/styleguide/';

  /******* PRIVATE METHODS *******/

  /**
   * Return the full template path
   */
  var getTemplate = function(name){
    return styleGuideFilePath + name + '.mustache';
  };

  /**
   * Create the menu with json patterns
   */
  var buildMenu = function(patterns){
    var tree = new Tree();
    for(var i in patterns) {
      tree.add(patterns[i]);
    }

    var pathVisitor = new PathVisitor();
    tree.accept(pathVisitor);
    var displayVisitor = new DisplayVisitor();
    tree.accept(displayVisitor);

    return '<ul>'+displayVisitor.getPath()+'</ul>';
  };
  /**
   * Create the header using the mustache template
   * @param {object} patterns List of patterns in a tree view
   */
  var makeHeader = function(patterns){
    $.get(getTemplate('header'), function(template) {
      var menu = buildMenu(patterns);

      var rendered = Mustache.render(template, {patterns: menu});
      $('header.sg--header').append(rendered);
    });
  };

  var viewPattern = function(patterns, arg){

  }


  /******* PUBLIC METHODS *******/
  return {
    build: function(){
// console.log("build function fired!");
      $.get('patternlab/sources/patterns.json', function(patterns) {
// console.log(patterns);
        makeHeader(patterns);
        viewPattern(patterns, 'all');
      });
    }
  }
})();

(function() {

  'use strict';

  // Some examples
  // app.publicFunction();
  // app.userAgentInit();

  // Styleguide
  styleguide.build();


})();
