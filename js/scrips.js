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
	
	$('input, textarea').placeholder();
	
	//for tabs
	
    $('[data-tabs="link"]').on('click',function() {
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
    		    	
    		child.height(ulHeight - 1).addClass("hide visible");
    	})
    	
    	 	
    	var par = $(this)   	    
    	
    	par.on('click', function(e){    		
    		var child = $(this).next()
    		$('[data-menu="list"]').not(child).addClass('hide');
    		$('[data-menu="link"]').not($(this)).removeClass('active');
    		$(this).toggleClass("active");	
    		child.toggleClass("hide");	
    		
    		e.preventDefault();
    	});
    	
    	$(document).on('click', function(e){
			if (!$(e.target).closest(par).length) {
				$('[data-menu="list"]').addClass('hide');
				par.removeClass("active");	
			}
		});
    });
    
    //for trigger
    
    $('[data-trigger]').exists(function(){
		$(this).on('click', function(e){
			$(this).toggleClass("active");
			
			e.preventDefault();
		});
	});
	
	//for time
    
    $('[data-time]').exists(function(){
		$(this).hover(function(){
			$(this).parent().toggleClass("active");
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
    
    //for message
    $('[data-cls]').exists(function(){
    	$('[data-cls="true"]').on('click', function(){
    		var cls = $(this);    		
    		cls.parent().parent().remove();
    	});
    	$('[data-cls="all"]').on('click', function(){
    		 		
    		$('[data-mess]').remove();
    	});
    });
    
    //for popup
    $('[data-popup]').exists(function(){
    	$(this).on('click', function(){
    		popup($(this));
    	});
    });
    
    //for select
    $('[data-select]').exists(function(){

		var params = {
			changedEl: "[data-select]",
			visRows: 10,
		}
		cuSel(params);
	});
	
	setInterval(function(){
		$('.task-b-1').each(function(){
			var blockHeight = $(this).next().outerHeight();
	
			$(this).height(blockHeight);	
		});
	}, 200);
	
	//for hide/show subtask
	$('[data-sub="true"]').each(function(){
		var button = $(this);
		var child = $(this).parent().parent().next();
		var parent = $(this).closest(".with-child");
		
		button.on('click', function(){
			button.toggleClass('plus');
			button.toggleClass('minus')
			parent.toggleClass('open');
			child.slideToggle(100);
		})
		
	});
	
	
	//for hide/show subnote
	$('[data-note]').each(function(){
		var button = $(this);
		var child = $(this).parent().next();
		var parent = $(this).parent().parent();
		
		button.on('click', function(){
			parent.toggleClass('open');
			child.slideToggle(100);
		})
		
	});
	
	//for hide/show comments
	$('[data-comments]').each(function(){
		var button = $(this);
		var child = $(this).parent().children(".sub-com");
		var parent = $(this).parent();
		
		button.on('click', function(){
			parent.toggleClass('open');
			child.slideToggle(0);
		})
		
	});
});

function popup(popupLink){
	
	$(popupLink.attr('href')).show();
  	$('body').append('<div id="fade"></div>');
  	$('#fade').css({'filter' : 'alpha(opacity=60)'}).fadeIn();

  	$('[data-closeBtn]').on('click', function(e){
		$('[data-modal]').hide();
		$('#fade').remove();
	});
};

/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(window, document, $) {

        var isInputSupported = 'placeholder' in document.createElement('input');
        var isTextareaSupported = 'placeholder' in document.createElement('textarea');
        var prototype = $.fn;
        var valHooks = $.valHooks;
        var propHooks = $.propHooks;
        var hooks;
        var placeholder;

        if (isInputSupported && isTextareaSupported) {

                placeholder = prototype.placeholder = function() {
                        return this;
                };

                placeholder.input = placeholder.textarea = true;

        } else {

                placeholder = prototype.placeholder = function() {
                        var $this = this;
                        $this
                                .filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
                                .not('.placeholder')
                                .bind({
                                        'focus.placeholder': clearPlaceholder,
                                        'blur.placeholder': setPlaceholder
                                })
                                .data('placeholder-enabled', true)
                                .trigger('blur.placeholder');
                        return $this;
                };

                placeholder.input = isInputSupported;
                placeholder.textarea = isTextareaSupported;

                hooks = {
                        'get': function(element) {
                                var $element = $(element);

                                var $passwordInput = $element.data('placeholder-password');
                                if ($passwordInput) {
                                        return $passwordInput[0].value;
                                }

                                return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
                        },
                        'set': function(element, value) {
                                var $element = $(element);

                                var $passwordInput = $element.data('placeholder-password');
                                if ($passwordInput) {
                                        return $passwordInput[0].value = value;
                                }

                                if (!$element.data('placeholder-enabled')) {
                                        return element.value = value;
                                }
                                if (value == '') {
                                        element.value = value;
                                        // Issue #56: Setting the placeholder causes problems if the element continues to have focus.
                                        if (element != safeActiveElement()) {
                                                // We can't use `triggerHandler` here because of dummy text/password inputs :(
                                                setPlaceholder.call(element);
                                        }
                                } else if ($element.hasClass('placeholder')) {
                                        clearPlaceholder.call(element, true, value) || (element.value = value);
                                } else {
                                        element.value = value;
                                }
                                // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
                                return $element;
                        }
                };

                if (!isInputSupported) {
                        valHooks.input = hooks;
                        propHooks.value = hooks;
                }
                if (!isTextareaSupported) {
                        valHooks.textarea = hooks;
                        propHooks.value = hooks;
                }

                $(function() {
                        // Look for forms
                        $(document).delegate('form', 'submit.placeholder', function() {
                                // Clear the placeholder values so they don't get submitted
                                var $inputs = $('.placeholder', this).each(clearPlaceholder);
                                setTimeout(function() {
                                        $inputs.each(setPlaceholder);
                                }, 10);
                        });
                });

                // Clear placeholder values upon page reload
                $(window).bind('beforeunload.placeholder', function() {
                        $('.placeholder').each(function() {
                                this.value = '';
                        });
                });

        }

        function args(elem) {
                // Return an object of element attributes
                var newAttrs = {};
                var rinlinejQuery = /^jQuery\d+$/;
                $.each(elem.attributes, function(i, attr) {
                        if (attr.specified && !rinlinejQuery.test(attr.name)) {
                                newAttrs[attr.name] = attr.value;
                        }
                });
                return newAttrs;
        }

        function clearPlaceholder(event, value) {
                var input = this;
                var $input = $(input);
                if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
                        if ($input.data('placeholder-password')) {
                                $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
                                // If `clearPlaceholder` was called from `$.valHooks.input.set`
                                if (event === true) {
                                        return $input[0].value = value;
                                }
                                $input.focus();
                        } else {
                                input.value = '';
                                $input.removeClass('placeholder');
                                input == safeActiveElement() && input.select();
                        }
                }
        }

        function setPlaceholder() {
                var $replacement;
                var input = this;
                var $input = $(input);
                var id = this.id;
                if (input.value == '') {
                        if (input.type == 'password') {
                                if (!$input.data('placeholder-textinput')) {
                                        try {
                                                $replacement = $input.clone().attr({ 'type': 'text' });
                                        } catch(e) {
                                                $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
                                        }
                                        $replacement
                                                .removeAttr('name')
                                                .data({
                                                        'placeholder-password': $input,
                                                        'placeholder-id': id
                                                })
                                                .bind('focus.placeholder', clearPlaceholder);
                                        $input
                                                .data({
                                                        'placeholder-textinput': $replacement,
                                                        'placeholder-id': id
                                                })
                                                .before($replacement);
                                }
                                $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
                                // Note: `$input[0] != input` now!
                        }
                        $input.addClass('placeholder');
                        $input[0].value = $input.attr('placeholder');
                } else {
                        $input.removeClass('placeholder');
                }
        }

        function safeActiveElement() {
                // Avoid IE9 `document.activeElement` of death
                // https://github.com/mathiasbynens/jquery-placeholder/pull/99
                try {
                        return document.activeElement;
                } catch (err) {}
        }

}(this, document, jQuery));