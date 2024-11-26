<?php
session_start();

// Database connection
$host = 'localhost';
$dbname = 'inlog';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Fout bij verbinden met database: " . $e->getMessage());
}

// Login logic
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $wachtwoord = $_POST['password'];

    // Query to fetch user from the database
    $stmt = $pdo->prepare("SELECT * FROM accounts WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    $gebruiker = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($gebruiker && password_verify($wachtwoord, $gebruiker['password'])) {
        $_SESSION['email'] = $gebruiker['email']; // Store the email in the session
        echo "Login succesvol!";
    } else {
        echo "Onjuiste email of wachtwoord.";
    }
}
?>
