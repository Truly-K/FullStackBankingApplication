
function NavBar(){
    const ctx = React.useContext(UserContext); 
    let user = ctx.user;
    const [show, setShow] = React.useState(true);
    function handleLogout() {
      
        firebase.auth().signOut();
        setShow(false);
        user.email = null;
        user.password = null;
        user.balance = null;
        user.name = null;
        let activeuser = document.getElementById('activeuser');
        activeuser.innerText = "Log In";
  
    }
  
    return(
      <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#" data-toggle="tooltip" data-placement="bottom" title="Click here to return home."><img src="BadBank-01.png" className="img-fluid" alt="Responsive image"/></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
              className="container-fluid"
              style={{ padding: "10px 20px" }}
              body={{ color: "fce2fe" }}
            >
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            
            <li className='nav-item' >
              <a className="nav-link" href="#/CreateAccount/" data-toggle="tooltip" data-placement="bottom" title="Create a new account">Create Account</a>
            </li>
  
            <li className="nav-item">
              <a className="nav-link" href="#/deposit/" data-toggle="tooltip" data-placement="bottom" title="Deposit to your account">Deposit</a>
            </li>
  
            <li className='nav-item'>
              <a className="nav-link" href="#/withdraw/" data-toggle="tooltip" data-placement="bottom" title="Withdraw from your account">Withdraw</a>
            </li>
  
            <li className="nav-item">
              <a className="nav-link" href="#/alldata/"data-toggle="tooltip" data-placement="bottom" title="View users">AllData</a>
            </li>  
  
          </ul>
          </div>
            <a className="nav-link" data-toggle="tooltip" title="user email" href="#/login/" id="activeuser">
               Log In </a>
            <a className="nav-link" data-toggle="tooltip" title="logout" id="logout" href="#/login/" onClick={handleLogout}>{user.email ? "Logout" : "Logout"}</a>
        </div>
        
      </nav>
      </>
    );
  }
  