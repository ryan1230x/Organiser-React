<?php
include_once "../config/Database.php";
class CommentModel extends Database {

  private $db_table = "`comments`";

  /**
   * Get comments
   */
  protected function get_comments() {
    $query = "SELECT * FROM {$this->db_table} ORDER BY id DESC";
    $stmt = parent::connect()->query($query);
    return $stmt;
  }

  /**
   * Get all comments for a unique reference
   */
  protected function get_single_comment(string $reference) {
    $query = "SELECT * FROM {$this->db_table} WHERE ticket_id =? ORDER BY id DESC";
    $conn = parent::connect();
    $stmt = $conn->prepare($query);
    $stmt->execute([$reference]);
    return $stmt;
  }

  /**
   * Add a comment/ insert a comment
   */
  protected function post_comment(
    string $comment, 
    string $author, 
    string $ticket_id,
    string $added_at,
    string $comment_id
  ) {
    $query = "INSERT INTO {$this->db_table} 
      SET
        comment = :comment,
        author = :author,
        ticket_id = :ticket_id,
        added_at = :added_at,
        comment_id = :comment_id";
    $conn = parent::connect();
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":comment", $comment);
    $stmt->bindValue(":author", $author);
    $stmt->bindValue(":ticket_id", $ticket_id);
    $stmt->bindValue(":added_at", $added_at);
    $stmt->bindValue(":comment_id", $comment_id);
    $stmt->execute();
    return $stmt;
  }

  /**
   * Update a comment
   */
  protected function update_comment(string $comment, string $reference) {
    $query = "UPDATE {$this->db_table} 
    SET comment = :comment WHERE reference = :reference";
    $conn = parent::connect();
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":comment", $comment);
    $stmt->bindValue(":reference", $reference);
    $stmt->execute();
    return $stmt;
  }

  /**
   * Delete a comment
   */
  protected function delete_comment(string $id) {
    $query = "DELETE FROM comments WHERE comment_id = ?";
    $conn = parent::connect();
    $stmt = $conn->prepare($query);
    $stmt->execute([$id]);
    return $stmt;
  }

}