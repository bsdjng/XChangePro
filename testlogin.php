<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inloggen</title>
</head>
<body>
    <form action="" method="POST">
        <h2>Inloggen</h2>
        <label for="username">Gebruikersnaam:</label>
        <input type="text" id="username" name="username" required>
        <label for="password">Wachtwoord:</label>
        <input type="password" id="password" name="password" required>
        <button type="submit" name="login">Inloggen</button>
    </form>

    <?php
    session_start();

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

    if (isset($_POST['login'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];

        // Query om gebruiker op te halen
        $stmt = $pdo->prepare("SELECT * FROM accounts WHERE username = :username");
        $stmt->bindParam(':username', $username);
        $stmt->execute();

        $gebruiker = $stmt->fetch(PDO::FETCH_ASSOC);

        // Controleer wachtwoord met hashing
        if ($gebruiker && password_verify($password, $gebruiker['password'])) {
            $_SESSION['username'] = $gebruiker['username'];
            echo "<p style='color: green;'>Login succesvol! Welkom, " . htmlspecialchars($gebruiker['username']) . "</p>";
        } else {
            echo "<p style='color: red;'>Onjuiste gebruikersnaam of wachtwoord.</p>";
        }
    }
    ?>
</body>
</html>
