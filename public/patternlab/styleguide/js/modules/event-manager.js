/**
 * Event Manager module
 */
(function(patternlabEvent){
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
    // PatternLab.event.register('logic:json:handled', PatternLab.styleguide.makeHeader);
    PatternLab.event.register('logic:json:handled', function(){
      PatternLab.styleguide.makeHeader();
      PatternLab.styleguide.makeContent();
    });
    PatternLab.event.register('styleguide:build:ended', PatternLab.ui.init);

    /**
     * UI
     */
    if(PatternLab.ui.discoMode && PatternLab.ui.hayMode){
      PatternLab.event.register('ui:hayMode:started', PatternLab.ui.discoMode.stop);
      PatternLab.event.register('ui:hayMode:stopped', function(){});
      PatternLab.event.register('ui:discoMode:started', PatternLab.ui.hayMode.stop);
      PatternLab.event.register('ui:discoMode:stopped', function(){});

      PatternLab.event.register('ui:setSmall', function(){
        PatternLab.ui.discoMode.stop();
        PatternLab.ui.hayMode.stop();
      });

      PatternLab.event.register('ui:setMedium', function(){
        PatternLab.ui.discoMode.stop();
        PatternLab.ui.hayMode.stop();
      });

      PatternLab.event.register('ui:setLarge', function(){
        PatternLab.ui.discoMode.stop();
        PatternLab.ui.hayMode.stop();
      });

      PatternLab.event.register('ui:setFull', function(){
        PatternLab.ui.discoMode.stop();
        PatternLab.ui.hayMode.stop();
      });

      PatternLab.event.register('ui:setRandom', function(){
        PatternLab.ui.discoMode.stop();
        PatternLab.ui.hayMode.stop();
      });
    }

  };

  /*** PUBLIC METHODES ***/
  patternlabEvent.manager = {
    init: init,
  };

}(PatternLab.event));
