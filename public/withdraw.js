function Withdraw(){
    const ctx = React.useContext(UserContext); 
    let user = ctx.user;
    console.log(ctx);
    const [update, setUpdate] = React.useState('false');
    const [value, setValue] = React.useState("");
    const [show, setShow] = React.useState(true);
  
    const handleTextChange = (event) => {
      setValue(event.target.value);
    }; 
  
    function handleWithdraw(){
      let balance = document.getElementById("balance").value;
      if (balance > 0 && user.balance >= balance && !isNaN(balance)) {
      user.balance -= Number(balance);
      setUpdate(true);
      setShow(false);
      
      fetch(`/account/update/${user.email}/${-balance}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          setStatus(JSON.stringify(data.amount));
          console.log('JSON:', data);
        } catch(err) {
          props.setStatus('Withdraw failed')
          console.log('err:', text);
        }
      });
    
   
    }
      else{
        alert("Transaction Failed");
      }
    }
  
    function clearForm() {
      setValue("");
      setShow(true);
    }
  
    return (
      <Card
      bgcolor="dark"
      header={<><h1>Withdraw</h1></>}
      body= {show? (user.email ? ( 
        <>
        <h2>Welcome!</h2>
        <h4>Current Balance: $ {update ? + user.balance : + user.balance}</h4>
        <br/>
        <h6> Amount</h6>
        <br/>
        <input type="input" width="200" id="balance" placeholder="Enter an amount" onChange={handleTextChange} value={value}></input><br/>
        <br/>
        <button type="submit" disabled={ value ?false:true} className="btn btn-light" class="btn btn-secondary btn-lg" onClick={handleWithdraw}>Withdraw</button><br/>
        </>
        ) : ("Please Log In")) : (
          <>
          <h5>Success!</h5>
          <br/>
          <button type="submit" className="btn btn-light" class="btn btn-secondary btn-lg" onClick={clearForm}>Make Another Withdrawal</button>
          </>
          )}
      
    />    
    )
  }