<?php
include_once "../comment/model.php";
class CommentView extends CommentModel {
    
  /**
   * Get all comments
   */
  public function show_comments() {
    $results = parent::get_comments();
    $num_of_rows = $results->rowCount();
        
    if($num_of_rows <= 0) {
      echo json_encode(array(
        "message" => "None found"
      ));
      exit;
    }

    $comments_array = array();
    while($row = $results->fetch(PDO::FETCH_ASSOC)) {
      extract($row);
      $comment_item = array(
        "id" => $id,
        "author" => $author,
        "comment" => $comment,
        "addedAt" => $added_at,
        "ticketId" => $ticket_id,
      );
      array_push($comments_array, $comment_item);
    }

    echo json_encode(array(
      "count" => $num_of_rows,
      "success" => true,
      "data" => $comments_array
    ));
  }

  /**
   * Get all comments for a unique reference
   */
  public function show_single_comment(string $reference) {
    $result = parent::get_single_comment($reference);
    $num_of_rows = $result->rowCount();

    if($num_of_rows <= 0) {
      echo json_encode(array(
        "message" => "None found",
        "data" => array()
      ));
      exit;
    }

    $comments_array = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);
      $comment_item = array(
        "id" => $id,
        "author" => $author,
        "comment" => $comment,
        "addedAt" => $added_at,
        "ticketId" => $ticket_id,
        "commentId" => $comment_id
      );
      array_push($comments_array, $comment_item);
    }

    echo json_encode(array(
      "count" => $num_of_rows,
      "success" => true,
      "data" => $comments_array
    ));
  }

  /**
   * Add comment
   */
  public function add_comment(
      string $comment, 
      string $author, 
      string $ticket_id,
      string $added_at,
      string $comment_id
  ) {
    $result = parent::post_comment(
      $comment, 
      $author, 
      $ticket_id, 
      $added_at, 
      $comment_id
    );
    if(!$result) return false;
    else return true;
  }

  /**
   * Update comment
   */
  public function edit_comment(string $comment, string $reference) {
    $result = parent::update_comment($comment, $reference);
    if(!$result) return false;
    else return true;
  }

  /**
   * Delete a comment
   */
  public function remove_comment(string $id) {
    $result = parent::delete_comment($id);
    if(!$result) return false;
    else return true;
  }

}