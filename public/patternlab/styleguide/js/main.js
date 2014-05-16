

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
  var buildMenu = function(data, isSub){
    var item,
        html = ''; // Wrap with div if true
    html += '<ul>';
    for(item in data){
        html += '<li>';
        if(typeof(data[item]) === 'object'){ // An array will return 'object'
            html += item; // Submenu found, but top level list item.
            html += buildMenu(data[item], true); // Submenu found. Calling recursively same method (and wrapping it in a div)
        }else{
            html += '<a href="' + data[item] + '">' + item + '</a>'; // No submenu
        }
        html += '</li>';
    }
    html += '</ul>';
    return html;
  }

  var makeHeader = function(patterns){
    $.get(getTemplate('header'), function(template) {
      var menu = buildMenu(patterns);
      var rendered = Mustache.render(template, {patternMenu: menu});
      $('body').append(rendered);
    });
  };


  /******* PUBLIC METHODS *******/
  return {
    build: function(){
// console.log("build function fired!");
      $.get('patternlab/sources/patterns.json', function(patterns) {
// console.log(patterns);
        makeHeader(patterns);
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
