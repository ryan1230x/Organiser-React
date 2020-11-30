<?php
include_once "../ticket/model.php";
class TicketView extends TicketModel  {

    public function show_tickets() {
        $results = $this->get_tickets();
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
                "created_by" => $created_by,
                "created_at" => $created_at
            );
            array_push($ticket_array, $ticket_item);
        }

        echo json_encode(array(
            "count" => $num_of_rows,
            "success" => true,
            "data" => $ticket_array
        ));
    }

    public function show_single_ticket(int $ticket_id) {
        $results = $this->get_single_ticket($ticket_id);
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
                "created_by" => $created_by,
                "created_at" => $created_at
            );
            array_push($ticket_array, $ticket_item);
        }

        echo json_encode(array(
            "count" => $num_of_rows,
            "success" => true,
            "data" => $ticket_array
        ));
    }

    public function add_ticket() {}
}