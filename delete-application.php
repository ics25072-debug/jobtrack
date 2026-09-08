<?php
require "db.php";
require "demo-session.php";

$sessionId = getDemoSessionId($pdo);

$id = $_POST["id"];

$sql = "DELETE FROM applications
        WHERE id = ? AND session_id = ?";

$stmt = $pdo->prepare($sql);
$stmt->execute([$id, $sessionId]);

echo "success";