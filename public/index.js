function Spa(props, state) {
    return (
      <HashRouter>
        <UserContext.Provider value={{ user: {email: ''}}}>
          <NavBar />
          <br/>
          <h1>Welcome to BadBank!</h1>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit}/>
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/alldata/" component={AllData} />
  
          </div>
        </UserContext.Provider>
      </HashRouter>
    );
  }
  
  ReactDOM.render(
    <Spa/>,
    document.getElementById('root')
  );
  