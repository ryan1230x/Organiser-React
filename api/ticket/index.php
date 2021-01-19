<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: *");
include_once "./view.php";
include_once "../validation/index.php";

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
   * route        /api/ticket/?ticket_id=:id
   * description  Get a single ticket with the ticket-id
   * method       GET
   */
  if(isset($_GET["ticket_id"])) {
    
    /**
     * Get ticket id from query parameter
     */
    $ticket_id = $_GET["ticket_id"];

    /**
    * get the ticket matching the ticket id
    */
    $ticket_view->show_single_ticket($ticket_id);
    exit;
  }

  /**
   * Search the database for query matches
   */
  if(isset($_GET["q"])) {

    /**
     * Get the search from query string parameter
     */
    $query_request = $_GET["q"]; 

    /**
     * sanitize and validated the query-request
     */
    $is_sanitized = $error_handler->sanitize_string(array($query_request));
    $is_validated = $error_handler->validate_string(array($query_request));
    if(!$is_sanitized && !$is_validated) {
      echo json_encode(array(
        "message" => "Could not sanitize and validate"
      ));
      exit;
  }

    /**
     * Display all the entries that match
     */
    $ticket_view->show_search_tickets($query_request);
    exit;
  }

  /**
  * Get all tickets
   */
  $ticket_view->show_tickets();
  exit;
}

/**
 * route        /api/ticket/
 * description  create a ticket
 * method       POST
 */
if($_SERVER["REQUEST_METHOD"] === "POST") {

  /**
   * Instanciate classes
   */
  $ticket_view = new TicketView();
  $error_handler = new ErrorHandler();

  /**
   * Get JSON data
   */
  $data = json_decode(file_get_contents("php://input"), true);
  $reference = $data["reference"]; 
  $address = $data["address"]; 
  $name = $data["name"];
  $landline = $data["landline"];
  $contact_number = $data["contactNumber"];
  $network = $data["network"];
  $portability = $data["portability"];
  $package = $data["clientPackage"];
  $requested_date = $data["requestedDate"];
  $service = $data["service"];
  $status = $data["status"];
  $created_by = $data["createdBy"];
  $ticket_id = sha1(date("U") . $reference);
  $data_array_int = array($reference, $landline, $contact_number);
  $data_array_strings = array(
      $name,      
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

  /**
   * Check if any of the fields are empty
   */
  $is_emtpy = $error_handler->validate_empty_values($data_array);
  if($is_emtpy) {
    echo json_encode(array(
      "message" => "Please fill all the fields",
      "fields" => $data
    ));
    exit;
  }

  /**
   * sanitize data
   */
  $is_sanitized = $error_handler->sanitize_string($data_array_strings);
  if (!$is_sanitized) {
    echo json_encode(array(
      "message"=> "could not sanitize input type string"
    ));
    exit;
  }

  $is_sanitized = $error_handler->sanitize_int($data_array_int);
  if (!$is_sanitized) {
    echo json_encode(array(
      "message" => "could not sanitize input type int"
    ));
    exit;
  }

  /**
   * Create ticket
   */
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

  /**
   * Display successfull message
   */
  echo json_encode(array(
    "success" => true,
    "message" => "Created successfully",
    "data" => array(
      "reference" => $reference,
      "name" => $name,
      "address" => $address,
      "landline" => $landline,
      "contactNumber" => $contact_number,
      "network" => $network,
      "service" => $service,
      "portability" => $portability,
      "clientPackage" => $package,
      "status" => $status,
      "requestedDate" => $requested_date,
      "createdBy" => $created_by,
      "ticketId" => $ticket_id,
    )
  ));
  exit;  
}

/**
 * route       /api/ticket/?ticket_id=:id
 * description update a ticket
 * method      PUT
 */
if($_SERVER["REQUEST_METHOD"] === "PUT") {

    /**
     * Get the ticket id from the url
     */
    $ticket_id = $_GET["ticket_id"];

    /**
     * instanciate classes
     */
    $ticket_view = new TicketView();
    $error_handler = new ErrorHandler();

    /**
     * get JSON data
     */
    $data = json_decode(file_get_contents("php://input"), true);
    $reference = $data["reference"]; 
    $address = $data["address"]; 
    $name = $data["name"];
    $landline = $data["landline"];
    $contact_number = $data["contactNumber"];
    $network = $data["network"];
    $portability = $data["portability"];
    $package = $data["clientPackage"];
    $requested_date = $data["requestedDate"];
    $service = $data["service"];
    $status = $data["status"];
    $created_by = $data["createdBy"];
    $data_array_int = array($reference, $landline, $contact_number);
    $data_array_strings = array(
        $name,      
        $address,
        $network,
        $portability,
        $package,
        $service,
        $requested_date,
        $created_by,
        $ticket_id,
        $status,
        $ticket_id
    );
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
        $status,
        $ticket_id
    );

    /**
     * Check if there are empty fields
     */
    $is_emtpy = $error_handler->validate_empty_values($data_array);
    if ($is_emtpy) {
      echo json_encode(array(
        "message" => "Please fill in all fields"
      ));
      exit;
    }

    /**
     * update ticket
     */
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

    /**
     * display successfull message
     */
    echo json_encode(array(
        "success" => true,
        "message" => "Updated successfully",
        "data" => array(
            "reference" => $reference,
            "name" => $name,
            "address" => $address,
            "landline" => $landline,
            "contactNumber" => $contact_number,
            "network" => $network,
            "service" => $service,
            "portability" => $portability,
            "clientPackage" => $package,
            "status" => $status,
            "requestedDate" => $requested_date,
            "createdBy" => $created_by,
            "ticketId" => $ticket_id,
        )
    ));
    exit; 
}
