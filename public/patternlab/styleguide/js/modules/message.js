/**
 * Message module
 */
(function(patternlab){
  'use strict';

  /*** PRIVATE VARIABLES ***/
  var autoHideTimer = 5400; // Delay during the message is visible

  /*** PRIVATE METHODES ***/
  var clearMessage = function(){
    $('.sg--message').remove();
  };

  /**
   * Create the message and display it
   * @param  {string} message The message's content (could be HTML)
   * @param  {string} type    Type of the message [error, warning, notice, default]
   * @param  {boolean} autoHide Hide or not automaticaly the message
   */
  var create = function(message, type, autoHide){
    $.get(patternlab.logic.getStyleguideTemplate('message'), function(template){
      if(type === undefined){
        type = 'default';
      }
      var rendered = Mustache.render(template, {message: message, type: type});
      $('body').append(rendered);

      // Bind manually the close action for message box
      $('.sg--message-close').bind('click', patternlab.message.hide);

      if(autoHide){
        setTimeout(clearMessage, autoHideTimer);
      }
    });
  };

  /*** PUBLIC METHODES ***/
  patternlab.message = {
    show: create,
    hide: clearMessage
  };

}(PatternLab));
