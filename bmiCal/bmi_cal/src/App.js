import React, { useState } from 'react';
import './index.css';

function App() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");
  const [imgSrc, setImgSrc] = useState(null);

  const calBmi = (e) => {
    e.preventDefault();

    if (weight === 0 || height === 0) {
      alert("Please enter a valid weight and height");
    } else {
      let bmi = (weight / (height * height)) * 703;
      setBmi(bmi.toFixed(1));

      if (bmi < 18.5) {
        setMessage('You are underweight');
        setImgSrc(require('../src/assets/underweight.png'));
      } else if (bmi >= 18.5 && bmi < 25) {
        setMessage('You are a healthy weight');
        setImgSrc(require('../src/assets/healthy.png'));
      } else {
        setMessage('You are overweight');
        setImgSrc(require('../src/assets/overweight.png'));
      }
    }
  };

  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input value={weight} onChange={(e) => setWeight(Number(e.target.value))}></input>
          </div>
          <div>
            <label>Height (in)</label>
            <input value={height} onChange={(e) => setHeight(Number(e.target.value))}></input>
          </div>
          <div>
            <button className='btn' type='submit'>
              Submit
            </button>
            <button className='btn btn-outline' type='button' onClick={reload}>
              Reload
            </button>
          </div>
        </form>
        <div className='center'>
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
        <div className='img-container'>
          {imgSrc && <img src={imgSrc} alt='Status'></img>}
        </div>
      </div>
    </div>
  );
}

export default App;
