<?php
require_once('include/Database.class.php'); 
require_once('include/Tools.class.php');

//GET DATA

$rows = array();

$result = $database->get_data('scores','*', '', $order='score ASC', '');

while($row = mysql_fetch_assoc($result)){
	//echo $row['score']." --- ".$row['name'].'<br />';
	$rows[] = $row;
}


// $rows = array();
// while($row = mysql_fetch_assoc($query)) {
//     $rows[] = $row;
// }

// $json = json_encode($rows);
$json = json_encode($rows);
echo $json;

//$json= '('.json_encode($arr).');'; //must wrap in parens and end with semicolon

//
?>