<?php
require "db.php";
require "demo-session.php";

$sessionId = getDemoSessionId($pdo);

$sql = "SELECT * 
        FROM applications 
        WHERE session_id = ?
        ORDER BY id DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute([$sessionId]);

$applications = $stmt->fetchAll(PDO::FETCH_ASSOC);

header("Content-Type: application/json");
echo json_encode($applications);