/**
 * UI - Accordion dropdown
 */
(function(patternlabUI){
  'use strict';

  /*** PRIVATE VARIABLES ***/
  var documentHeight = $(document).height(),
      headerHeight = $('.sg--header').height();

  /*** PRIVATE METHODES ***/

  var closePanels = function(){
    $('.sg--nav-container, .sg--nav-toggle, .sg--acc-handle, .sg--acc-panel').removeClass('active');
  };

  /**
   * Set the new document's height and
   * adjust the accordion's height
   */
  var handleResize = function(){
    documentHeight = $(document).height();
    setAccordionHeight();
  };

  /**
   * Set height for accrodion
   */
  var setAccordionHeight = function(){
    var $activeAccordion = $('.sg--acc-panel.active').first(),
      accordionHeight = $activeAccordion.height(),
      availableHeight = documentHeight-headerHeight; //Screen height minus the height of the header

    $activeAccordion.height(availableHeight); //Set height of accordion to the available height
  };

  /**
   * Display or hide dropdown
   * @param {object} e jQuery event object
   */
  var toggleDropdown = function(e){
    e.preventDefault();
    var self = $(this),
      $panel = self.next('.sg--acc-panel'),
      subnav = self.parent().parent().hasClass('sg--acc-panel');

    // Close other panels if link isn't a subnavigation item
    if(!subnav) {
      $('.sg--acc-handle').not(self).removeClass('active');
      $('.sg--acc-panel').not($panel).removeClass('active');
    }

    // Activate selected panel
    self.toggleClass('active');
    $panel.toggleClass('active');

    setAccordionHeight();
  };

  /**
   * Handle UI actions
   */
  var bindUIactions = function(){
    $(document).on('click', '.sg--acc-handle', toggleDropdown);
    $(window).resize(handleResize);
    $(document).on('click', '.sg--main', closePanels)
  };

  /*** PUBLIC METHODES ***/
  patternlabUI.accordionDropdown = {
    bindUIactions: bindUIactions,
  };

}(PatternLab.ui));
