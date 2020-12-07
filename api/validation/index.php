<?php
class ErrorHandler {
	
	/*
	 * check is any of the values are emtpy
	 * if there is an empty value execute the 
	 * callback function
	 * */
	public function validate_empty_values(array $json_values) {
		foreach($json_values as $value) {
			if(empty($value)) {
				return false;
			}
		}
		return true;
	}
	
	/*
	 * sanitize the array of strings
	 * return false if the filter fails
	 * */
	public function sanitize_string(array $strings) {
		foreach($strings as $value) {
			if(!filter_var($value, FILTER_SANITIZE_STRING)) {
				return false;
			}
		}
		return true;
	}
	
	/*
	 * sanitize the array of numbers
	 * return false if the filter fails
	 * */
	public function sanitize_int(array $numbers) {
		foreach($numbers as $value) {
			if(!filter_var($value, FILTER_SANITIZE_NUMBER_INT)) {
				return false;
			}
		}
		return true;
	}
	
	/*
	 * validate the array of string against a regex pattern
	 * return false if the values do not match
	 * */
	public function validate_string(array $strings) {
		
		$pattern = "^[a-z A-Z]+$";
		$options = array("options" => array("regexp" => $pattern));
		
		foreach($strings as $value) {
			if(!filter_var($value,  FILTER_VALIDATE_REGEXP, $options)) {
				return false;
			}
		}
		return true;
	}
	
	/*
	 * validate the array of integers
	 * return false if the values are not integers
	 * */
	public function validate_int(array $numbers) {
		$options = array("options" => array("min_range" => 0));
		foreach($numbers as $value) {
			if(!filter_var($value, FILTER_VALIDATE_INT, $options)) {
				return false;
			}
		}
		return true;
	}
}
