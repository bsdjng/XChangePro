<?php
// Database credentials
$host = 'localhost';
$dbname = 'basicthv_inlog';
$username = 'basicthv_basicthv';
$password = 'bI.C?!8&v!CG';

try {
    // Connect to the database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Hash the password for security
    $hashedPassword = password_hash($$_POST['password'], PASSWORD_DEFAULT);

    // Insert the test account
    $sql = "INSERT INTO accounts (email, password) VALUES (:email, :password)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':email' => $_POST['email'],
        ':password' => $hashedPassword,
    ]);

    echo "<h1>Test account successfully inserted!</h1>";

    // Fetch and display all accounts
    $query = "SELECT id, email, password FROM accounts";
    $result = $pdo->query($query);

    echo "<h2>All Accounts:</h2>";
    echo "<table border='1'>";
    echo "<tr><th>ID</th><th>Email</th><th>Password (Hashed)</th></tr>";
    foreach ($result as $row) {
        echo "<tr>";
        echo "<td>" . htmlspecialchars($row['id']) . "</td>";
        echo "<td>" . htmlspecialchars($row['email']) . "</td>";
        echo "<td>" . htmlspecialchars($row['password']) . "</td>";
        echo "</tr>";
    }
    echo "</table>";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>