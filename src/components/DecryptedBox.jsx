import { useEffect } from "react";

function DecryptedBox({ text, encryptedText, decryptedText, setDecryptedText, sharedCipher, shift, privateKey }) {
    useEffect(() => {
        if (sharedCipher === "Shift Cipher") {
            if (!isNaN(shift)) {
                setDecryptedText(decryptShiftCipher(encryptedText, shift));
            }
        } else if (sharedCipher === "RSA") {
            const { key, n } = privateKey;

            if (key && n) {
                setDecryptedText(decryptRSA(encryptedText, key, n));
            }
        }
    }, [sharedCipher, shift, privateKey, encryptedText]);

    return (
        <>
            <label htmlFor="decrypted" style={{ marginRight: '15px' }}>
                DECRYPTED USING: {sharedCipher}
            </label>

            <div className="output-box" id="decrypted">
                <div className="cipherBox">
                    {decryptedText}
                </div>
            </div>
        </>
    );
}

function decryptRSA(text, privateKey, modulo) {
    if (!text) return "";

    const decrypted = text
        .split('-') // Split encrypted values by hyphens
        .map(char => {
            const decryptedCharCode = BigInt(char) ** BigInt(privateKey) % BigInt(modulo); // Use BigInt for large numbers
            return String.fromCharCode(Number(decryptedCharCode)); // Convert back to characters
        })
        .join(''); // Join decrypted characters into a string

    return decrypted;
}

function decryptShiftCipher(text, shift) {
    return text
        .split("")
        .map((char) => {
            const charCode = char.charCodeAt(0);

            if (char.match(/[a-z]/i)) {
                // Handle alphabetic characters
                const base = charCode >= 65 && charCode <= 90 ? 65 : 97; // Uppercase or lowercase
                return String.fromCharCode(((charCode - base - shift + 26) % 26) + base);
            } else if (char.match(/[0-9]/)) {
                // Handle numeric characters
                const base = 48; // ASCII code for '0'
                return String.fromCharCode(((charCode - base - shift + 10) % 10) + base);
            }
            // Handle all other characters (special characters, spaces, etc.)
            return String.fromCharCode((charCode - shift + 256) % 256); // Reverse the shift within the full ASCII range
        })
        .join("");
}

export default DecryptedBox;