<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json");
include_once "../validation/index.php";
include_once "./view.php";

$ticket_id = $_GET["ticket_id"];

/**
 * route 		/api/tag/
 * description 	Get all tags
 * method 		GET
 */
if ($_SERVER["REQUEST_METHOD"] === "GET") {

	/**
	 * Instanciate classes
	 */
	$tag_view = new TagView();
	$error_handler = new ErrorHandler();
	
	/**
	 * route 		/api/tag/?ticket_id=:id
	 * description 	Get all tags for a single ticket
	 * method 		GET
	 */
	if(isset($ticket_id)) {
		
		/**
		 * sanitize and validate the ticket-id
		 */
		$is_sanitized = $error_handler->sanitize_string(array($ticket_id));
		$is_validated = $error_handler->validate_string(array($ticket_id));

		/**
		 * if not sanitized not valid display error message
		 */
    if(!$is_sanitized && !$is_validated) {
			echo json_encode(array(
				"message" => "Could not sanitize and validate"
      ));
      exit;
		}
		
		/**
		 * Get all the tags for a single ticket
		 */
		$tag_view->show_single_tag($ticket_id);
		exit;
	}
}

/**
 * route 		/api/tag/
 * description 	Create a tag
 * method 		POST
 */
if ($_SERVER["REQUEST_METHOD"] === "POST") {

	/**
	 * Instanciate classes
	 */
	$tag_view = new TagView();
	$error_handler = new ErrorHandler();

	/**
	 * Get All the JSON data
	 */
	$data = json_decode(file_get_contents("php://input"), true);

	$ticket_id = $data["ticketId"];
	$tag = $data["tag"];
	$data_array = array($ticket_id, $tag);

	/**
	 * Check if any fields are empty
	 */
	$is_empty = $error_handler->validate_empty_values(array($data_array));
	if ($is_empty) {
		echo json_encode(array(
			"message" => "Please fill all the fields"
		));
		exit;
	}

	/**
	 * Sanitize data
	 */
	$is_sanitized = $error_handler->sanitize_string($data_array);
	if (!$is_sanitized) {
		echo json_encode(array(
			"message" => "the input could not be sanitized"
		));
		exit;
	}

	/**
	 * validate data
	 */
	$is_validated = $error_handler->validate_string($data_array));
  if (!$is_validated) {
    echo json_encode(array(
    	"message" => "The input could not be validated"
    ));
    exit;
  }

	/**
	 * Create the tag
	 */
	$set_tag = $tag_view->add_tag($ticket_id, $tag);
	if (!$set_tag) {
		echo json_encode(array(
    	"success" => false,
      "message" => "Could not create tag"
		));
    exit;
	}

	/**
	 * Display successfull message
	 */
	echo json_encode(array(
		"success" => true,
		"message" => "Created successfully",
		"data" => array(
			"tag" => $tag,
      "ticketId" => $ticket_id 
    )
  ));
  exit;  
}

/**
 * route 		/api/tag/?ticket_id=:id
 * description 	Delete a tag
 * method 		DELETE
 */
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {

	/**
	 * Instanciate classes
	 */
	$tag_view = new TagView();
	$error_handler = new ErrorHandler();

	/**
	 * Get all the JSON data
	 */
	$data = json_decode(file_get_contents("php://input"), true);
	$ticket_id = $data["ticketId"];
	$id = $data["id"];
	$data_array = array($ticket_id, $id);

	/**
	 * Check if there are empty fields
	 */
	$is_empty = $error_handler->validate_empty_values(array($data_array));
	if ($is_empty) {
		echo json_encode(array(
    	"success" => false,
      "message" => "Could not create tag"
    ));
    exit;		
	}

	/**
	 * sanitize data
	 */
	$is_sanitized = $error_handler->sanitize_string(array($ticket_id));
	if (!$is_sanitized) {
		echo json_encode(array(
			"message" => "the input type string could not be sanitized"
		));
		exit;
	}

	$is_sanitized = $error_handler->sanitize_int(array($id));
	if (!$is_sanitized) {
		echo json_encode(array(
			"message" => "the input type int could not be sanitized"
		));
		exit;
	}

	/**
	 * validate data
	 */
	$is_validated = $error_handler->validate_string(array($ticket_id));
	if (!$is_validated) {
		echo json_encode(array(
			"message" => "the input type string could not be validated"
		));
		exit;
	}

	$is_validated = $error_handler->validate_int(array($id));
	if (!$is_validated) {
		echo json_encode(array(
			"message" => "the input type int could not be validated"
		));
		exit;
	}

	/**
	 * Delete the tag
	 */
	$set_tag = $tag_view->remove_tag($ticket_id, $id);
	if (!$set_tag) {
		echo json_encode(array(
			"success" => false,
			"message" => "Could not delete tag"
		));
		exit;
	}

	/**
	 * Display successfull message
	 */
	echo json_encode(array(
		"success" => true,
    "message" => "Deleted successfully",
    "data" => array(
			"id" => $id,        	
      "ticketId" => $ticket_id 
    )
  ));
  exit;  	
}
