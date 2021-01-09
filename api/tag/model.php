<?php
include_once "../config/Database.php";
class TagModel extends Database {

  protected function get_tags() {
    $query = "SELECT * FROM tags";
    $stmt = parent::connect()->query($query);
    return $stmt;
  }

  /**
   * Get all tags from a single ticket
   */
  protected function get_single_ticket(string $ticket_id) {
    $query = "SELECT * FROM tags WHERE ticket_id = ? ORDER BY id DESC";
    $conn = parent::connect();
    $stmt = $conn->prepare($query);
    $stmt->execute([$ticket_id]);
    return $stmt;
  }

  /**
   * Add a tag to a ticket
   */
  protected function post_tag(
    string $ticket_id,
    string $tag,
    string $color
  ) {
    $query = "INSERT INTO tags
    SET
      tag = :tag,
      color = :color,
      ticket_id = :ticket_id";
    $conn = parent::connect();
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":tag", $tag);
    $stmt->bindValue(":ticket_id", $ticket_id);
    $stmt->bindValue(":color", $color);
    $stmt->execute();
    return $stmt;
  }

  /**
   * Delete a tag
   */
  protected function delete_tag(string $ticket_id, int $id) {
    $query = "DELETE FROM tags WHERE ticket_id = ? AND id = ?";
    $conn = parent::connect();
    $stmt = $conn->prepare($query);
    $stmt->execute([$ticket_id, $id]);
    return $stmt;
  }
}
