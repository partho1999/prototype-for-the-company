import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StepOneForm({ onNext }) {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [client, setClient] = useState('');
  const [contractor, setContractor] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleNext = () => {
    if (!projectName || !projectDescription || !client || !contractor) {
      setError('All fields are required');
      return;
    }
    onNext({ projectName, projectDescription, client, contractor });
    navigate('/step2')
  };

  return (
    <div className='card w-96 glass mx-auto'>
      <h2>Step 1: Project Information</h2>
      {error && <p className='text-red-600'>{error}</p>}
      <div className='form-control'>
        <label htmlFor="projectName" className="label">Project Name:</label>
        <input type="text" className="input input-bordered" id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
      </div>
      <div className='form-control'>
        <label htmlFor="projectDescription" className="label">Project Description:</label>
        <input type="text" className="input input-bordered" id="projectDescription" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
      </div>
      <div className='form-control'>
        <label htmlFor="client" className="label">Client:</label>
        <input type="text" className="input input-bordered" id="client" value={client} onChange={(e) => setClient(e.target.value)} />
      </div>
      <div className='form-control'>
        <label htmlFor="contractor" className="label">Contractor:</label>
        <input type="text" className="input input-bordered" id="contractor" value={contractor} onChange={(e) => setContractor(e.target.value)} />
      </div>
      <button className='btn btn-primary mt-5' onClick={handleNext}>Next</button>
    </div>
  );
}

export default StepOneForm;
