<?php
include_once "../config/Database.php";
class TicketModel extends Database {

    /*
        get all tickets
    */
    protected function get_tickets() {
        $query = "SELECT * FROM client_address
        JOIN client_info USING(ticket_id)
        JOIN client_service USING(ticket_id)
        JOIN tickets USING(ticket_id)
        JOIN status USING(ticket_id)";
        $conn = $this->connect();
        $stmt = $conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    /*
        Get a ticket with a unique ticket-id
    */
    protected function get_single_ticket(string $ticket_id) {
        $query = "SELECT * FROM client_address
        JOIN client_info USING(ticket_id)
        JOIN client_service USING(ticket_id)
        JOIN tickets USING(ticket_id)
        JOIN status USING(ticket_id)
        WHERE ticket_id = ?";
        $conn = $this->connect();
        $stmt = $conn->prepare($query);
        $stmt->execute([$ticket_id]);
        return $stmt;
    }

    /* -------------Helper functions for creating a ticket ---------------*/
    private function set_post_address(
        string $reference, 
        string $address,
        string $ticket_id
    ) {
        $query = "INSERT INTO client_address(reference, address, ticket_id)
        VALUES(?, ?, ?)";
        $conn = $this->connect();
        $stmt = $conn->prepare($query);
        $stmt->execute([$reference, $address, $ticket_id]);
        return $stmt;
    }

    private function set_post_info(
        string $reference,
        string $name,
        string $landline,
        string $contact_number,
        string $ticket_id
    ) {
        $query = "INSERT INTO client_info(reference, name, landline, contact_number, ticket_id)
        VALUES(?, ?, ?, ?, ?)";
        $conn = $this->connect();
        $stmt = $conn->prepare($query);
        $stmt->execute([$reference, $name, $landline, $contact_number, $ticket_id]);
        return $stmt;
    }

    private function set_post_service(
        string $reference,
        string $network,
        string $service,
        string $portability,
        string $package,
        string $requested_date,
        string $ticket_id
    ) {
        $query = "INSERT INTO 
        client_service(reference, network, service, portability, package, requested_date, ticket_id) 
        VALUES(?, ?, ?, ?, ?, ?, ?)";
        $conn = $this->connect();
        $stmt = $conn->prepare($query);
        $stmt->execute([
            $reference, $network, $service, $portability, $package, $requested_date, $ticket_id
        ]);
        return $stmt;
    }

    private function set_post_status(
        string $reference,
        string $status,
        string $ticket_id
    ) {
        $query = "INSERT INTO status(reference, status, ticket_id) 
        VALUES(?, ?, ?)";
        $conn = $this->connect();
        $stmt = $conn->prepare($query);
        $stmt->execute([$reference, $status, $ticket_id]);
        return $stmt;
    }

    private function set_post_ticket(
        string $created_by,
        string $ticket_id
    ) {
        $query = "INSERT INTO tickets(created_by, ticket_id) 
        VALUES(?, ?)";
        $conn = $this->connect();
        $stmt = $conn->prepare($query);
        $stmt->execute([$created_by, $ticket_id]);
        return $stmt;
    }
    /* ----------End of helper functions---------------- */

    /* 
        create a ticket
    */
    protected function post_ticket(
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
        // init Datbase connection
        $conn = $this->connect();
        try {
            /**
             * open a transaction and
             * run these functions
             */
            $conn->beginTransaction();
            $this->set_post_ticket($created_by, $ticket_id);
            $this->set_post_address($reference, $address, $ticket_id);
            $this->set_post_info($reference, $name, $landline, $contact_number, $ticket_id);
            $this->set_post_service(
                $reference, $network, $service, $portability, $package, $requested_date, $ticket_id
            );
            $this->set_post_status($reference, $status, $ticket_id);
            return $conn->commit();
        } catch(PDOException $e) {
            /**
             * if these is an error rollback so that nothing
             * is inserted into the database
             */
            $conn->rollBack();
        }
    }

    /*-------- helper functions for updating a ticket -----------*/
    private function set_put_address(
        string $address,
        string $ticket_id
    ) {
        $query = "UPDATE client_address 
        SET address = ? WHERE ticket_id = ?";
        $conn = $this->connect();
        $stmt = $conn->prepare($query);
        $stmt->execute([$address, $ticket_id]);
        return $stmt;
    }

    private function set_put_info(
        string $name,
        string $landline,
        string $contact_number,
        string $ticket_id
    ) {
        $query = "UPDATE client_info
        SET 
            name = :name
            landline = :landline
            contact_number = :contact_number
        WHERE 
            ticket_id = :ticket_id";
        $conn = $this->connect();
        $stmt = $conn->prepare($query);
        $stmt->bindValue(":name", $name);
        $stmt->bindValue(":landline", $landline);
        $stmt->bindValue(":contact_number", $contact_number);
        $stmt->bindValue(":ticket_id", $ticket_id);
        $stmt->execute();
        return $stmt;
    }

    private function set_put_service(
        string $network,
        string $service,
        string $portability,
        string $package,
        string $requested_date,
        string $ticket_id
    ) {
        $query = "UPDATE client_service
        SET
            network = :network
            service = :service
            portability = :portability
            package = :package
            requested_date = :requested_date
        WHERE 
            ticket_id = :ticket_id";
        $conn = $this->connect();
        $stmt = $conn->prepare($query);
        $stmt->bindValue(":network", $network);
        $stmt->bindValue(":service", $service);
        $stmt->bindValue(":portability", $portability);
        $stmt->bindValue(":package", $package);
        $stmt->bindValue(":requested_date", $requested_date);
        $stmt->bindValue(":ticket_id", $ticket_id);
        $stmt->execute();
        return $stmt;
    }

    private function set_put_status(
        string $status,
        string $ticket_id
    ) {
        $query = "UPDATE status 
        SET 
            status = :status
        WHERE 
            ticket_id = :ticket_id";
        $conn = $this->connect();
        $stmt = $conn->prepare($query);
        $stmt->bindValue(":status", $status);
        $stmt->bindValue(":ticket_id", $ticket_id);
        $stmt->execute();
        return $stmt;
    }
    /*--------- end of helper functions ------------------------*/
    /**
     *  Updated a ticket
     */
    protected function put_ticket(
        string $address,
        string $ticket_id
    ) {
        // Init database connection
        $conn = $this->connect();
        try {
            /**
             * open a transaction and
             * run these functions
             */
            $conn->beginTransaction();
            $this->set_put_address($address, $ticket_id);
            return true;
        } catch (PDOException $e) {
            /**
             * if these is an error rollback so that nothing
             * is inserted into the database
             */
            $conn->rollBack();
            return false;
        }
    }
}
