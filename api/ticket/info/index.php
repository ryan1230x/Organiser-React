<?php
header("Access-Allow-Control-Origin:*");
header("Content-Type:application/json");
include_once "../view.php";
include_once "../../validation/index.php";

// Global variables
$ticket_id = $_GET["ticket_id"];

/**
 * route        /api/ticket/info/?ticket_id=?
 * description  update info information
 * method       PUT
 */
if($_SERVER["REQUEST_METHOD"] === "PUT") {

    $ticket_view = new TicketView();
    $error_handler = new ErrorHandler();

    $data = json_decode(file_get_contents("php://input"), true);
    $reference = $data["reference"];
    $name = $data["name"];
    $landline = $data["landline"];
    $contact_number = $data["contact_number"];
    $data_array = array(
        $reference,
        $name,
        $landline,
        $contact_number
    );


    $is_empty = $error_handler->validate_empty_values($data_array);
    if($is_empty) {
        echo json_encode(array(
            "message" => "Please fill all the fields"
        ));
        exit;
    }

    $update_ticket = $ticket_view->update_info($name, $landline, $contact_number, $ticket_id);
    if(!$update_ticket) {
        echo json_encode(array(
            "message" => "could not update address information"
        ));
        exit;
    }

    echo json_encode(array(
        "success" => true,
        "message" => "Update successfully"
    ));
    exit;
}
