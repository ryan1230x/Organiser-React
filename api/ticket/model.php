<?php
include_once "../config/Database.php";
class TicketModel extends Database {

    /*
        get all tickets
    */
    protected function get_tickets() {
        $query = "SELECT * FROM tickets";
        $conn = $this->connect();
        $stmt = $conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    /*
        Get all comments for a unique reference
    */
    protected function get_single_ticket(int $ticket_id) {
        $query = "SELECT * FROM `client_address`
        JOIN `client_info` USING(ticket_id)
        JOIN `client_service` USING(ticket_id)
        JOIN `comments` USING(ticket_id)
        JOIN `status` USING (ticket_id)
        WHERE ticket_id = ? ORDER BY id DESC";
        $conn = $this->connect();
        $stmt = $conn->prepare($query);
        $stmt->execute([$ticket_id]);
        return $stmt;
    }

    /*
        Helper functions for creating a ticket
    */
    private function post_address(
        string $reference, 
        string $address,
        int $ticket_id
    ) {
        $query = "INSERT INTO `client_address`
        SET
            `reference` = :reference
            `address` = :address
            `ticket_id` = : ticket_id";
        $conn = $this->connect();
        $stmt = $conn->prepare($query);
        $stmt->bindValue(":reference", $reference);
        $stmt->bindValue(":address", $address);
        $stmt->bindValue(":ticket_id", $ticket_id);
        $stmt->execute();
        return $stmt;
    }

    private function post_info(
        string $reference,
        string $name,
        string $landline,
        string $contact_number,
        string $ticket_id
    ) {
        $query = "INSERT INTO `client_info`
        SET
            `reference` = :reference
            `name` = :name
            `landline` = :landline
            `contact_number` = :contact_number
            `ticket_id` = :ticket_id";
        $conn = $this->connect();
        $stmt = $conn->prepare($query);
        $stmt->bindValue(":reference", $reference);
        $stmt->bindValue(":name", $name);
        $stmt->bindValue(":landline", $landline);
        $stmt->bindValue(":ticket_id", $ticket_id);
        $stmt->execute();
        return $stmt;
    }

    private function post_service(
        string $reference,
        string $network,
        string $service,
        string $portability,
        string $package,
        string $requested_date,
        string $ticket_id
    ) {
        $query = "INSERT INTO `client_service`
        SET
            `reference` = :reference
            `network` = :network
            `service` = :service
            `portability` = :portability
            `package` = :package
            `requested_date` = :requested_date
            `ticket_id` = :ticket_id";
        $conn = $this->connect();
        $stmt = $conn->prepare($query);
        $stmt->bindValue(":reference", $reference);
        $stmt->bindValue(":network", $network);
        $stmt->bindValue(":service", $service);
        $stmt->bindValue(":portability", $portability);
        $stmt->bindValue(":package", $package);
        $stmt->bindValue(":requested_date", $requested_date);
        $stmt->bindValue(":ticket_id", $ticket_id);
        $stmt->execute();
        return $stmt;
    }

    /*
        create a ticket
    */
    protected function post_ticket(
        string $reference, 
        string $address, 
        int $ticket_id
    ) {
    //    $query = "INSERT INTO ";
        $this->post_address($reference, $address, $ticket_id);
    }

}