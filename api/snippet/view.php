<?php
include_once "./model.php";
class SnippetView extends SnippetModel {

  /**
   * Get all snippets for a user
   */
  public function show_single_snippets(string $username) {
    $result = parent::get_single_snippets($username);
    $num_of_rows = $result->rowCount();

    if($num_of_rows <= 0) {
      echo json_encode(array(
        "message" => "None found",
        "data" => array()
      ));
      exit;
    }

    $snippets_array = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);
      $snippet_item = array(
        "id" => $id,
        "title" => $title,
        "body" => $body,
        "author" => $author,
        "createdAt" => $created_at,
        "snippetId" => $snippet_id
      );
      array_push($snippets_array, $snippet_item);
    }

    echo json_encode(array(
      "count" => $num_of_rows,
      "success" => true,
      "data" => $snippets_array
    ));
  }

  /**
   * Add snippet
   */
  public function add_snippet(
    string $title,
    string $body,
    string $author,
    string $created_at,
    string $snippet_id
  ) {
    $result = parent::post_snippet(
      $title,
      $body,
      $author,
      $created_at,
      $snippet_id
    );
    if(!$result) return false;
    else return true;
  }

  /**
   * Delete snippet
   */
  public function delete_snippet(string $snippet_id) {
    $result = parent::delete_snippet($snippet_id);
    if(!$result) return false;
    else return true;
  }

}