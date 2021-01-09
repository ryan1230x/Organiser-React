<?php
class Database {
  private const host = "127.0.0.1";
  private const username = "organise";
  private const password = "password";
  private const db_name = "organiser";
  private const dsn = "mysql:host=" . self::host . ";dbname=" . self::db_name;
  private $conn;

  protected function connect() {
    $this->conn = null;
    try {
      $conn = new PDO(self::dsn, self::username, self::password);
    } catch (PDOException $e) {
      echo "Error: database connection error->" . $e->getMessage();
    }
    return $conn;
  }
}