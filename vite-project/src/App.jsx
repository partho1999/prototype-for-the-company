import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StepTwoForm from './Components/StepTwoForm';
import ResultPage from './Components/ResultPage';
import StepOneForm from './Components/StepOneFrom';


function App() {
  const [formData, setFormData] = useState(null);
  console.log(formData);
  
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/step2" element={formData && <StepTwoForm dataFromStepOne={formData} onSubmit={setFormData} />}/>
        
          <Route path="/result" element={formData && <ResultPage formData={formData} />}/>
        
          <Route path="/" element={<StepOneForm onNext={setFormData} />}/>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
