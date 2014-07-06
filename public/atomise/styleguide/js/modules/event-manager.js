/**
 * Event Manager module
 */
(function(atomiseEvent){
  'use strict';

  /*** PRIVATE VARIABLES ***/

  /*** PRIVATE METHODES ***/

  /**
   * Initialize all event and there assiociated actions
   */
  var init = function(){

    /*
      REGISTERING EVENTS
     */
    // Atomise.event.register('logic:json:handled', Atomise.styleguide.makeHeader);
    Atomise.event.register('logic:json:handled', function(){
      Atomise.styleguide.makeHeader();
      Atomise.styleguide.makeContent();
    });
    Atomise.event.register('styleguide:build:ended', Atomise.ui.init);

    /**
     * UI
     */
    if(Atomise.ui.discoMode && Atomise.ui.hayMode){
      Atomise.event.register('ui:hayMode:started', Atomise.ui.discoMode.stop);
      Atomise.event.register('ui:hayMode:stopped', function(){});
      Atomise.event.register('ui:discoMode:started', Atomise.ui.hayMode.stop);
      Atomise.event.register('ui:discoMode:stopped', function(){});

      Atomise.event.register('ui:setSmall', function(){
        Atomise.ui.discoMode.stop();
        Atomise.ui.hayMode.stop();
      });

      Atomise.event.register('ui:setMedium', function(){
        Atomise.ui.discoMode.stop();
        Atomise.ui.hayMode.stop();
      });

      Atomise.event.register('ui:setLarge', function(){
        Atomise.ui.discoMode.stop();
        Atomise.ui.hayMode.stop();
      });

      Atomise.event.register('ui:setFull', function(){
        Atomise.ui.discoMode.stop();
        Atomise.ui.hayMode.stop();
      });

      Atomise.event.register('ui:setRandom', function(){
        Atomise.ui.discoMode.stop();
        Atomise.ui.hayMode.stop();
      });
    }

  };

  /*** PUBLIC METHODES ***/
  atomiseEvent.manager = {
    init: init,
  };

}(Atomise.event));
