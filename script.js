document.addEventListener('DOMContentLoaded', function() {
            const passwordDisplay = document.getElementById('passwordDisplay');
            const lengthSlider = document.getElementById('passwordLength');
            const lengthValue = document.getElementById('lengthValue');
            const uppercaseCheckbox = document.getElementById('uppercase');
            const lowercaseCheckbox = document.getElementById('lowercase');
            const numbersCheckbox = document.getElementById('numbers');
            const symbolsCheckbox = document.getElementById('symbols');
            const generateBtn = document.getElementById('generateBtn');
            const copyBtn = document.getElementById('copyBtn');
            const strengthText = document.getElementById('strengthText');
            const strengthFill = document.getElementById('strengthFill');
            const notification = document.getElementById('notification');
            
            // Character sets
            const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const lowercase = 'abcdefghijklmnopqrstuvwxyz';
            const numbers = '0123456789';
            const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
            
            // Update length value display
            lengthSlider.addEventListener('input', function() {
                lengthValue.textContent = this.value;
            });
            
            // Generate password function
            function generatePassword() {
                let charset = '';
                let password = '';
                
                // Build character set based on options
                if (uppercaseCheckbox.checked) charset += uppercase;
                if (lowercaseCheckbox.checked) charset += lowercase;
                if (numbersCheckbox.checked) charset += numbers;
                if (symbolsCheckbox.checked) charset += symbols;
                
                // Check if at least one character set is selected
                if (charset.length === 0) {
                    alert('Please select at least one character type!');
                    return '';
                }
                
                const length = parseInt(lengthSlider.value);
                
                // Generate password
                for (let i = 0; i < length; i++) {
                    const randomIndex = Math.floor(Math.random() * charset.length);
                    password += charset[randomIndex];
                }
                
                return password;
            }
            
            // Check password strength
            function checkPasswordStrength(password) {
                let strength = 0;
                
                // Length factor
                if (password.length >= 8) strength += 25;
                if (password.length >= 12) strength += 15;
                if (password.length >= 16) strength += 10;
                
                // Character diversity
                if (/[A-Z]/.test(password)) strength += 10;
                if (/[a-z]/.test(password)) strength += 10;
                if (/[0-9]/.test(password)) strength += 10;
                if (/[^A-Za-z0-9]/.test(password)) strength += 15;
                
                // Normalize to 100%
                strength = Math.min(strength, 100);
                
                // Update UI
                strengthFill.style.width = strength + '%';
                
                if (strength < 40) {
                    strengthText.textContent = 'Weak';
                    strengthFill.style.background = '#e74c3c';
                } else if (strength < 70) {
                    strengthText.textContent = 'Medium';
                    strengthFill.style.background = '#f39c12';
                } else if (strength < 90) {
                    strengthText.textContent = 'Strong';
                    strengthFill.style.background = '#3498db';
                } else {
                    strengthText.textContent = 'Very Strong';
                    strengthFill.style.background = '#2ecc71';
                }
            }
            
            // Generate and display password
            generateBtn.addEventListener('click', function() {
                const password = generatePassword();
                if (password) {
                    passwordDisplay.textContent = password;
                    checkPasswordStrength(password);
                }
            });

                        // Copy to clipboard
            copyBtn.addEventListener('click', function() {
                if (passwordDisplay.textContent === 'Your password will appear here') {
                    alert('Please generate a password first!');
                    return;
                }
                
                navigator.clipboard.writeText(passwordDisplay.textContent)
                    .then(() => {
                        // Show notification
                        notification.classList.add('show');
                        setTimeout(() => {
                            notification.classList.remove('show');
                        }, 2000);
                    })
                    .catch(err => {
                        alert('Failed to copy: ' + err);
                    });
            });
            
            // Generate initial password on page load
            generateBtn.click();
        });
            

