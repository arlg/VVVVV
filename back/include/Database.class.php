<?php

require_once "config.php";

class Database
{
	public $host        = "";
	public $user        = "";
	public $password    = "";
	public $database    = "";
	public $conn        = ""; //internal connection reference

	public function __construct()
	{
		//set class config
		$this->host             = DB_SERVER;
		$this->user             = DB_USER;
		$this->password         = DB_PASS;
		$this->database         = DB_NAME;

		$this->connect();
	}

	/* Class constructor */
	private function connect()
	{
		$this->conn = @mysql_connect($this->host, $this->user, $this->password) or die(mysql_error());
		mysql_select_db($this->database, $this->conn) or die(mysql_error());;
	}

	private function disconnect()
	{
		@mysql_close($this->conn);
	}

	public function query($query, $count='', $test='', $porcentaje='')
	{
		//creo una nueva conexion al server
		$this->connect();

		$result=mysql_query($query, $this->conn);
		mysql_close($this->conn);

		if ($result===false) {
			$errorDescription = mysql_error();
			die($errorDescription);
		}else {return $result;}

	}
	
	public function get_fields($table, $debug=false){
				
			$query="SHOW COLUMNS FROM $table";
					
			if ($debug) {
				echo "<br />---------------------- QUERY -------------------<br /> $query <br />-----------------------------------------<br />";
				exit;
			}

			return $this->query($query);
			
	}

	public function get_data($table, $fields_array='*', $where='', $order='', $count='', $debug='')
	{
		if (is_array($fields_array)) {
			$fields="";
			foreach ($fields_array as $field => $alias) {
				if ($fields!="") {
					$fields.=", ";
				}
				$fields.="$field as '$alias'";
			}
		} else {
			$fields=$fields_array;
		}

		if (!empty($where))
			$where="where " . $where;

		if (!empty($order))
			$order="ORDER BY " . $order;

		$query="select $fields from $table $where $order";

		if ($debug) {
			echo "<br />---------------------- QUERY -------------------<br /> $query <br />-----------------------------------------<br />";
			exit;
		}

		return $this->query($query);

	}

	public function insert_record($table, $data_array, $debug=false)
	{
		$field_list="";
		$field_values="";
		foreach ($data_array as $key => $value) {

			if (!empty($field_list)) {
				$field_list.=", ";
				$field_values.=", ";
			}

			$field_list.="`$key`";
			$field_values.="'".mysql_real_escape_string($value)."'";

		}

		$query="INSERT INTO `$table` ($field_list) VALUES ($field_values)";


		if ($debug) {
			echo "<br />---------------------- QUERY -------------------<br /> $query <br />-----------------------------------------<br />";
			exit;
		}

		$this->connect();
		mysql_query($query, $this->conn) or die(mysql_error());
		$record_id=mysql_insert_id();
		$this->disconnect();

		return $record_id;

	}

	public function update_record($table, $data_array, $id, $table_id = 'id', $debug=false)
	{
		$field_list="";
		$field_values="";
		foreach ($data_array as $key => $value) {

			if (!empty($field_values)) {
				$field_values.=", ";
			}

			$field_values.="`$key`='".mysql_real_escape_string($value)."'";
		}

		$query="UPDATE `$table` SET $field_values WHERE `$table_id`=$id";

		if ($debug) {
			echo "<br />---------------------- QUERY -------------------<br /> $query <br />-----------------------------------------<br />";
			exit;
		}

		$this->connect();

		mysql_query($query, $this->conn) or die(mysql_error());
		$this->disconnect();
	}

	public function delete_record($table, $id, $table_id = 'id', $debug=false)
	{
		$query="DELETE FROM `$table` WHERE `$table_id`=$id";

		if ($debug) {
			echo "<br />---------------------- QUERY -------------------<br /> $query <br />-----------------------------------------<br />";
			exit;
		}

		$this->connect();

		mysql_query($query, $this->conn) or die(mysql_error());
		$this->disconnect();
	}
	
	public function is_record_exist($table, $where_array=array(), $debug=false)
	{

		$fieldswhere="WHERE ";
		foreach ($where_array as $field => $alias) {
			if ($fieldswhere!="WHERE ") {
				$fieldswhere.="AND ";
			}
			$fieldswhere.="$field = '$alias'";
		}

		if (!empty($order))
			$order="ORDER BY " . $order;

		$query="select count(id) as cpt from $table $fieldswhere";

		if ($debug) {
			echo "<br />---------------------- QUERY -------------------<br /> $query <br />-----------------------------------------<br />";
			exit;
		}

		
		$result = $this->query($query);
		
		$this->disconnect();
		$resultarray = mysql_fetch_array($result);
		
		
		if($resultarray['cpt'] > 0)
			return true;
		else
			return false;
		
	}

	public function find_record($table, $fields_array='*', $where_array=array(), $order ='', $debug=false)
	{
		if (is_array($fields_array)) {
			$fields="";
			foreach ($fields_array as $field => $alias) {
				if ($fields!="") {
					$fields.=", ";
				}
				$fields.="$field as '$alias'";
			}
		} else {
			$fields=$fields_array;
		}

		$fieldswhere="WHERE ";
		foreach ($where_array as $field => $alias) {
			if ($fieldswhere!="WHERE ") {
				$fieldswhere.="AND ";
			}
			$fieldswhere.="$field = '$alias'";
		}

		if (!empty($order))
			$order="ORDER BY " . $order;

		$query="select $fields from $table $fieldswhere";

		if ($debug) {
			echo "<br />---------------------- QUERY -------------------<br /> $query <br />-----------------------------------------<br />";
			exit;
		}

		return $this->query($query);
	}

};

/* Create database connection */
$database = new Database;

?>
