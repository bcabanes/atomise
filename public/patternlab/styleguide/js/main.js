

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
  var styleGuideFilePath = 'patternlab/styleguide/',
      patternSources = 'patternlab/sources/_patterns',
      patternsTree;

  /******* PRIVATE METHODS *******/

  /**
   * Return the full template path
   */
  var getStyleguideTemplate = function(name){
    return styleGuideFilePath + name + '.mustache';
  };

  /**
   * Build the tree from json file
   * @param {object} patterns JSON patterns file
   */
  var buildTree = function(patterns){
    patternsTree = new Tree(patternSources);
    for(var i in patterns) {
      patternsTree.add(patterns[i]);
    }
    var pathVisitor = new PathVisitor();
    patternsTree.accept(pathVisitor);
  };

  /**
   * Create the menu with json patterns
   */
  var buildMenu = function(){
    var displayVisitor = new DisplayVisitor();
    patternsTree.accept(displayVisitor);

    return '<ul>'+displayVisitor.getPath()+'</ul>';
  };
  /**
   * Create the header using the mustache template
   */
  var makeHeader = function(){
    $.get(getStyleguideTemplate('header'), function(template) {
      var menu = buildMenu();

      var rendered = Mustache.render(template, {patterns: menu});
      $('header.sg--header').append(rendered);
    });
  };

  /**
   * View all or a specific pattern
   * @param {[type]} arg      [description]
   */
  var viewPattern = function(arg){
    if(arg == 'all'){
      // Load all patterns in right order and by categories
    }else{
      // Load the specific pattern
      arg = arg.replace('#', '');
      $.get(arg, function(template) {
        var rendered = Mustache.render(template);
        $('main.sg--main').html(rendered);
      });
    }
  }

  var loadPattern = function(e){
    e.preventDefault();
    viewPattern($(this).attr('href'));
  }


  /******* PUBLIC METHODS *******/
  return {
    build: function(){
      $.get('patternlab/sources/patterns.json', function(patterns) {
        // Build the TREE of Patterns from json
        buildTree(patterns);

        makeHeader();
        viewPattern('all');
      });
    },
    init: function(){},
    bindUIActions: function(){
      $(document).on('click', '.sg--primary-menu a', loadPattern);
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
  styleguide.init();
  styleguide.bindUIActions();


})();
