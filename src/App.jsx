import { useState, useEffect } from 'react';
import CipherSelect from './components/CipherSelect';
import CipherBox from './components/CipherBox';
import CipherDesc from './components/CipherDesc';
import EncrypterBox from './components/EncrypterBox';
import './App.css';
import DecryptedBox from './components/DecryptedBox';

function App() {
  const [sharedCipher, setSharedCipher] = useState('Unselected');
  const [text, setText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const [shift, setShift] = useState(3);

  // RSA keys
  const [privateKey, setPrivateKey] = useState({ key: 2753, n: 3233 }); // d, n
  const [publicKey, setPublicKey] = useState(17); // e

  let logged = false;

  useEffect(() => {
    if (!logged) {
      console.log("RSA KEYS: ");
      console.log(`**Private Key (d): ${privateKey.key}`);
      console.log(`**Public Key (e): ${publicKey}`);
      console.log(`**Modulo (n): ${privateKey.n}`)

      console.log(`Shift Value: ${shift}`);
      logged = true;
    }
  }, []);
  
  return (
    <div className="container">
      <h1>Cryptography App</h1> 

      <CipherSelect 
        sharedCipher={sharedCipher} 
        setCipher={setSharedCipher} 
        setEncryptedText={setEncryptedText} 
        setDecryptedText={setDecryptedText}
      />

      <CipherDesc cipher={sharedCipher} />
      <CipherBox text={text} setText={setText} />

      <EncrypterBox 
        text={text} 
        encryptedText={encryptedText} 
        setEncryptedText={setEncryptedText} 
        sharedCipher={sharedCipher}
        publicKey={publicKey}
        modulo={privateKey.n}
        shift={shift}
      />

      <DecryptedBox 
        text={text} 
        encryptedText={encryptedText} 
        decryptedText={decryptedText} 
        setDecryptedText={setDecryptedText} 
        sharedCipher={sharedCipher} 
        shift={shift} 
        privateKey={privateKey}
      />

      
    </div>
  );
}

export default App;