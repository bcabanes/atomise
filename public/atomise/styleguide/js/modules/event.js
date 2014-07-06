/**
 * Event module
 */
(function(atomise){
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
   * Clean eventsLog & unbind them (delete all registred events)
   */
  var clearEvents = function(){
    for(var ev in eventsLog){
      $(document).unbind(eventsLog[ev].name);
    }
    eventsLog = [];
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
  atomise.event = {
    clear: clearEvents,
    register: registerEvent,
    getEventsLog: getEventsLog,
    send: sendEvent
  };

}(Atomise));
