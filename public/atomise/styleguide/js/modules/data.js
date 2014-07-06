/**
 * Data module
 */
(function(atomise){
  'use strict';

  /*** PRIVATE VARIABLES ***/
  var dataLog = {};

  /*** PRIVATE METHODES ***/

  /**
   * Add / Update data to the dataLog
   * @param {string} reference The reference's name of the value
   * @param {mixed}  value     The value to store
   */
  var addData = function(reference, value){
    dataLog[reference] = value;
  };

  /**
   * Get the value of the reference given
   * @param {string} reference Name of the value's reference
   */
  var getData = function(reference){
    return dataLog[reference];
  };

  /**
   * Return all data currently setted
   */
  var getDataLog = function(){
    return dataLog;
  };

  /**
   * Clean dataLog (delete all registred data)
   */
  var clearData = function(){
    eventsLog = {};
  };


  /*** PUBLIC METHODES ***/
  atomise.data = {
    add: addData,
    clear: clearData,
    logs: getDataLog,
    get: getData,
    update: addData
  };

}(Atomise));
