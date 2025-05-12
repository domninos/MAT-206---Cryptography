import { useState } from 'react';
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

  const [shift, setShift] = useState(5);

  // RSA keys
  const [privateKey, setPrivateKey] = useState({ key: 2753, n: 3233 }); // d, n
  const [publicKey, setPublicKey] = useState(17); // e

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