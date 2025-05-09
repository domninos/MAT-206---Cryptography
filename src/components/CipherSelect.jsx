
function CipherSelect({ sharedCipher, setCipher, setEncryptedText, setDecryptedText }) {
  return (
    <>
      <h3>Select Ciphers</h3>

      <div className='cipherSelect'>
        <label htmlFor="cipher-select" style={{ marginRight: '15px' }}>Choose cryptography:</label>
        <select 
          id="cipher-select" 
          onChange={(e) => {
            setCipher(e.target.value);

            setEncryptedText(''); // Reset encrypted text when cipher changes
            setDecryptedText(''); // Reset decrypted text when cipher changes
          }}
        >
          <option value="Unselected">--Select--</option>
          <option value="RSA">RSA</option>
          <option value="Shift Cipher">Shift Cipher</option>
        </select>
      </div>

    </>
  );
}

export default CipherSelect;