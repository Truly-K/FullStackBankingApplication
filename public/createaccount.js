function CreateAccount() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState("");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [button, setButton] = React.useState(false);
    const ctx = React.useContext(UserContext);
  
    function validate(field, label = "") {
      if (!field) {
        setStatus("Error: " + label);
        setTimeout(() => setStatus(""), 3000);
        return false;
      }
      return true;
    }
  
    function handleCreate() {
      if (!validate(name, "name")) {
        alert("Please enter a name");
  
        return;
      }
      if (!validate(email, "email")) {
        alert("Please enter a valid email");
  
        return;
      }
      if (!validate(password, "password")) {
        alert("Please enter a password");
  
        return;
      }
      if (password.length < 8) {
        alert("Password must be 8 characters long");
  
        return;
      }
  
         
      const auth  = firebase.auth();
          const promise = auth.createUserWithEmailAndPassword(email,password);
          promise.catch(e => {
              e.message ? setShow(true): setShow(false)
              setStatus(e.message)
              console.log(e.message)});
  
         const url = `/account/create/${name}/${email}/${password}`;
         
         (async () => {
              var res = await fetch(url, {method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors' });
              var data = await res.json();
              console.log(data);
              ctx.user.email = email;
              ctx.user.balance = 0;
          let activeuser = document.getElementById('activeuser');
              activeuser.innerText = ctx.user.email;
         })();
         
         setShow(false);
         setStatus('');
      }
  
    function clearForm() {
      setName("");
      setEmail("");
      setPassword("");
      setShow(true);
      setButton(false);
    }
  
    return (
      <Card
        bgcolor="dark"
        header={<><h1>Create Account</h1></>}
        status={status}
        body={show ? (  
                <>
                Name<br/>
                <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
                Email address<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                Password<br/>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                <button type="submit" disabled={ (name && email && password) ?false:true} className="btn btn-light" onClick={handleCreate}>Create Account</button>
                </>
              ):(
                <>
                <h5>Success</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
                </>
              )}
      />
    )
  }
  