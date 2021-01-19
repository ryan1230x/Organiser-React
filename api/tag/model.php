<?php
include_once "../config/Database.php";
class TagModel extends Database {

  protected function get_tags() {
    $query = "SELECT * FROM tags
    JOIN status USING(ticket_id)
    WHERE status = 'Open'";
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
    string $tag,
    string $tag_id,
    string $color,
    string $ticket_id
  ) {
    $query = "INSERT INTO tags
    SET
      tag = :tag,
      tag_id = :tag_id,
      color = :color,
      ticket_id = :ticket_id";
    $conn = parent::connect();
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":tag", $tag);
    $stmt->bindValue(":tag_id", $tag_id);
    $stmt->bindValue(":color", $color);
    $stmt->bindValue(":ticket_id", $ticket_id);
    $stmt->execute();
    return $stmt;
  }

  /**
   * Delete a tag
   */
  protected function delete_tag(string $id) {
    $query = "DELETE FROM tags WHERE tag_id = ?";
    $conn = parent::connect();
    $stmt = $conn->prepare($query);
    $stmt->execute([$id]);
    return $stmt;
  }
}
