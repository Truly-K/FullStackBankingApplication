function Deposit(){
    const ctx = React.useContext(UserContext); 
    let user = ctx.user;
    console.log(ctx);
    const [update, setUpdate] = React.useState('false');
    const [value, setValue] = React.useState("");
    const [show, setShow] = React.useState(true);
  
    const handleTextChange = (event) => {
      setValue(event.target.value);
    }; 
  
    function handleDeposit(){
      let balance = document.getElementById("balance").value;
      if (balance > 0 && !isNaN(balance)) {
      user.balance += Number(balance);
      setUpdate(true);
      setShow(false);
  
      fetch(`/account/update/${user.email}/${balance}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          setStatus(JSON.stringify(data.amount));
          console.log('JSON:', data);
        } catch(err) {
          props.setStatus('Deposit failed')
          console.log('err:', text);
        }
      });
  
      }
      else{
        alert("Must be a positive number");
      }
    }
  
    function clearForm(){
      setValue('');
      setShow(true);
    }
  
    return (
      <Card
      bgcolor="dark"
      header={<><h1>Deposit</h1></>}
      body= {show? (user.email ? ( 
        <>
        <h2>Welcome!</h2>
        <h4>Current Balance: $ {update ? + user.balance : + user.balance}</h4>
        <br/>
        <h6> Amount</h6>
        <br/>
        <input type="input" width="200" id="balance" placeholder="Enter an amount" onChange={handleTextChange} value={value}></input>
        <br/>
        <br/>
        <button type="submit" className="btn btn-light" class="btn btn-secondary btn-lg" disabled={ value ?false:true} onClick={handleDeposit}>Make Deposit</button>
        </>
        ) : ("Please Log In")) : (
          <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Make another deposit</button>
          </>
            )}
      
    />    
    )
  }
  
  