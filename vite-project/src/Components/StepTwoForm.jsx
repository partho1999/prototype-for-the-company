import React, { useState } from 'react';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';

function StepTwoForm({ dataFromStepOne, onSubmit }) {
    const [maxX, setMaxX] = useState('');
    const [minX, setMinX] = useState('');
    const [maxY, setMaxY] = useState('');
    const [minY, setMinY] = useState('');
    const [maxZ, setMaxZ] = useState('');
    const [minZ, setMinZ] = useState('');
    const [csvData, setCsvData] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleCsvUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            Papa.parse(file, {
                complete: (result) => {
                    const parsedData = result.data.slice(1); // Skip header row

                    const xs = parsedData.map((row) => parseFloat(row[1]));
                    console.log('xs=>', xs)
                    const ys = parsedData.map((row) => parseFloat(row[2]));
                    console.log('ys=>', ys)
                    const zs = parsedData.map((row) => parseFloat(row[3]));
                    console.log('zs=>',zs)


                    
                    
                    setMaxX(MaxValue(xs));
                    setMinX(MinValue(xs));
                    setMaxY(MaxValue(ys));
                    setMinY(MinValue(ys));
                    setMaxZ(MaxValue(zs));
                    setMinZ(MinValue(zs));
                    console.log('MAXX:', maxX)
                    setCsvData(parsedData);
                },
            });
        } else {
            setCsvData(null);
            setMaxX('');
            setMinX('');
            setMaxY('');
            setMinY('');
            setMaxZ('');
            setMinZ('');
        }
    };


    const MaxValue =(arr)=>{
        let maxValue = -Infinity;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > maxValue) {
                maxValue = arr[i];
            }
        }

        console.log("The maximum value is:", maxValue);
        return maxValue
    }

    const MinValue =(arr)=>{
        let minValue = Infinity;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < minValue) {
                minValue = arr[i];
            }
        }

        console.log("The minimum value is:", minValue);
        return minValue
    }

    const handleSubmit = () => {
      if (!maxX || !minX || !maxY|| !minY || !maxZ || !minZ) {
        setError('All fields are required');
        return;
      }
      onSubmit({
        ...dataFromStepOne,
        maxX,
        minX,
        maxY,
        minY,
        maxZ,
        minZ,
        csvData,
      });
      navigate("/result")
    };

  return (
    <div className='card w-96 glass mx-auto'>
      <h2>Step 2: Min-Max Values</h2>
      {error && <p className='text-red-600'>{error}</p>}
      <div className='form-control'>
        <label htmlFor="projectName" className="label">Project Name:</label>
        <input type="text" className="input input-bordered" id="projectName"  value={dataFromStepOne.projectName}  disabled />
      </div>
      <div className='form-control'>
        <label htmlFor="projectName" className="label">Project Description:</label>
        <input type="text" className="input input-bordered" id="projectName"  value={dataFromStepOne.projectDescription}  disabled />
      </div>
      <div className='form-control'>
        <label htmlFor="projectName" className="label">Client:</label>
        <input type="text" className="input input-bordered" id="projectName"  value={dataFromStepOne.client}  disabled />
      </div>
      <div className='form-control'>
        <label htmlFor="projectName" className="label">Contractor:</label>
        <input type="text" className="input input-bordered" id="projectName"  value={dataFromStepOne.contractor}  disabled />
      </div>
      <div className='form-control'>
        <label htmlFor="csvUpload" className='label'>Upload CSV File:</label>
        <input type="file" id="csvUpload" className="file-input w-full max-w-xs" accept=".csv" onChange={handleCsvUpload} />
      </div>
      <div className='form-control'>
        <label htmlFor="maxX" className="label">Max X:</label>
        <input type="number" className="input input-bordered" id="maxX" value={maxX} onChange={(e) => setMaxX(e.target.value)} />
      </div>
      <div className='form-control'>
        <label htmlFor="minX" className="label">Min X:</label>
        <input type="number" className="input input-bordered" id="minX" value={minX} onChange={(e) => setMinX(e.target.value)} />
      </div>
      <div className='form-control'>
        <label htmlFor="maxY" className="label">Max Y:</label>
        <input type="number" className="input input-bordered" id="maxY" value={maxY} onChange={(e) => setMaxY(e.target.value)} />
      </div>
      <div className='form-control'>
        <label htmlFor="minY" className="label">Min Y:</label>
        <input type="number" className="input input-bordered" id="minY" value={minY} onChange={(e) => setMinY(e.target.value)} />
      </div>
      <div className='form-control'>
        <label htmlFor="maxZ" className="label">Max Z:</label>
        <input type="number" className="input input-bordered" id="maxZ" value={maxZ} onChange={(e) => setMaxZ(e.target.value)} />
      </div>
      <div className='form-control'>
        <label htmlFor="minZ" className="label">Min Z:</label>
        <input type="number" className="input input-bordered" id="minY" value={minZ} onChange={(e) => setMinZ(e.target.value)} />
      </div>
      <button className='btn btn-primary mt-5' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default StepTwoForm;
