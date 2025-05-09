import { useEffect } from 'react';

function EncrypterBox({ text, encryptedText, setEncryptedText, sharedCipher, publicKey, modulo, shift }) {
    useEffect(() => {
        if (sharedCipher === "RSA") {
            setEncryptedText(handleRSA(text, publicKey, modulo));
        } else if (sharedCipher === "Shift Cipher") {
            setEncryptedText(handleShiftCipher(text, shift));
        }
    }, [text, sharedCipher, setEncryptedText]);

    return (
        <>
            <label htmlFor="encrypted" style={{ marginRight: '15px' }}>
                ENCRYPTED USING: {sharedCipher === "Unselected" ? "NONE" : sharedCipher}
            </label>

            <div className="messageBox" id="encrypted">
                {encryptedText}
            </div>
        </>
    );
}

function handleRSA(text, publicKey, modulo) {
    if (!text) return "";

    const encrypted = text
        .split('') // Encrypt character by character
        .map(char => {
            const charCode = char.charCodeAt(0);
            return BigInt(charCode) ** BigInt(publicKey) % BigInt(modulo); // Use BigInt for large numbers
        })
        .join('-'); // Join encrypted values with hyphens

    return encrypted;
}

function handleShiftCipher(text, shift) {
    if (!text) text = "";

    return text
        .split("")
        .map((char) => {
            const charCode = char.charCodeAt(0);

            if (char.match(/[a-z]/i)) {
                // Handle alphabetic characters
                const base = charCode >= 65 && charCode <= 90 ? 65 : 97; // Uppercase or lowercase
                return String.fromCharCode(((charCode - base + shift) % 26) + base);
            } else if (char.match(/[0-9]/)) {
                // Handle numeric characters
                const base = 48; // ASCII code for '0'
                return String.fromCharCode(((charCode - base + shift) % 10) + base);
            }
            // Handle all other characters (special characters, spaces, etc.)
            return String.fromCharCode((charCode + shift) % 256); // Shift within the full ASCII range
        })
        .join(""); 
}

export default EncrypterBox;