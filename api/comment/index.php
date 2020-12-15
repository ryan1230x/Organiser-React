<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "../comment/view.php";

// Global variables
$ticket_id = $_GET["ticket_id"];


/**
 * route        /api/comments/
 * description  get all the comments
 * method       GET
 */
if($_SERVER["REQUEST_METHOD"] === "GET") {
    $comment_view = new CommentView();
    
    /**
     * route        /api/comments/?ticket_id=:id
     * description  get all comments from a single client reference
     * method       GET
     */
    if(isset($ticket_id)) {
        $comment_view->show_single_comment($ticket_id);
        exit;
    }

    $comment_view->show_comments();
}

/**
 * route        /api/comments/
 * description  add a new comment
 * method       POST
 */
if($_SERVER["REQUEST_METHOD"] === "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    $comment = $data["comment"];
    $author = $data["author"];
    $ticket_id = $data["ticketId"];
    $added_at = $data["addedAt"];

    $data_array = array($comment, $author, $ticket_id, $added_at);

    foreach($data_array as $value) {
        if(empty($value)) {
            echo json_encode(array(
                "message" => "Please fill in all the fields"
            ));
            exit;
        }
    }

    $comment_view = new CommentView();
    $set_user = $comment_view->add_comment($comment, $author, $ticket_id, $added_at);
    if(!$set_user) {
        echo json_encode(array(
            "success" => false,
            "message" => "Could not add comment"
        ));
        exit;
    }
    
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

    $data = json_decode(file_get_contents("php://input"), true);

    $comment = $data["comment"];
    $data_array = array($comment);

    if(empty($comment)) {
        echo json_encode(array(
            "message" => "Please fill in all the fields"
        ));
        exit;
    }


    $comment_view = new CommentView();
    $set_update = $comment_view->edit_comment($comment, $reference);
    if(!$set_update) {
        echo json_encode(array(
            "success" => false,
            "message" => "comment cound not be updated"   
        ));
        exit;
    }

    echo json_encode(array(
        "success" => true,
        "message" => "Updated successfully"
    ));
    exit;
}
