<?php
include_once "./model.php";
class TicketView extends TicketModel  {

  public function show_all_tickets() {
    $results = parent::get_all_tickets();
    $num_of_rows = $results->rowCount();

    if($num_of_rows <= 0) {
      echo json_encode(array(
        "message" => "None found"
      ));
      exit;
    }

    $ticket_array = array();
    while($row = $results->fetch(PDO::FETCH_ASSOC)) {
      extract($row);
      $ticket_item = array(
        "id" => $id,
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
        "createdAt" => $created_at,
        "ticketId" => $ticket_id
      );
      array_push($ticket_array, $ticket_item);
    }

    echo json_encode(array(
      "count" => $num_of_rows,
      "success" => true,
      "data" => $ticket_array
    ));
  }

  public function show_open_tickets() {
    $results = parent::get_open_tickets();
    $num_of_rows = $results->rowCount();

    if($num_of_rows <= 0) {
      echo json_encode(array(
        "message" => "None found"
      ));
      exit;
    }

    $ticket_array = array();
    while($row = $results->fetch(PDO::FETCH_ASSOC)) {
      extract($row);
      $ticket_item = array(
        "id" => $id,
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
        "createdAt" => $created_at,
        "ticketId" => $ticket_id
      );
      array_push($ticket_array, $ticket_item);
    }

    echo json_encode(array(
      "count" => $num_of_rows,
      "success" => true,
      "data" => $ticket_array
    ));
  }

  public function show_closed_tickets() {
    $results = parent::get_closed_tickets();
    $num_of_rows = $results->rowCount();

    if($num_of_rows <= 0) {
      echo json_encode(array(
        "message" => "None found"
      ));
      exit;
    }

    $ticket_array = array();
    while($row = $results->fetch(PDO::FETCH_ASSOC)) {
      extract($row);
      $ticket_item = array(
        "id" => $id,
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
        "createdAt" => $created_at,
        "ticketId" => $ticket_id
      );
      array_push($ticket_array, $ticket_item);
    }

    echo json_encode(array(
      "count" => $num_of_rows,
      "success" => true,
      "data" => $ticket_array
    ));
  }

  public function show_closed_tickets_by_network() {
    $results = parent::get_closed_ticket_by_network();
    $num_of_rows = $results->rowCount();
    
    $network_options = parent::get_closed_ticket_networks();

    if ($num_of_rows <= 0) {
      echo json_encode(array(
        "message" => "None found",
        "num" => $num_of_rows
      ));
      exit;
    }

   $network_options_array = array();
    while($row = $network_options->fetch(PDO::FETCH_ASSOC)) {
      extract($row);
      $network_options_item = $network;
      array_push($network_options_array, $network_options_item);
    }
    
    $ticket_array = array();
    while($row = $results->fetch(PDO::FETCH_ASSOC)) {
      extract($row);
      $ticket_item = $network;
      array_push($ticket_array, $ticket_item);
    }

    echo json_encode(array(
      "success" => true,
      "networkOptions" => $network_options_array,
      "data" => $ticket_array
    ));

  }

  public function show_single_ticket(string $ticket_id) {
    $results = parent::get_single_ticket($ticket_id);
    $num_of_rows = $results->rowCount();

    if($num_of_rows <= 0) {
      echo json_encode(array(
        "message" => "None found"
      ));
      exit;
    }
    
    while($row = $results->fetch(PDO::FETCH_ASSOC)) {
      extract($row);
      $ticket_item = array(
        "id" => $id,
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
        "createdAt" => $created_at,
        "ticketId" => $ticket_id,
      );            
    }

    echo json_encode(array(
      "count" => $num_of_rows,
      "success" => true,
      "data" => $ticket_item
    ));
  }

  public function add_ticket(
    string $name,
    string $landline,
    string $contact_number,
    string $reference,
    string $address,
    string $network,
    string $portability,
    string $package,
    string $service,
    string $requested_date,
    string $created_by,
    string $ticket_id,
    string $status
  ) {
    $results = $this->post_ticket(
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

    if(!$results) return false;
    else return true;
  }

  public function update_ticket(
    string $address,
    string $name,
    string $landline,
    string $contact_number,
    string $network,
    string $service,
    string $portability,
    string $package,
    string $requested_date,
    string $status,
    string $ticket_id
  ) {
    $results = $this->put_ticket(
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

    if(!$results) return false;
    else return true;       
  }

  public function update_address(string $address, string $ticket_id) {
    
    $results = $this->set_put_address($address, $ticket_id);
    if(!$results) return false;
    else return true;
  }

  public function update_info(
    string $name,
    string $landline,
    string $contact_number,
    string $ticket_id
  ) {

    $results = $this->set_put_info($name, $landline, $contact_number, $ticket_id);
    if(!$results) return false;
    else return true;
  }

  public function update_service(
    string $network,
    string $service,
    string $portability,
    string $package,
    string $requested_date,
    string $ticket_id
  ) {

    $results = $this->set_put_service(
      $network, 
      $service, 
      $portability, 
      $package, 
      $requested_date, 
      $ticket_id
    );

    if(!$results) return false;
    else return true;
  }

  public function update_status(string $status, string $ticket_id) {

    $results = $this->set_put_status($status, $ticket_id);
    if(!$results) return false;
    else return true;
  }

}
