<?php
include_once "../config/Database.php";
class SnippetModel extends Database {

  /**
   * Get all Snippets for a user
   */
  protected function get_single_snippets(string $username) {
    $query = "SELECT * FROM snippets WHERE author = ?";
    $conn = parent::connect();
    $stmt = $conn->prepare($query);
    $stmt->execute([$username]);
    return $stmt;
  }

  /**
   * Add a snippet
   */
  protected function post_snippet(
    string $title,
    string $body,
    string $author,
    string $created_at,
    string $snippet_id
  ) {
    $query = "INSERT INTO snippets
    SET
      title = :title,
      body = :body,
      author = :author,
      created_at = :created_at,
      snippet_id = :snippet_id";
    $conn = parent::connect();
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":title", $title);
    $stmt->bindValue(":body", $body);
    $stmt->bindValue(":author", $author);
    $stmt->bindValue(":created_at", $created_at);
    $stmt->bindValue(":snippet_id", $snippet_id);
    $stmt->execute();
    return $stmt;
  }

  /**
   * delete a snippet
   */
  protected function delete_snippet(string $snippet_id) {
    $query = "DELETE FROM snippets WHERE snippet_id = ?";
    $conn = parent::connect();
    $stmt = $conn->prepare($query);
    $stmt->execute([$snippet_id]);
    return $stmt;
  }

  /**
   * updated a snippet
   */
  protected function put_snippet(
    string $title,
    string $body,
    string $author,
    string $created_at,
    string $snippet_id
  ) {
    $query = "UPDATE snippets
    SET
      title = :title,
      body = :body,
      author = :author,
      created_at = :created_at,
      snippet_id = :snippet_id";
    $conn = parent::connect();
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":title", $title);
    $stmt->bindValue(":body", $body);
    $stmt->bindValue(":author", $author);
    $stmt->bindValue(":created_at", $created_at);
    $stmt->bindValue(":snippet_id", $snippet_id);
    $stmt->execute();
    return $stmt;
    
  }

}