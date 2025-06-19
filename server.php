<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    // Send email or save to database
    // mail("your@email.com", "New Contact Form Submission", $message);
    
    echo "<p>Thank you for your message, $name!</p>";
}
?>