/**
 * Event module
 */
(function(patternlab){
  'use strict';

  /*** PRIVATE VARIABLES ***/
  var eventsLog = [];

  /*** PRIVATE METHODES ***/
  /**
   * Return all events currently setted
   */
  var getEventsLog = function(){
    return eventsLog;
  };

  /**
   * Clean eventsLog (delete all events)
   */
  var clearEventsLog = function(){
    eventsLog = {};
  };

  /**
   * Register an event with his function to get fired
   * @param {string} eventName Event's name
   * @param {function} functionToFire The function to call when the event is triggered
   */
  var registerEvent = function(eventName, functionToFire){
    eventsLog.push({
      name: eventName,
      fct: functionToFire
    });
    $(document).bind(eventName, functionToFire);
  };

  /**
   * Send event to the document
   * @param {string} eventName Event's name
   * @param {object} eventData Event's data
   */
  var sendEvent = function(eventName, eventData){
    $(document).trigger(eventName, eventData);
  };

  /*** PUBLIC METHODES ***/
  patternlab.event = {
    clear: clearEventsLog,
    register: registerEvent,
    getEventsLog: getEventsLog,
    send: sendEvent
  };

}(PatternLab));
