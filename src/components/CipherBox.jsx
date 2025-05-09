
function CipherBox({text, setText}) {
    return (
      <>
          <form onSubmit={(e) => {e.preventDefault();}}>
            <label htmlFor="message" style={{ marginRight: '15px' }}>Enter your message:</label>
            <input 
              type="text" 
              id="message" 
              className="messageBox"
              value={text || ""} 
              onChange={(e) => setText(e.target.value)} 
              placeholder="Type your message here"
            />

          </form>  
      </>
    );
  }
  
  export default CipherBox;