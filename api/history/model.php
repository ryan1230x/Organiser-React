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
include_once "../config/Database.php";
class HistoryModel extends Database {

  protected function get_histroy() {
    $query = "SELECT * FROM history";
    $stmt = $this->connect()->query($query);
    return $stmt;
  }

  protected function get_single_history(string $ticket_id) {
    $query = "SELECT * FROM history WHERE ticket_id = ?";
    $conn = $this->connect();
    $stmt = $conn->prepare($query);
    $stmt->execute([$ticket_id]);
    return $stmt;
  }

  protected function post_history(
    string $author, 
    string $action, 
    string $ticket_id
  ) {
    $query = "INSERT INTO history
      SET 
        author = :author, 
        action = :action,
        ticket_id = :ticket_id";
    $conn = $this->connect();
    $stmt = $conn->prepare($query);
    $stmt->bindValue("author", $author);
    $stmt->bindValue("action", $action);
    $stmt->bindValue("ticket_id", $ticket_id);
    $stmt->execute();
    return $stmt;
  }
}