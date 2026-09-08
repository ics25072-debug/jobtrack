<?php
require "db.php";
require "demo-session.php";

$sessionId = getDemoSessionId($pdo);

$id = $_POST["id"];
$company = $_POST["company"];
$position = $_POST["position"];
$status = $_POST["status"];
$date = $_POST["date"];

$sql = "UPDATE applications
        SET company = ?, position = ?, status = ?, date = ?
        WHERE id = ? AND session_id = ?";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    $company,
    $position,
    $status,
    $date,
    $id,
    $sessionId
]);

echo "success";