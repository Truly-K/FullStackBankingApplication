function AllData() {
    const [data, setData] = React.useState("");
    var [result, setResult] = React.useState([]);
  
    React.useEffect(() => {
      fetch("/account/all")
        .then((response) => response.json())
        .then((data) => {
          for(var i in data)result.push(data[i]);
          setResult(result);
          setData(JSON.stringify(data));
        });
    }, []);
  
    return (
      <>
        <h5>All Users:</h5>
        <table className="table" data={data}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
  
          <tbody>
          {result.map((item, index) => 
                  <tr key={index}>
                      <th scope="row">{index+1}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.password}</td>
                      <td>${item.balance}</td>
                  </tr>
              )}
          </tbody>
        </table>
      </>
    );
  }