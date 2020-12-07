<?php
header("Access-Allow-Control-Origin: *");
header("Content-Type: application/json");
include_once "../ticket/view.php";
include_once "../config/Database.php";

// Global variables
$ticket_id = $_GET["ticket_id"];

/**
 * route        /api/ticket/
 * description  Get all tickets
 * method       GET
 */
if($_SERVER["REQUEST_METHOD"] === "GET") {
    $ticket_view = new TicketView();
    /**
     * route        /api/ticket/?ticket_id=?
     * description  Get a single ticket with the ticket-id
     * method       GET
     */
    if(isset($ticket_id)) {
        $ticket_view->show_single_ticket($ticket_id);
        exit;
    }

    $ticket_view->show_tickets();
}

/**
 * route        /api/ticket/
 * description  create a ticket
 * method       POST
 */
if($_SERVER["REQUEST_METHOD"] === "POST") {
    /*
        Get all the JSON data
    */
    $data = json_decode(file_get_contents("php://input"), true);

    $reference = $data["reference"]; 
    $address = $data["address"]; 
    $name = $data["name"];
    $landline = $data["landline"];
    $contact_number = $data["contact_number"];
    $network = $data["network"];
    $portability = $data["portability"];
    $package = $data["package"];
    $requested_date = $data["requested_date"];
    $service = $data["service"];
    $status = $data["status"];
    $created_by = $data["created_by"];
    $ticket_id = sha1(date("U") . $reference);
    $data_array = array(
        $name,
        $landline,
        $contact_number,
        $reference,
        $address,
        $network,
        $portability,
        $package,
        $service,
        $requested_date,
        $created_by,
        $ticket_id,
        $status
    );

    /*
        Check if any of the fields are empty
    */
    foreach($data_array as $value) {
        if(empty($value)) {
            echo json_encode(array(
                "message" => "Please fill all the fields"
            ));
            exit;
        }
    }

    $ticket_view = new TicketView();
    $set_ticket = $ticket_view->add_ticket(
        $name,
        $landline,
        $contact_number,
        $reference,
        $address,
        $network,
        $portability,
        $package,
        $service,
        $requested_date,
        $created_by,
        $ticket_id,
        $status
    );

    if(!$set_ticket) {
        echo json_encode(array(
            "success" => false,
            "message" => "Could not create ticket"
        ));
        exit;
    }
    echo json_encode(array(
        "success" => true,
        "message" => "Created successfully"
    ));
    exit;  
}

/*
    route       /api/ticket/?ticket_id=?
    description update a ticket
    method      PUT
 */
if($_SERVER["REQUEST_METHOD"] === "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);

    $reference = $data["reference"]; 
    $address = $data["address"]; 
    $name = $data["name"];
    $landline = $data["landline"];
    $contact_number = $data["contact_number"];
    $network = $data["network"];
    $portability = $data["portability"];
    $package = $data["package"];
    $requested_date = $data["requested_date"];
    $service = $data["service"];
    $status = $data["status"];
    $created_by = $data["created_by"];
    $ticket_id = sha1(date("U") . $reference);
    $data_array = array(
        $name,
        $landline,
        $contact_number,
        $reference,
        $address,
        $network,
        $portability,
        $package,
        $service,
        $requested_date,
        $created_by,
        $ticket_id,
        $status
    );

    foreach($data_array as $value) {
        if(empty($value)) {
            echo json_encode(array(
                "message" => "Please fill in all the fields"
            ));
            exit;
        }
    }

    $ticket_view = new TicketView();
    $update_ticket = $ticket_view->update_ticket($address, $ticket_id);
    if(!$update_ticket) {
        echo json_encode(array(
            "message" => "Could not update ticket"
        ));
        exit;
    }

    echo json_encode(array(
        "success" => true,
        "message" => "Updated successfully"
    ));
    exit; 

}

























