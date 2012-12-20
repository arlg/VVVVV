<?php session_start();
	if(!isset($_SESSION['isadmin'])) header('location:index.php');	
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>Admin</title>
	<link type="text/css" rel="stylesheet" media="all" href="css/styleadmin.css" />
	<link type="text/css" rel="stylesheet" media="all" href="css/demo_table_jui.css" />
	<link type="text/css" rel="stylesheet" media="all" href="css/jquery-ui-1.7.2.custom.css" />
	<link type="text/css" rel="stylesheet" media="all" href="css/jquery.fancybox-1.3.1.css" />
		
	<style type="text/css" title="currentStyle">
			@import "css/demo_page.css";
			@import "css/demo_table.css";
		</style>
	
	<script type="text/javascript" src="js/jquery.js"></script>
	<script ttype="text/javascript" src="js/jquery.dataTables.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
	<script>
  $(document).ready(function() {
    $("#tabs").tabs();
  });
  </script>
	<body>
	
	<div id="topMenu">
		<a href="logout.php">Log out</a>
	</div>
	
	<div id="contentWrapper">
		<h1>Admin</h1>

<?php 
require_once('../include/Database.class.php'); 
require_once('../include/Tools.class.php');
require_once('../include/Devtools.class.php');

/*=====================
Les tables qu'on veut afficher
=====================*/
$tablearray = array('scores');

?>

<div id="tabs">

<ul>
<?php $cpt=0; foreach($tablearray as $table): ?>
   <li><a href="#fragment-<?php echo $cpt ?>"><span><?php echo $table ?></span></a></li>
<?php ++$cpt; endforeach; ?>
</ul>

<?php
	reset($tablearray);
	$cpt=0;
	foreach($tablearray as $table){
	?>
	<div id="fragment-<?php echo $cpt ?>">
	<script type="text/javascript">
		$(document).ready(function() {
			$('#tablecontent-<?php echo $cpt ?>').dataTable({
				"oLanguage": {
					"sUrl": "i18n/dataTables.french.txt"
				}
			});
		});
	</script>
	<?php
	$datas = $database->get_data($table, '*');
	echo "<table id=\"tablecontent-".$cpt."\">";
	echo "<thead>";
	$datacolumns = $database->get_fields($table);
	while($column = mysql_fetch_array($datacolumns)){
			echo "<th>".$column['Field']."</th>";
	}
	echo "</thead>";
	echo "<tbody>";
	while($data = mysql_fetch_array($datas)){
		echo "<tr>";
		$datacolumns = $database->get_fields($table);
		while($column = mysql_fetch_array($datacolumns)){
			echo "<td>".$data[$column['Field']]."</td>";
		}
		echo "</tr>";
	}
	echo "</tbody>";
	echo "</table><div class=\"clear\"></div></div>";
	++$cpt;
}


?>
	</div>
	</div>
	</body>
</html>