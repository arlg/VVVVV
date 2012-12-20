<?php session_start() ?>
<?php if( isset($_SESSION['isadmin'])): 
	header('location:contentadmin.php');
  endif; ?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Admin</title>
<link type="text/css" rel="stylesheet" media="all" href="css/styleadmin.css" />
</head>

<body>

	<div id="loginbox">
		<form action="login.php" name="login" method="post" class="signin">

		  <table cellpadding="0" cellspacing="3" >
		    <tr>
		    	<th colspan="2"><h1>Admin</h1></th>

		    </tr>
		    <tr>
		    	<th>Login</th>
		    	<td height="20">
		    		<input type="text" name="login" value="" />    	</td>
		    </tr>
		    <tr>
		    	<th>Password</th>
		    	<td height="20"> <input type="password" name="password" value="" /></td>
		    </tr>
		  </table>
		  
		  <input type="submit" name="submit" class="loginbtn" value="valider" />
		  <div class="clear"></div>
			
		</form>
	</div>

</body>
</html>