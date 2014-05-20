(function($){


  setTimeout(function(){

    var sh = $(document).height(),
        $headerHeight = $('.sg--header').height();

    // Accordion dropdown
    $('.sg--acc-handle').on("click", function(e){
      e.preventDefault();
  console.log('test');
      var $this = $(this),
        $panel = $this.next('.sg--acc-panel'),
        subnav = $this.parent().parent().hasClass('sg-acc-panel');

      //Close other panels if link isn't a subnavigation item
      if (!subnav) {
        $('.sg--acc-handle').not($this).removeClass('active');
        $('.sg--acc-panel').not($panel).removeClass('active');
      }

      //Activate selected panel
      $this.toggleClass('active');
      $panel.toggleClass('active');
      setAccordionHeight();
    });

    //Accordion Height
    function setAccordionHeight() {
      var $activeAccordion = $('.sg--acc-panel.active').first(),
        accordionHeight = $activeAccordion.height(),
        availableHeight = sh-$headerHeight; //Screen height minus the height of the header

      $activeAccordion.height(availableHeight); //Set height of accordion to the available height
    }
  }, 500)

})(jQuery);
