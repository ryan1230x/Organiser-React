<?php
header("Access-Allow-Control-Origin: *");
header("Content-Type: application/json");
include_once "../ticket/view.php";
include_once "../config/Database.php";

$ticket_id = $_GET["ticket_id"];

if($_SERVER["REQUEST_METHOD"] === "GET") {}
