import React, {useState} from "react";
import Counter from '../components/counter';
import NavBar from '../components/navbar';
import Login from './login.js'
import { spendingData } from "../data/spendings";
//import useToken from './usetoken.js';
/*
function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}*/
export default function Home() {
  //const token = getToken();

  var sum = 0;
  spendingData.forEach((value) => {
		sum = sum + value;
		sum = Math.round((sum + Number.EPSILON) * 100) / 100;
	});

  const [token, setToken] = useState(false);
  const [moneySpent, setMoneySpent] = useState(sum);
  const [startingMoney, setStartingMoney] = useState(sum);
  const [input, setInput] = useState('');
  const [flag, setFlag] = useState(0);

  if(token==false) {
    return <Login setToken={setToken}/>
  }



  const addMoney = () => {
    if(!Number.isNaN(input) && !Number.isNaN(parseFloat(input))) {
      const currentTotal = moneySpent + parseFloat(input);
      
      if(flag === 0) {
        setStartingMoney(sum);
        setMoneySpent(currentTotal);
      }
      else {
        setStartingMoney(moneySpent);
        setMoneySpent(currentTotal);
      }
      setInput('');
      setFlag(flag + 1);
      // console.log(moneySpent);
    }
  }

  return (
    <div>
      


      <main>
        <NavBar></NavBar>

        <div className="relative bg-white flex justify-center w-screen">
          <div className="flex flex-col justify-start space-y-24 pt-32 z-10">
            <div className="flex flex-col text-center">
              <div className="text-9xl text-indigo-800">
                <Counter key={flag} startingMoney={startingMoney} total={moneySpent}/>
              </div>
              <p className="text-md font-serif">Spent on Bubble Tea So Far</p>
            </div>

            <div className="space-y-2">
              <p className="text-xl md:text-3xl lg:text-4xl text-center">How much did you spend on Bubble Tea today?</p>
              <div className="flex flex-row space-x-6 justify-center">
                <input 
                  className="w-1/2 md:w-3/4 lg:w-full border-2 border-gray-300 rounded-xl text-4xl p-2"
                  type="text"
                  placeholder="I've spent..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => {
                    if(e.key === "Enter") {
                      console.log("enter key");
                      addMoney();
                    }
                  }
                  }
                />
              </div>
            </div>
          </div>
          </div>
        </main>
      </div>
  )
}