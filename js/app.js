var app = {

	init: function() {
		app.getPosts();
	},

	getPosts: function() {

		var rootURL = 'http://www.wp4.dev/wp-json';

		$.ajax({
			type: 'GET',
			url: rootURL + '/posts?type=news',
			dataType: 'json',
			success: function(data){
				
				$.each(data, function(index, value) {
					console.log(value.featured_image);
			      $('ul.topcoat-list').append('<li class="topcoat-list__item">' +
			      	'<img src="'+value.featured_image.attachment_meta.sizes.medium.url+'" /><br>' +
			      	'<h3>'+value.title+'</h3>' +
			      	value.excerpt + '</li>');
			    });
			},
			error: function(error){
				console.log(error);
			}

		});

	}

}