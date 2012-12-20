<?php //include('../system/config/db.conf.php');

if($_POST['login'] && $_POST['password']):
	if($_POST['login']=='arlg' && $_POST['password']=='vvvvv'):
		session_start();
		$_SESSION['isadmin'] = 1;
		?>
		<html><head><meta http-equiv="refresh" content="0;url=contentadmin.php"/></head></html>
		<?php
	else:
		unset($_SESSION['isadmin']);
		?>
		<html><head><meta http-equiv="refresh" content="0;url=index.php"/></head></html>
		<?php
	endif;
else:
	echo '<html><head><meta http-equiv="refresh" content="5;url=index.php"/></head>';
	echo 'Erreur de login, vous allez &ecirc;tre redirig&eacute; vers la page de <a href="index.php">connexion</a> dans quelques secondes</html>';
endif;

?>