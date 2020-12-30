<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "../comment/view.php";
include_once "../validation/index.php";

// Global variables
$ticket_id = $_GET["ticket_id"];


/**
 * route        /api/comments/
 * description  get all the comments
 * method       GET
 */
if($_SERVER["REQUEST_METHOD"] === "GET") {

    /**
     * Instanciate classes
     */
    $comment_view = new CommentView();
    $error_handler = new ErrorHandler();
    
    /**
     * route        /api/comments/?ticket_id=:id
     * description  get all comments from a single client reference
     * method       GET
     */
    if(isset($ticket_id)) {

        /**
         * Sanitize and validate the ticket-id
         */
        $is_sanitized = $error_handler->sanitize_string(array($ticket_id));
        $is_validated = $error_handler->validate_string(array($ticket_id));
        if (!$is_sanitized && !$is_validated) {
            echo json_encode(array(
                "message" => "Could not sanitize and validate"
            ));
            exit;
        }

        /**
         * Get all the comments for a single ticket
         */
        $comment_view->show_single_comment($ticket_id);
        exit;
    }

    /**
     *  Get all the comments in the database 
     */
    $comment_view->show_comments();
    exit;
}

/**
 * route        /api/comments/
 * description  add a new comment
 * method       POST
 */
if($_SERVER["REQUEST_METHOD"] === "POST") {

    /**
     * Instanciate classes
     */
    $comment_view = new CommentView();
    $error_handler = new ErrorHandler();

    /**
     *  Get all the JSON data 
     */
    $data = json_decode(file_get_contents("php://input"), true);
    $comment = $data["comment"];
    $author = $data["author"];
    $ticket_id = $data["ticketId"];
    $added_at = $data["addedAt"];
    $data_array = array($comment, $author, $ticket_id, $added_at);

    /**
     * Check if any of the fields are empty
     */
    $is_empty = $error_handler->validate_empty_values($data_array);
    if ($is_empty) {
        echo json_encode(array(
            "message" => "Please fill in all the fields"
        ));
        exit;
    }

    /**
     * Sanitize data
     */
    $is_sanitized = $error_handler->sanitize_string($data_array);
    if (!$is_sanitized) {
        echo json_encode(array(
            "message" => "The input could not be sanitized"
        ));
        exit;
    }

    /**
     * Validate data
     */
    $is_validated = $error_handler->validate_string($data_array);
    if (!$is_validated) {
        echo json_encode(array(
            "message" => "The input could not be validated"
        ));
        exit;
    }

    /**
     * Create the comment
     */
    $set_user = $comment_view->add_comment($comment, $author, $ticket_id, $added_at);
    if(!$set_user) {
        echo json_encode(array(
            "success" => false,
            "message" => "Could not add comment"
        ));
        exit;
    }
    
    /**
     * Display successfull message
     */
    echo json_encode(array(
        "success" => true,
        "message" => "Added successfully",
        "data" => array(
            "author" => $author,
            "comment" => $comment,
            "ticketId" => $ticket_id,
            "addedAt" => $added_at
        )
    ));
    exit;
}

/**
 * route        /api/comments/?ticket_id=:id
 * description  update a comment
 * method       PUT
 */
if($_SERVER["REQUEST_METHOD"] === "PUT") {

    /**
     * Instanciate classes
     */
    $comment_view = new CommentView();
    $error_handler = new ErrorHandler();

    /**
     * Get JSON data
     */
    $data = json_decode(file_get_contents("php://input"), true);
    $comment = $data["comment"];
    $ticket_id = $data["ticketId"];
    $data_array = array($comment, $ticket_id);

    /**
     * Check if any of the fields are empty
     */
    $is_empty = $error_handler->validate_empty_values($data_array);
    if ($is_empty) {
        echo json_encode(array(
            "message" => "Please fill in all the fields"
        ));
        exit;
    }

    /**
     * Sanitize data
     */
    $is_sanitized = $error_handler->sanitize_string($data_array);
    if (!$is_sanitized) {
        echo json_encode(array(
            "message" => "The input could not be sanitized"
        ));
        exit;
    }

    /**
     * Validate data
     */
    $is_validated = $error_handler->validate_string($data_array);
    if (!$is_validated) {
        echo json_encode(array(
            "message" => "The input could not be validated"
        ));
        exit;
    }

    /**
     * Edit comment
     */
    $set_update = $comment_view->edit_comment($comment, $reference);
    if(!$set_update) {
        echo json_encode(array(
            "success" => false,
            "message" => "comment cound not be updated"   
        ));
        exit;
    }

    /**
     * Display successfull message
     */
    echo json_encode(array(
        "success" => true,
        "message" => "Updated successfully"        
    ));
    exit;
}
