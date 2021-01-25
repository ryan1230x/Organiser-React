<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type:application/json");
include_once "./view.php";
include_once "../validation/index.php";

if($_SERVER["REQUEST_METHOD"] === "GET") {
  
  /**
   * Instanciate classes
   */
  $snippet_view = new SnippetView();

  /**
   * Check if there is a query parameter of user
   */  
  if(isset($_GET["username"])) {
    $snippet_view->show_single_snippets($_GET["username"]);
    exit;
  }

  echo json_encode(array(
    "message" => "URL parameter `username` missing"
  ));
  exit;


}

if($_SERVER["REQUEST_METHOD"] === "POST") {

  /**
   * Instanciate classes
   */
  $snippet_view = new SnippetView();

  /**
   * Get all the JSON
   */
  $data = json_decode(file_get_contents("php://input"), true);
  $title = $data["title"];
  $body = $data["body"];
  $author = $data["author"];
  $created_at = $data["createdAt"];
  $snippet_id = sha1(date("U") . $created_at);
  $data_array = array($title, $body, $author, $created_at);

  /**
   * Create the snippet
   */
  $set_snippet = $snippet_view->add_snippet(
    $title,
    $body,
    $author,
    $created_at,
    $snippet_id
  );
  if(!$set_snippet) {
    echo json_encode(array(
      "success" => false,
      "message" => "Could not add comment"
    ));
    exit;
  }

  /**
   * display successfull message
   */
  echo json_encode(array(
    "success" => true,
    "message" => "Added successfully",
    "data" => array(
      "title" => $title,
      "body" => $body,
      "author" => $author,
      "createdAt" => $created_at,
      "snippetId" => $snippet_id
    )
  ));
  exit;

}

if($_SERVER["REQUEST_METHOD"] === "DELETE") {

  /**
   * Instanciate classes
   */
  $snippet_view = new SnippetView();

  /**
   * Get snippet id from URL
   */
  $snippet_id = $_GET["id"];

  /**
   * Check if the id is empty
   */
  if(empty($snippet_id)) {
    echo json_encode(array(
      "message" => "please fill in the fields"
    ));
    exit;
  }

  /**
   * delete snippet
   */
  $set_delete = $snippet_view->delete_snippet($snippet_id);
  if(!$set_delete) {
    echo json_encode(array(
      "success" => false,
      "message" => "snippet could not be deleted"
    ));
    exit;
  }

  /**
   * display success message
   */
  echo json_encode(array(
    "success" => true,
    "message" => "delete successfully",
    "data" => array(
      "snippetId" => $snippet_id
    )
  ));
  exit;

}