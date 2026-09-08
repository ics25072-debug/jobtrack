<?php
require "db.php";
require "demo-session.php";

$sessionId = getDemoSessionId($pdo);

$company = $_POST["company"];
$position = $_POST["position"];
$status = $_POST["status"];
$date = $_POST["date"];

$sql = "INSERT INTO applications
        (company, position, status, date, session_id)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    $company,
    $position,
    $status,
    $date,
    $sessionId
]);

echo "success";