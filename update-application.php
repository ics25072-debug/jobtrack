<?php
require "db.php";
require "demo-session.php";

$sessionId = getDemoSessionId($pdo);

$id = $_POST["id"];
$status = $_POST["status"];

$sql = "UPDATE applications
        SET status = ?
        WHERE id = ? AND session_id = ?";

$stmt = $pdo->prepare($sql);
$stmt->execute([$status, $id, $sessionId]);

echo "success";