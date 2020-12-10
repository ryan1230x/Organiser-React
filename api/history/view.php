<?php
/**
 * Database Schema
 * ---------------
 * id int unsigned not null primary key auto_increment
 * author varchar(200) not null
 * action text not null
 * added_at timestamp default current_timestamp()
 * ticket_id text not null
 */
include_once "./model.php";
class HistoryView extends HistoryModel {

  public function show_history() {
    $results = $this->get_history();
    $num_of_row = $results->rowCount();

    if($num_of_row <= 0) {
      echo json_encode(array(
        "message" => "None found"
      ));
    }

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

    echo json_encode(array(
      "count" => $num_of_row,
      "success" => true,
      "data" => $history_array
    ));
  }

  public function show_single_history(string $ticket_id) {
    $results = $this->get_single_history($ticket_id);
    $num_of_row = $results->rowCount();

    if($num_of_row <= 0) {
      echo json_encode(array(
        "message" => "None found"
      ));
    }

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

    echo json_encode(array(
      "count" => $num_of_row,
      "success" => true,
      "data" => $history_array
    ));
  }

  public function add_history(
    string $author,
    string $action,
    string $ticket_id
  ) {
    $results = $this->post_history($author, $action, $ticket_id);

    if(!$results) return false;
    else return true;
  }
}