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
  $history_view = new HistoryView();

  /**
   * route        /api/history/?ticket_id=:id
   * description  get all history form a single ticket
   * method       GET
   */
  if(isset($ticket_id)) {
    $history_view->show_single_history($ticket_id);
    exit;
  }

  $history_view->show_history();
}

/**
 * route        /api/history/
 * description  add history
 * method       POST
 */
if($_SERVER["REQUEST_METHOD"] === "POST") {
  $history_view = new HistoryView();
  
  $data = json_decode(file_get_contents("php://input"), true);

  $author = $data["author"];
  $action = $data["action"];
  $ticket_id = $data["ticket_id"];
  $data_array = array(
    $author,
    $action,
    $ticket_id
  );

  $set_history = $history_view->add_history($author, $action, $ticket_id);
  if(!$set_history) {
    echo json_encode(array(
      "success" => false,
      "message" => "Could not create history"
    ));
    exit;
  }

  echo json_encode(array(
    "success" => true,
    "message" => "Created successfully"
  ));
  exit;  
}
