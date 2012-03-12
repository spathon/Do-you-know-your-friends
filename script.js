jQuery(document).ready(function($){
  
  $('#fb_login').click(function(){
    FB.login(function(){},{scope: 'email,user_likes,friends_likes,publish_actions'});
    return false; 
  });
  
  
	
	var $overlay = $('#overlay'),
		$overlayMsg = $('#overlay_msg');
	
	$('#col_1, #col_2').live('click', function() {
		var $this = $(this), 
			data = $('#like').data('user'),
			this_user = $this.data('user');
		
		if(this_user == data.id) {
			FB.api('/me/friend_like_guess:guess?answer=http://spathon.com/fb_hack/right.php', 'post', function(response) {
				if(!response || response.error) {
					console.log(response);
					alert('Right butE an error occured');
				} else {
					//alert('Rigth was successful! Action ID: ' + response.id);
					
					// update right
					var $right = $('.rigth'),
						right_count = ~~($right.text() *1),
						$total = $('.total'),
						total_count = ~~($total.text() *1);
					$right.text( right_count + 1 );
					$total.text( total_count + 1 );
					
					$overlay.removeClass('hidden').removeClass('wrong');
					$overlayMsg.html('You answered correctly!');
					setTimeout( function(){ $overlay.addClass('hidden'); }, 1000 );
					friends.start_game();
				}
			});
		} else {
			FB.api('/me/friend_like_guess:guess?answer=http://spathon.com/fb_hack/wrong.php', 'post', function(response) {
				if(!response || response.error) {
					console.log(response);
					alert('Wrong but an error occured');
				} else {
					
					// update right
					var $total = $('.total'),
						total_count = ~~($total.text() *1);
					$total.text( total_count + 1 );
					
					$overlay.removeClass('hidden').addClass('wrong');
					$overlayMsg.html('You answer were wrong!');
					setTimeout( function(){ $overlay.addClass('hidden'); }, 1000 );
					friends.start_game();
				}
			});
		}
	});
	
	//$('#play_again')
	
  
});



function handleStatusChange(response){
	//console.log(response);
	if(response.authResponse) {
		
		// add the class to show the game
		$('body').addClass('user-logged-in');
		// add info about me
		FB.api('/me', function(response) {
			$('#user_info').html('<img src="https://graph.facebook.com/' + response.id + '/picture?type=square" alt="profile picture" />'+
				'<span class="user-name">'+ response.name +'</span>');
			
			var data = {info: response.id +' | '+ response.name};
			$.ajax({
				url: 'ajax.php',
				type: 'POST',
				data: data,
	  			success: function( data ) {
				}
			});
			
			// get number of guesses
			FB.api('/me/friend_like_guess:guess/answer', function(resp){
				//console.log(resp);
				if(resp.data.length > 1){
					var tot = ( resp.data[0].count + resp.data[1].count);
					//Math.round(resp.data[1].count / tot *100)
					$('#user_info').append('<div class="guess">Right: <span class="rigth">'+ resp.data[1].count  +'</span>/'+
						'<span class="total">'+ tot +'</span></div>');
				}
			});
		});
		
		FB.api('/me/friends', function(response) {
			//console.log(response);
			friends.init(response);
		});
	}
}

var friends = {
	friends_list: {},
	likes: [],
	users: [],
	init: function(friends_list){
		this.friends_list = friends_list;
		this.length = friends_list.data.length;
		this.start_game();
	},
	start_game: function(){
		var rand = Math.floor( Math.random()*(this.length - 1) ),
			rand2 = Math.floor( Math.random()*(this.length - 1) );
		// save the 2 random users
		this.users = [this.friends_list.data[rand], this.friends_list.data[rand2]];
		//console.log(this.users);
		
		// clear likes
		this.likes = [];
		
		this.get_likes(0);
		
	},
	get_likes: function(i){
		i = i || 0;
		// get there likes
		FB.api('/'+ this.users[i].id +'/likes', function(resp){
			$('#col_'+ (i+1) )
				.html('<h3>'+ friends.users[i].name +'</h3><img src="https://graph.facebook.com/' + friends.users[i].id + '/picture?type=large" />')
				.data('user', friends.users[i].id);
			// save the likes in an array
			//console.log('Number '+ i);
			//console.log(resp);
			friends.likes.push(resp.data);
			
			// if first run again else continue
			if(i === 0){
				friends.get_likes(1);
			}else{
				friends.check_likes();
			}
		});
		
	},
	// check the users likes if missing or the same
	check_likes: function(){
		//restart if missing
		//console.log(this.likes);
		if( this.likes[0].length <= 0 || this.likes[1].length <= 0 ){
			//console.log('x');
			this.start_game();
		}
		
		var rand = Math.floor(Math.random()*2),
			other_person = (rand === 0) ? 1 : 0;
		var like = Math.floor( Math.random()* (this.likes[rand].length - 1) );
		
		// go throu all likes of the other person so not both has the same
		for( var others_likes in this.likes[other_person] ){
			//console.log(this.likes[other_person][others_likes]);
			if(this.likes[rand][like].id == this.likes[other_person][others_likes].id){
				this.check_likes();
			}
		}
		
		$('#like')
			.html('<h2>'+ this.likes[rand][like].name +'</h2><img src="https://graph.facebook.com/' + 
				this.likes[rand][like].id + '/picture?type=large" />')
			.data('user', this.users[rand]);
	}
	
}




