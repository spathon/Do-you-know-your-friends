<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>Know your friends</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<link rel="stylesheet" type="text/css" href="style.css" media="all" />
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
</head>
<body>
<div id="fb-root"></div>
<script>
  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));
  
  
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '244312848996295', // App ID
      channelUrl : '//spathon.com/channel.php', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true,  // parse XFBML
      oauth: true
    });
    FB.Event.subscribe('auth.statusChange',handleStatusChange );
  };
  
 
</script>
<div class="container">




<div class="header">
	<h1>Do you know your friends?</h1>
	<div id="user_info"></div>
	<div>
		Guess which friend who likes ...
	</div>
</div>


<a href="#" id="fb_login">Login with facebook to play</a>


<div class="game-wrap">
	
	<div class="like-wrap">
		<!--h2>Like</h2-->
		<div class="col like-box"><div class="col-inside" id="like"></div></div>
	</div>
	<div class="clearfix friends">
		<h2>Who is it?</h2>
		<div class="col person-1 person alignleft"><div class="col-inside" id="col_1"></div></div>
		<div class="col person-2 person last alignleft"><div class="col-inside" id="col_2"></div></div>
	</div>
</div>



<div class="footer">
	Created by <a href="http://spathon.com">Patrik Spathon</a> at Facebook mobile hack Stockholm
</div>


</div><!-- end container -->

<div id="overlay" class="hidden"><div id="overlay_msg">You answer were wrong!</div></div>

<script src="script.js"></script>
</body>
</html>