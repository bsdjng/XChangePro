<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account aanmaken</title>
</head>
<body>
    <form action="" method="POST">
        <h2>Account aanmaken</h2>
        <label for="new_username">Gebruikersnaam:</label>
        <input type="text" id="new_username" name="new_username" required>
        <label for="new_password">Wachtwoord:</label>
        <input type="password" id="new_password" name="new_password" required>
        <button type="submit" name="register">Aanmaken</button>
    </form>

    <?php
    $host = 'localhost'; 
    $dbname = 'inlog'; 
    $db_user = 'root'; 
    $db_pass = ''; 

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $db_user, $db_pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die("Fout bij verbinden met database: " . $e->getMessage());
    }

    if (isset($_POST['register'])) {
        $new_username = $_POST['new_username'];
        $new_password = $_POST['new_password'];

        // Wachtwoord hashen
        $hashed_password = password_hash($new_password, PASSWORD_BCRYPT);

        // Invoeren in database
        $stmt = $pdo->prepare("INSERT INTO accounts (username, password) VALUES (:username, :password)");
        $stmt->bindParam(':username', $new_username);
        $stmt->bindParam(':password', $hashed_password);

        try {
            $stmt->execute();
            echo "<p style='color: green;'>Account succesvol aangemaakt! Je kunt nu inloggen.</p>";
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) {
                echo "<p style='color: red;'>Deze gebruikersnaam is al in gebruik.</p>";
            } else {
                echo "<p style='color: red;'>Er is een fout opgetreden: " . $e->getMessage() . "</p>";
            }
        }
    }
    ?>
</body>
</html>
