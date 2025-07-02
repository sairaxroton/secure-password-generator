
// JavaScript Logic
document.addEventListener('DOMContentLoaded', () => {
    const passwordLengthInput = document.getElementById('passwordLength');
    const includeUppercaseCheckbox = document.getElementById('includeUppercase');
    const includeLowercaseCheckbox = document.getElementById('includeLowercase');
    const includeNumbersCheckbox = document.getElementById('includeNumbers');
    const includeSymbolsCheckbox = document.getElementById('includeSymbols');
    const generateBtn = document.getElementById('generateBtn');
    const passwordDisplay = document.getElementById('passwordDisplay');
    const copyBtn = document.getElementById('copyBtn');
    const messageBox = document.getElementById('messageBox');

    // Character sets
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    /**
     * Generates a random password based on selected criteria.
     * @returns {string} The generated password.
     */
    function generatePassword() {
        const length = parseInt(passwordLengthInput.value);
        let characters = '';
        let password = '';

        // Build the character set based on selected options
        if (includeUppercaseCheckbox.checked) {
            characters += uppercaseChars;
        }
        if (includeLowercaseCheckbox.checked) {
            characters += lowercaseChars;
        }
        if (includeNumbersCheckbox.checked) {
            characters += numberChars;
        }
        if (includeSymbolsCheckbox.checked) {
            characters += symbolChars;
        }

        // Ensure at least one character type is selected
        if (characters.length === 0) {
            passwordDisplay.textContent = 'Please select at least one character type.';
            passwordDisplay.style.color = '#dc2626'; // Red text for error
            return '';
        } else {
            passwordDisplay.style.color = '#2d3748'; // Reset color
        }

        // Generate password
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }

        return password;
    }

    /**
     * Displays a temporary message box.
     * @param {string} message The message to display.
     */
    function showMessageBox(message) {
        messageBox.textContent = message;
        messageBox.classList.add('show');
        setTimeout(() => {
            messageBox.classList.remove('show');
        }, 2000); // Message disappears after 2 seconds
    }

    // Event listener for Generate Button
    generateBtn.addEventListener('click', () => {
        const password = generatePassword();
        if (password) {
            passwordDisplay.textContent = password;
        }
    });

    // Event listener for Copy Button
    copyBtn.addEventListener('click', () => {
        const password = passwordDisplay.textContent;
        if (password && password !== 'Your secure password will appear here.' && password !== 'Please select at least one character type.') {
            // Use document.execCommand('copy') for clipboard operations in iframes
            const textArea = document.createElement('textarea');
            textArea.value = password;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showMessageBox('Password copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy password: ', err);
                showMessageBox('Failed to copy password.');
            }
            document.body.removeChild(textArea);
        } else {
            showMessageBox('No password to copy!');
        }
    });

    // Initial password generation on load
    passwordDisplay.textContent = generatePassword();
});