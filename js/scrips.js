$.fn.extend({
  exists: function(callback) {
    if (this.length > 0) {
      if (callback != null) {
        callback.call(this);
      }
      return true;
    } else {
      return false;
    }
  }
});

jQuery(document).ready(function(){
	
	//for tabs
	
    $('[data-tabs="link"]').click(function() {
        var click_id=$(this).attr('id');
        if (click_id != $('[data-tabs="link"].active').attr('id') ) {
            $('[data-tabs="link"]').removeClass('active');
            $(this).addClass('active');
            $('[data-tabs] div').removeClass('active');
            $('#con_' + click_id).addClass('active');
        }
    });
    
    // for dropdown
    
    $('[data-menu="link"]').exists(function() {
    	
    	$(this).each(function(){
    		var par = $(this),
    		    child = $(this).next(),    		
    		    ulHeight = child.height();    
    		    	
    		child.height(ulHeight - 1).addClass("hide");
    	})
    	
    	 	
    	var par = $(this)   	    
    	
    	par.on('click', function(e){    		
    		var child = $(this).next()
    		
    		par.toggleClass("active");	
    		child.toggleClass("hide");	
    		
    		e.preventDefault();
    	});
    	
    	$(document).on('click', function(e){
			if (!$(e.target).closest(par).length) {
				$('[data-menu="list"]').addClass('hide');
				par.removeClass("active");	
			}
			e.preventDefault();
		});
    });
    
    //for trigger
    
    $('[data-trigger]').exists(function(){
		$(this).on('click', function(e){
			$(this).toggleClass("active");
			
			e.preventDefault();
		});
	});
	
	//for fixed menu
    $('[data-fixed]').exists(function(){
    	
    	$(window).on('scroll', function () {
	        if( $(window).scrollTop() > 195 ) {
	            $('[data-fixed]').addClass('fixed');
	        }
	        else{
	            $('[data-fixed]').removeClass('fixed');
	        }
	    });
    });
});