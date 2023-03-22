import { useEffect, useState } from "react";
import styles from "./App.module.css"
function App() {
  const [loading,setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollar, setDollar] = useState('');
  const [select, setSelect] = useState(0);
  const [option, setOption] = useState();
  const onChange = (event) => {
    setDollar(event.target.value);
  }
  const selectChange = (event) => {
    setSelect(event.target.value);
  }
  useEffect(()=>{
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
    }); 
  },[]);

  return (
    <div >
      <h1 className={styles.title}>The Coins! <span className={styles.loading}>{loading ? "": `(${coins.length})`}</span> </h1>
      {loading ? <strong>Loading...</strong> : 
      <select onChange={selectChange} >
        <option> 원하는 비트코인을 선택해주세요 :)</option>
        {coins.map((coin) => (
        <option value={JSON.stringify(coin.quotes.USD.price)}> 
        {coin.name} ({coin.symbol})
        </option>)
      )}
      </select> 
      }
      {loading ? null : 
      <form>
      <label for="dollar"> 🌎 미국 USD</label> <br></br>
      <input 
      className={styles.dollar}
      onChange={onChange}
      id="dollar"
      type="number" 
      value = {dollar}></input><br></br><hr className={styles.hr1}></hr>
      <span className={styles.same}>=</span>
      <br></br><hr></hr>
        <label for="change"> 📊{ select > 0 ? ` ${select}` : null} </label> <br></br>
      <input 
      className={styles.change}
      placeholder=":)"
      id="change"
      type="text" 
      value = {select*dollar}
      >
        </input>
      </form>}
    </div>
  );
}

export default App;
