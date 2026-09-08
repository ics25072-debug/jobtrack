<?php
require_once "db.php";

const DEMO_COOKIE = "jobtrack_demo";
const DEMO_LIFETIME = 7 * 24 * 60 * 60;

function getDemoSessionId(PDO $pdo): int
{
    $token = $_COOKIE[DEMO_COOKIE] ?? "";

    if ($token !== "" && preg_match('/^[a-f0-9]{64}$/', $token)) {
        $hash = hash("sha256", $token);

        $stmt = $pdo->prepare(
            "SELECT id FROM demo_sessions
             WHERE token_hash = ?
             AND expires_at > NOW()"
        );
        $stmt->execute([$hash]);
        $session = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($session) {
            $stmt = $pdo->prepare(
                "UPDATE demo_sessions
                 SET last_active = NOW(),
                     expires_at = DATE_ADD(NOW(), INTERVAL 7 DAY)
                 WHERE id = ?"
            );
            $stmt->execute([$session["id"]]);

            return (int) $session["id"];
        }
    }

    $token = bin2hex(random_bytes(32));
    $hash = hash("sha256", $token);

    $stmt = $pdo->prepare(
        "INSERT INTO demo_sessions (token_hash, expires_at)
         VALUES (?, DATE_ADD(NOW(), INTERVAL 7 DAY))"
    );
    $stmt->execute([$hash]);

    $sessionId = (int) $pdo->lastInsertId();

    setcookie(DEMO_COOKIE, $token, [
        "expires" => time() + DEMO_LIFETIME,
        "path" => "/jobtrack/",
        "secure" => !empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off",
        "httponly" => true,
        "samesite" => "Lax"
    ]);

    return $sessionId;
}