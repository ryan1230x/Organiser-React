<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type:application/json");
include_once "../../validation/index.php";
include_once "../view.php";

/**
 * route        /api/ticket/status/?ticket_id=?
 * description  update service information
 * method       PUT
 */
if($_SERVER["REQUEST_METHOD"] === "PUT") {

    $ticket_view = new TicketView();
    $error_handler = new ErrorHandler();

    $data = json_decode(file_get_contents("php://input"), true);
    $status = $data["status"]; 
    $ticket_id = $data["ticketId"];
    $data_array = array($status, $ticket_id);

    $is_empty = $error_handler->validate_empty_values($data_array);
    if($is_empty) {
        echo json_encode(array(
            "message" => "Please fill all the fields"
        ));
        exit;
    }

    $update_ticket = $ticket_view->update_status($status, $ticket_id);
    if(!$update_ticket) {
        echo json_encode(array(
            "message" => "could not update status information"
        ));
        exit;
    }

    echo json_encode(array(
        "success" => true,
        "message" => "Update successfully",
        "data" => array(
            "status" => $status,
            "ticketId" => $ticket_id
        )
    ));
    exit;

}
