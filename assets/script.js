// Function to generate a random password
function generatePassword() {
  const specialCharacters = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '[', ']', '{', '}', ';', ':', '/', '<', '>', '?'];
  const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseCharacters = lowercaseCharacters.toUpperCase();

  let passwordLength;
  do {
    passwordLength = parseInt(prompt("Enter the password length (between 8 and 128 characters):"), 10);
  } while (isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128);

  const includeLowercase = confirm("Include lowercase characters in the password?");
  const includeUppercase = confirm("Include uppercase characters in the password?");
  const includeNumeric = confirm("Include numeric characters in the password?");
  const includeSpecialChars = confirm("Include special characters in the password?");

  let availableCharacters = '';
  let guaranteedCharacters = '';

  if (includeLowercase) {
    availableCharacters += lowercaseCharacters;
    guaranteedCharacters += getRandomCharacter(lowercaseCharacters);
  }

  if (includeUppercase) {
    availableCharacters += uppercaseCharacters;
    guaranteedCharacters += getRandomCharacter(uppercaseCharacters);
  }

  if (includeNumeric) {
    availableCharacters += numericCharacters.join('');
    guaranteedCharacters += getRandomCharacter(numericCharacters);
  }

  if (includeSpecialChars) {
    availableCharacters += specialCharacters.join('');
    guaranteedCharacters += getRandomCharacter(specialCharacters);
  }

  let remainingPasswordLength = passwordLength - guaranteedCharacters.length;
  let generatedPassword = guaranteedCharacters;

  for (let i = 0; i < remainingPasswordLength; i++) {
    generatedPassword += getRandomCharacter(availableCharacters);
  }

  return shuffleString(generatedPassword);
}

// Function to select a random character from a given string
function getRandomCharacter(characters) {
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
}

// Function to shuffle a string
function shuffleString(input) {
  const stringArray = input.split("");
  for (let i = stringArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [stringArray[i], stringArray[randomIndex]] = [stringArray[randomIndex], stringArray[i]];
  }
  return stringArray.join("");
}

// Assignment Code
const generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
