<?php
session_start();

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['action']) && $_POST['action'] == 'signup') {
        // Validate email domain
        $email = $_POST['email'];
        if (!str_ends_with($email, '@dyci.edu.ph')) {
            $error = "Email must be from @dyci.edu.ph domain";
        } else {
            // Generate verification code
            $verification_code = sprintf('%06d', mt_rand(100000, 999999));
            
            // Store user data in session (in production, use database)
            $_SESSION['pending_user'] = [
                'first_name' => $_POST['first_name'],
                'middle_name' => $_POST['middle_name'],
                'last_name' => $_POST['last_name'],
                'email' => $_POST['email'],
                'role' => $_POST['role'],
                'department' => $_POST['department'],
                'organization' => $_POST['organization'],
                'password' => password_hash($_POST['password'], PASSWORD_DEFAULT),
                'verification_code' => $verification_code
            ];
            
            // In production, send email with verification code
            // mail($email, "Kronos Account Verification", "Your verification code is: " . $verification_code);
            
            $show_modal = true;
        }
    } elseif (isset($_POST['action']) && $_POST['action'] == 'verify') {
        $entered_code = $_POST['verification_code'];
        if (isset($_SESSION['pending_user']) && $entered_code == $_SESSION['pending_user']['verification_code']) {
            // In production, save user to database
            unset($_SESSION['pending_user']);
            header("Location: main.php");
            exit();
        } else {
            $verification_error = "Invalid verification code. Please try again.";
            $show_modal = true;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Kronos Account</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="signup-container">
        <div class="header">
            <div class="logo">
                <div class="logo-icon">
                    <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M3 6L10 13L14 9L21 16"
                                    stroke="#FF6B6B"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10 13L5 18L14 9L19 4"
                                    stroke="#FF6B6B"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                </div>
                <div class="logo-text">KRONOS</div>
            </div>
            <div class="subtitle">GSO Management System</div>
        </div>

        <div class="form-container">
            <h2 class="form-title">Create your Kronos Account</h2>
            
            <?php if (isset($error)): ?>
                <div class="error"><?php echo htmlspecialchars($error); ?></div>
            <?php endif; ?>
            
            <?php if (isset($success)): ?>
                <div class="success"><?php echo htmlspecialchars($success); ?></div>
            <?php endif; ?>

            <form method="POST" id="signupForm">
                <input type="hidden" name="action" value="signup">
                
                <div class="form-group">
                    <label>Name</label>
                    <div class="form-row">
                        <input type="text" name="first_name" placeholder="First" required>
                        <input type="text" name="middle_name" placeholder="Middle">
                        <input type="text" name="last_name" placeholder="Last" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" name="email" id="email" placeholder="username@dyci.edu.ph" required>
                </div>

                <div class="form-group">
                    <label for="role">Role</label>
                    <input type="text" name="role" id="role" placeholder="Enter your role" required>
                </div>

                <div class="form-group">
                    <label>Department & Position</label>
                    <div class="form-row-2">
                        <select name="department" required>
                            <option value="">Select Department</option>
                            <option value="COA">College of Accountancy</option>
                            <option value="CBA">College of Business Administration</option>
                            <option value="CCS">College of Computer Studies</option>
                            <option value="CHS">College of Health Sciences</option>
                            <option value="CAS">College of Arts and Sciences</option>
                            <option value="COED">College of Education</option>
                            <option value="CME">College of Maritime Education</option>
                            <option value="SOP">School of Psychology</option>
                            <option value="SME">School of Mechanical Engineering</option>
                            <option value="CHMT">College of Hospitality Management and Tourism</option>
                        </select>
                        <input type="text" name="organization" placeholder="Organization" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" required>
                </div>

                <div class="form-group">
                    <label for="confirm_password">Confirm Password</label>
                    <input type="password" name="confirm_password" id="confirm_password" required>
                </div>

                <button type="submit" class="submit-btn">Create Account</button>
            </form>
        </div>
    </div>

    <!-- Verification Modal -->
    <div id="verificationModal" class="modal <?php echo isset($show_modal) ? 'show' : ''; ?>">
        <div class="modal-content">
            <h3 class="modal-title">Verify Your Account</h3>
            <p class="modal-text">
                We've sent a 6-digit verification code to your email address. 
                Please enter the code below to complete your registration.
            </p>
            
            <?php if (isset($verification_error)): ?>
                <div class="error"><?php echo htmlspecialchars($verification_error); ?></div>
            <?php endif; ?>
            
            <form method="POST">
                <input type="hidden" name="action" value="verify">
                <input type="text" name="verification_code" class="verification-input" placeholder="000000" maxlength="6" required>
                <button type="submit" class="verify-btn">Verify Account</button>
            </form>
        </div>
    </div>

    <script>
        // Email validation
        document.getElementById('email').addEventListener('blur', function() {
            const email = this.value;
            if (email && !email.endsWith('@dyci.edu.ph')) {
                this.style.borderColor = '#e74c3c';
                if (!document.querySelector('.email-error')) {
                    const error = document.createElement('div');
                    error.className = 'error email-error';
                    error.textContent = 'Email must be from @dyci.edu.ph domain';
                    this.parentNode.appendChild(error);
                }
            } else {
                this.style.borderColor = '#e1e5e9';
                const existingError = document.querySelector('.email-error');
                if (existingError) {
                    existingError.remove();
                }
            }
        });

        // Password confirmation
        document.getElementById('confirm_password').addEventListener('blur', function() {
            const password = document.getElementById('password').value;
            const confirmPassword = this.value;
            
            if (confirmPassword && password !== confirmPassword) {
                this.style.borderColor = '#e74c3c';
                if (!document.querySelector('.password-error')) {
                    const error = document.createElement('div');
                    error.className = 'error password-error';
                    error.textContent = 'Passwords do not match';
                    this.parentNode.appendChild(error);
                }
            } else {
                this.style.borderColor = '#e1e5e9';
                const existingError = document.querySelector('.password-error');
                if (existingError) {
                    existingError.remove();
                }
            }
        });

        // Form validation
        document.getElementById('signupForm').addEventListener('submit', function(e) {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;
            
            if (!email.endsWith('@dyci.edu.ph')) {
                e.preventDefault();
                alert('Email must be from @dyci.edu.ph domain');
                return;
            }
            
            if (password !== confirmPassword) {
                e.preventDefault();
                alert('Passwords do not match');
                return;
            }
            
            if (password.length < 6) {
                e.preventDefault();
                alert('Password must be at least 6 characters long');
                return;
            }
        });

        // Verification code input formatting
        const verificationInput = document.querySelector('.verification-input');
        if (verificationInput) {
            verificationInput.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9]/g, '');
            });
        }
    </script>
</body>
</html>