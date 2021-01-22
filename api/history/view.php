<?php
include_once "../history/model.php";
class HistoryView extends HistoryModel {

  /**
   * get all history
   */
  public function show_history() {
    $results = parent::get_history();
    $num_of_row = $results->rowCount();

    /**
     * Check if there are any results
     */
    if($num_of_row <= 0) {
      echo json_encode(array(
        "message" => "None found"
      ));
    }

    /**
     * create array of history
     */
    $history_array = array();
    while($row = $results->fetch(PDO::FETCH_ASSOC)) {
      extract($row);
      $history_item = array(
        "id" => $id,
        "author" => $author,
        "action" => $action,
        "addedAt" => $added_at,
        "ticketId" => $ticket_id
      );
      array_push($history_array, $history_item);
    }

    /**
     * Display successfull message
     */
    echo json_encode(array(
      "count" => $num_of_row,
      "success" => true,
      "data" => $history_array
    ));
  }

  /**
   * get all history for a ticket
   */
  public function show_single_history(string $ticket_id) {
    $results = parent::get_single_history($ticket_id);
    $num_of_row = $results->rowCount();

    /**
     * Check if there are any results
     */
    if($num_of_row <= 0) {
      echo json_encode(array(
        "message" => "None found",
        "data" => array()
      ));
      exit;
    }
    
    /**
     * create array of history
     */
    $history_array = array();
    while($row = $results->fetch(PDO::FETCH_ASSOC)) {
      extract($row);
      $history_item = array(
        "id" => $id,
        "author" => $author,
        "action" => $action,
        "addedAt" => $added_at,
        "ticketId" => $ticket_id
      );
      array_push($history_array, $history_item);
    }

    /**
     * Display successfull message
     */
    echo json_encode(array(
      "count" => $num_of_row,
      "success" => true,
      "data" => $history_array
    ));
  }

  /**
   * create a history entry
   */
  public function add_history(
    string $author,
    string $action,
    string $ticket_id,
    string $added_at
  ) {
    $results = parent::post_history($author, $action, $ticket_id, $added_at);

    if(!$results) return false;
    else return true;
  }
}