<?php
session_start();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kronos - Main Dashboard</title>
    <link rel="stylesheet" href="main-styles.css">
</head>
<body>
    <div class="main-container">
        <div class="header">
            <div class="logo">
                <div class="logo-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4facfe"/>
                        <path d="M2 17L12 22L22 17" stroke="#4facfe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="#4facfe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="logo-text">KRONOS</div>
            </div>
            <div class="subtitle">GSO Management System</div>
        </div>

        <div class="welcome-container">
            <div class="welcome-content">
                <h1 class="welcome-title">Welcome to KRONOS</h1>
                <p class="welcome-message">Your account has been successfully created and verified.</p>
                <div class="success-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#27ae60"/>
                        <path d="M9 12L11 14L15 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <p class="info-text">You can now access all the features of the Kronos GSO Management System.</p>
                
                <div class="action-buttons">
                    <button class="primary-btn" onclick="alert('Dashboard functionality coming soon!')">
                        Go to Dashboard
                    </button>
                    <button class="secondary-btn" onclick="window.location.href='signup.php'">
                        Back to Sign Up
                    </button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>