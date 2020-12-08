<?php
header("Access-Allow-Control-Origin: *");
header("Content-Type: application/json");
include_once "../ticket/view.php";
include_once "../validation/index.php";

// Global variables
$ticket_id = $_GET["ticket_id"];

/**
 * route        /api/ticket/
 * description  Get all tickets
 * method       GET
 */
if($_SERVER["REQUEST_METHOD"] === "GET") {
    /**
     * Instanciate classes
     */
    $ticket_view = new TicketView();
    $error_handler = new ErrorHandler();

    /**
     * route        /api/ticket/?ticket_id=?
     * description  Get a single ticket with the ticket-id
     * method       GET
     */
    if(isset($ticket_id)) {

        $is_sanitized = $error_handler->sanitize_string(array($ticket_id));
        $is_validated = $error_handler->validate_string(array($ticket_id));

        if(!$is_sanitized && !$is_validated) {
            echo json_encode(array(
                "message" => "Could not sanitize and validate"
            ));
            exit;
        }
        $ticket_view->show_single_ticket($ticket_id);
        exit;
    }

    $ticket_view->show_tickets();
    exit;
}

/**
 * route        /api/ticket/
 * description  create a ticket
 * method       POST
 */
if($_SERVER["REQUEST_METHOD"] === "POST") {

    $ticket_view = new TicketView();
    $error_handler = new ErrorHandler();

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
    $is_emtpy = $error_handler->validate_empty_values($data_array);
    if($is_emtpy) {
        echo json_encode(array(
            "message" => "Please fill all the fields"
        ));
        exit;
    }
    
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

    $ticket_view = new TicketView();
    $error_handler = new ErrorHandler();

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

    $update_ticket = $ticket_view->update_ticket(
        $address,
        $name,
        $landline,
        $contact_number,
        $network,
        $service,
        $portability,
        $package,
        $requested_date,
        $status,
        $ticket_id
    );
    
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

























