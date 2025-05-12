function CipherDesc({cipher}) {
    return (
        <div>
            <h3>Selected Cipher: {cipher}</h3>

            <p>
                {cipher === 'RSA' && (
                <span>
                    RSA (Rivest-Shamir-Adleman) is a public-key cryptosystem that is widely used for secure data transmission. It relies on the mathematical properties of large prime numbers and modular arithmetic. RSA is commonly used for secure data transmission, digital signatures, and key exchange.
                </span>
                )}
                {cipher === 'Shift Cipher' && (
                <span>
                    The Shift Cipher, also known as the Caesar Cipher, is a simple encryption technique where each letter in the plaintext is shifted a certain number of places down or up the alphabet. For example, with a shift of 1, A would be replaced by B, B would become C, and so on. It is a type of substitution cipher.
                </span>
                )}
            </p>
        </div>
    );
  }

  export default CipherDesc;