<?php
header("Content-Type:application/json");
header("Access-Control-Allow-Origin: *");
include_once "../history/view.php";
include_once "../validation/index.php";

// Global variables
$ticket_id = $_GET["ticket_id"];

/**
 * route        /api/history/
 * description  get all history
 * method       GET
 */
if($_SERVER["REQUEST_METHOD"] === "GET") {
  
  /**
   * instanciate classes
   */
  $history_view = new HistoryView();
  $error_handler = new ErrorHandler();

  /**
   * route        /api/history/?ticket_id=:id
   * description  get all history form a single ticket
   * method       GET
   */
  if(isset($ticket_id)) {

    /**
     * Sanitize or validate ticket-id
     */
    $is_sanitized = $error_handler->sanitize_string(array($ticket_id));
    $is_validated = $error_handler->validate_string(array($ticket_id));
    if (!$is_sanitized && !$is_validated) {
      echo json_encode(array(
        "message" => "could not validate and sanitize"
      ));
      exit;
    }

    /**
     * Get all history for a single ticket
     */
    $history_view->show_single_history($ticket_id);
    exit;
  }

  /**
   * Get all history
   */
  $history_view->show_history();
  exit;
}

/**
 * route        /api/history/
 * description  add history
 * method       POST
 */
if($_SERVER["REQUEST_METHOD"] === "POST") {

  /**
   * instanciate classes
   */
  $history_view = new HistoryView();
  $error_handler = new ErrorHandler();
  
  /**
   * Get JSON data
   */
  $data = json_decode(file_get_contents("php://input"), true);
  $author = $data["author"];
  $action = $data["action"];
  $ticket_id = $data["ticketId"];
  $added_at = $data["addedAt"];
  $data_array = array(
    $author,
    $action,
    $ticket_id,
    $added_at
  );

  /**
   * check if any field is empty
   */
  $is_empty = $error_handler->validate_empty_values($data_array);
  if ($is_empty) {
    echo json_encode(array(
      "message" => "please fill all the fields"
    ));
    exit;
  }

  /**
   * sanitize data
   */
  $is_sanitized = $error_handler->sanitize_string($data_array);
  if (!$is_sanitized) {
    echo json_encode(array(
      "message" => "could not sanitize input"
    ));
    exit;
  }

  /**
   * create history entry
   */
  $set_history = $history_view->add_history($author, $action, $ticket_id, $added_at);
  if(!$set_history) {
    echo json_encode(array(
      "success" => false,
      "message" => "Could not create history"
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
      "author" => $author,
      "action" => $action,
      "addedAt" => $added_at,
      "ticketId" => $ticket_id
    )
  ));
  exit;  
}
