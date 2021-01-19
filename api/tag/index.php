<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: *");
include_once "../validation/index.php";
include_once "./view.php";

/**
 * route    /api/tag/
 * description  Get all tags
 * method     GET
 */
if ($_SERVER["REQUEST_METHOD"] === "GET") {

  $ticket_id = $_GET["ticket_id"];

  /**
   * Instanciate classes
   */
  $tag_view = new TagView();
  $error_handler = new ErrorHandler();

  /**
   * route    /api/tag/?ticket_id=:id
   * description  Get all tags for a single ticket
   * method     GET
   */
  if(isset($ticket_id)) {

    /**
     * sanitize and validate the ticket-id
     */
    $is_sanitized = $error_handler->sanitize_string(array($ticket_id));
    $is_validated = $error_handler->validate_string(array($ticket_id));

    /**
     * if not sanitized not valid display error message
     */
    if(!$is_sanitized && !$is_validated) {
      echo json_encode(array(
        "message" => "Could not sanitize and validate"
      ));
      exit;
    }

    /**
     * Get all the tags for a single ticket
     */
    $tag_view->show_single_tag($ticket_id);
    exit;
  }

  $tag_view->show_tags();
  exit;
}

/**
 * route    /api/tag/
 * description  Create a tag
 * method     POST
 */
if ($_SERVER["REQUEST_METHOD"] === "POST") {

  /**
   * Instanciate classes
   */
  $tag_view = new TagView();
  $error_handler = new ErrorHandler();

  /**
   * Get All the JSON data
   */
  $data = json_decode(file_get_contents("php://input"), true);
  $ticket_id = $data["ticketId"];
  $tag = $data["tag"];
  $color = $data["color"];
  $tag_id = sha1(date("U") . $ticket_id);
  $data_array = array($ticket_id, $tag, $color, $tag_id);

  /**
  * Check if there are any empty fields
  */
  $is_empty = $error_handler->validate_empty_values($data_array);
  if ($is_empty) {
    echo json_encode(array(
      "message" => "Please fill all the fields"
    ));
    exit;
  }

  /**
   * Create the tag
   */
  $set_tag = $tag_view->add_tag($ticket_id, $tag, $color, $tag_id);
  if (!$set_tag) {
    echo json_encode(array(
      "success" => false,
      "message" => "Could not create tag"
    ));
    exit;
  }

  /**
   * Display successfull message
   */
  echo json_encode(array(
    "success" => true,
    "message" => "Created successfully",
    "data" => array(
      "tag_id" => $tag_id,
      "tag" => $tag,
      "ticketId" => $ticket_id,
      "color" => $color
    )
  ));
  exit;
}

/**
 * route        /api/tag/?id=:id
 * description  Delete a tag
 * method       DELETE
 */
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {

  /**
   * Instanciate classes
   */
  $tag_view = new TagView();
  $error_handler = new ErrorHandler();

  /**
   * Get all the JSON data
   */
  //$data = json_decode(file_get_contents("php://input"), true);
  $id = $_GET["id"];
  $data_array = array($id);

  /**
   * Check if there are empty fields
   */
  $is_empty = $error_handler->validate_empty_values($data_array);
  if ($is_empty) {
    echo json_encode(array(
      "success" => false,
      "message" => "empty fields"
    ));
    exit;
  }

  /**
   * Delete the tag
   */
  $set_tag = $tag_view->remove_tag($id);
  if (!$set_tag) {
    echo json_encode(array(
      "success" => false,
      "message" => "Could not delete tag"
    ));
    exit;
  }

  /**
   * Display successfull message
   */
  echo json_encode(array(
    "success" => true,
    "message" => "Deleted successfully",
    "data" => array(
      "id" => $id     
    )
  ));
  exit;
}
