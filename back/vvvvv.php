<?php
require_once('include/Database.class.php'); 
require_once('include/Tools.class.php');

$data = $_POST;

if($data["name"] && isset($data["name"]) && $data["score"] && isset($data["score"]) ){

	$id = $database->insert_record('scores', array('name'=>$data["name"], 'score' => $data["score"]));

}else{
	//No data provided
};

?>