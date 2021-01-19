<?php
include_once "./model.php";
class TagView extends TagModel {

  /**
   * Get all the tags
   */
  public function show_tags() {
    $results = parent::get_tags();
    $num_of_rows = $results->rowCount();

    /**
     * Check if there are any tags
     */
    if ($num_of_rows <= 0) {
      echo json_encode(array(
        "message" => "None found",
        "data" => array()
      ));
      exit;
    }

    /**
    * Create array of tag-items
    */
    $tags_array = array();
    while ($row = $results->fetch(PDO::FETCH_ASSOC)) {
      extract($row);
      $tag_item = array(
        "tag_id" => $tag_id,
        "tag" => $tag,
        "ticketId" => $ticket_id,
        "color" => $color
      );
      array_push($tags_array, $tag_item);
    }

    /**
     * Display successfull message
     */
    echo json_encode(array(
      "count" => $num_of_rows,
      "success" => true,
      "data" => $tags_array
    ));
    exit;
  }

  /**
   * Get all the tags that belong to a single ticket
   */
  public function show_single_tag(string $ticket_id) {
    $results = parent::get_single_ticket($ticket_id);
    $num_of_rows = $results->rowCount();

    /**
     * Check if there are any tags
     */
    if ($num_of_rows <= 0) {
      echo json_encode(array(
        "message" => "None found",
        "data" => array()
      ));
      exit;
    }

    /**
     * Create array of tag-items
     */
    $tags_array = array();
    while ($row = $results->fetch(PDO::FETCH_ASSOC)) {
      extract($row);
      $tag_item = array(
        "tag_id" => $tag_id,
        "tag" => $tag,
        "ticketId" => $ticket_id,
        "color" => $color
      );
      array_push($tags_array, $tag_item);
    }

    /**
     * Display successfull message
     */
    echo json_encode(array(
      "count" => $num_of_rows,
      "success" => true,
      "data" => $tags_array
    ));
    exit;
  }

  /**
   * Create a tag
   */
  public function add_tag(
    string $ticket_id,
    string $tag,
    string $color,
    string $tag_id
  ) {
    $results = parent::post_tag($tag, $tag_id, $color, $ticket_id);
    if (!$results) return false;
    else return true;
  }

  /**
   * Delete a tag
   */
  public function remove_tag(string $id) {
    $results = parent::delete_tag($id);
    if (!$results) return false;
    else return true;
  }

}
