import { useEffect } from "react";

function DecryptedBox({ text, encryptedText, decryptedText, setDecryptedText, sharedCipher, shift, privateKey }) {
    useEffect(() => {
        if (sharedCipher === "Shift Cipher") {
            if (!isNaN(shift)) {
                const decrypted = decryptShiftCipher(encryptedText, shift);
                setDecryptedText(decrypted);
            }
        } else if (sharedCipher === "RSA") {
            const { key, n } = privateKey;

            if (key && n) {
                const decrypted = decryptRSA(encryptedText, key, n);
                setDecryptedText(decrypted);
            }
        }
    }, [sharedCipher, shift, privateKey, encryptedText]);

    return (
        <>
            <label htmlFor="decrypted" style={{ marginRight: '15px' }}>
                DECRYPTED USING: {sharedCipher}
            </label>

            <div className="output-box" id="decrypted">
                {decryptedText}
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
    if (!text) return "";

    return text
        .split("")
        .map((char) => {
            const charCode = char.charCodeAt(0);

            if (char.match(/[a-z]/i)) {
                // Handle alphabetic characters
                const decryptedChar = String.fromCharCode(((charCode - base - shift + 26) % 26) + base);
                console.log(`a Char: ${char}, DecryptedChar: ${decryptedChar}`);
                return decryptedChar;
            } else if (char.match(/[0-9]/)) {
                // Handle numeric characters
                const base = 48; // ASCII code for '0'
                const decryptedChar = String.fromCharCode(((charCode - base - shift + 10) % 10) + base);
                console.log(`b Char: ${char}, DecryptedChar: ${decryptedChar}`);
                return decryptedChar;
            } else {
                // Handle all other characters (special characters, spaces, etc.)
                const decryptedChar = String.fromCharCode((charCode - shift + 256) % 256);
                console.log(`Char: ${char}, CharCode: ${charCode} DecryptedChar: ${decryptedChar}`);
                return decryptedChar;
            }
        })
        .join("");
}

export default DecryptedBox;