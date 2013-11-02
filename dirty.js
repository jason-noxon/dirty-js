(function( $ ) {

    $.fn.dirty = function(button) {
		
		var dirty_form = this;
		var initialValues = [];

		//check if any fields are dirty
		var checkFields = function(form) {
			var count = 0;

			form.children().each( function() {
				console.debug("Original Value is " + initialValues[$(this).attr('id')]);
				console.debug($(this).attr('id') + " data-dirty = " + $(this).attr('data-dirty'));
				if($(this).attr('data-dirty') === 'true') {
					count++;
				}
			});

			if (count > 0) {
				window.onbeforeunload = function(e) {
		  			return 'You have unsaved changes!';
				};

				if(button){
					button.removeAttr("disabled");
				}

				console.debug("This data in this form is now dirty...");	
				console.debug("Count is " + count);
			} 
			else {
				window.onbeforeunload = null;	
				button.attr("disabled","disabled");					
				console.debug("The data in this form is now clean");
			}

		};

		//initialize the form and save the initial values
		dirty_form.children().each( function () {
			initialValues[$(this).attr('id')] =  $(this).val();
			$(this).addClass('dirty-form-field');
			$(this).attr('data-dirty', 'false');
			checkFields(dirty_form);

			console.debug("Initialized " + $(this).attr('id'));	
		});	

		//add the change event
		$('.dirty-form-field').on('keyup', function() { 
				console.debug("change event fired");
				if( ($(this).val() === initialValues[$(this).attr('id')]) ) {
					$(this).attr('data-dirty', 'false');
					checkFields(dirty_form);
				} 
				else {
						
					$(this).attr('data-dirty', 'true');
					checkFields(dirty_form);
				}
			});

		//when the button is clicked, don't block navigation
		if (button) {
			button.on('click', function(event) {
				event.preventDefault();

				window.onbeforeunload = null;

				dirty_form.submit();
			});
		}

    	return this;
    };
 
}( jQuery ));
