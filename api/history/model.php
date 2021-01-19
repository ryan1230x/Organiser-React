<?php
include_once "../config/Database.php";
class HistoryModel extends Database {

  /**
   * Get all history
   */
  protected function get_history() {
    $query = "SELECT * FROM history";
    $stmt = parent::connect()->query($query);
    return $stmt;
  }

  /**
   * Get history for a single ticket
   */
  protected function get_single_history(string $ticket_id) {
    $query = "SELECT * FROM history WHERE ticket_id = ? ORDER BY id DESC";
    $conn = parent::connect();
    $stmt = $conn->prepare($query);
    $stmt->execute([$ticket_id]);
    return $stmt;
  }

  /**
   * Created history entry
   */
  protected function post_history(
    string $author, 
    string $action, 
    string $ticket_id,
    string $added_at
  ) {
    $query = "INSERT INTO history
      SET 
        author = :author, 
        action = :action,
        ticket_id = :ticket_id,
        added_at = :added_at";
    $conn = parent::connect();
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":author", $author);
    $stmt->bindValue(":action", $action);
    $stmt->bindValue(":ticket_id", $ticket_id);
    $stmt->bindValue(":added_at", $added_at);
    $stmt->execute();
    return $stmt;
  }
}