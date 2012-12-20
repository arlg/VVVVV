<?php

class Tools
{
	
	static function checkAllParameter($params = array() , $method, $debug = false){
	
		switch(strtoupper($method)):
			case 'GET':
				$var = $_GET;
				break;
			case 'POST':
				$var = $_POST;
				break;
			case 'PUT':
				$var = $_PUT;
				break;
		endswitch;
				
		foreach($params as $key){
			echo "TOOL";
			print_r($var[$key]);
			if(!isset($var[$key]) && !$debug)
				return false;
			elseif(!isset($var[$key]) && $debug){
				echo '<br />no '.strtoupper($method).' '.$key.' parameter';
				exit;
			}
		}
		return true;
	}
	
	static function allParameterInArray($params = array() , $method){
	
		switch(strtoupper($method)):
			case 'GET':
				$var = $_GET;
				break;
			case 'POST':
				$var = $_POST;
				break;
			case 'PUT':
				$var = $_PUT;
				break;
		endswitch;
				
		foreach($params as $key){
			if(isset($var[$key]))
				$values[$key] =  trim($var[$key]);
		}
		return $values;
	}
	
	
	
	static function checkEmail($email){
		if(eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$", $email))
		  return true;
		else
			return false;
	}
	
}