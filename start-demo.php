<?php
require "db.php";
require "demo-session.php";

getDemoSessionId($pdo);

header("Location: index.html");
exit;