import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';
// import html2pdf from 'html2pdf.js';
import { useReactToPrint } from 'react-to-print';



function ResultPage({ formData }) {

  const componentPDF = useRef();

  const handleDownloadPDF= useReactToPrint({
    content: ()=>componentPDF.current,
    documentTitle: 'result',
    onAfterPrint: ()=>alert('Your file is downloded..!')

  });


  // const handleDownloadPDF = () => {
    
  //   const capture = document.querySelector('.table-data')
  //   html2canvas(capture).then((canvas)=>{
  //     const imgdata = canvas.toDataURL('img/png');
  //     const doc = new jsPDF('p', 'mm', 'a4');
  //     // const componentWidth = doc.internal.pageSize.getWidth();
  //     // const componentHeight = doc.internal.pageSize.getHeight();
  //     doc.addImage(imgdata, 'PNG', 0, 0);
  //     doc.save('result.pdf');
  //   })

  // };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const chartData = {
    labels:(formData.csvData!==null)? formData.csvData.map((row) => row[0]):[],
    datasets: [
      {
        label: 'X Values',
        data: (formData.csvData!==null)? formData.csvData.map((row) => parseFloat(row[1])):[],
        fill: false,
        borderColor: 'red',
      },
    ],
  };

  
 

  const options = {
    scales: {
      x: {
        type: 'linear', // Use 'linear' scale for numeric x-axis values
        position: 'bottom',
        title: {
          display: true,
          text: 'KP',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'X Values',
        },
      },
    },
  };

  return (
    <div className='w-100 mx-auto'>
      <h2>Result Page</h2>
      <div ref={componentPDF} className='table-data' style={{width:'100%'}}>
        <table id="result-table" className='table table-xs table-pin-rows table-pin-cols'>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Project Name</td>
              <td>{formData.projectName}</td>
            </tr>
            <tr>
              <td>Project Description</td>
              <td>{formData.projectDescription}</td>
            </tr>
            <tr>
              <td>Client</td>
              <td>{formData.client}</td>
            </tr>
            <tr>
              <td>Contractor</td>
              <td>{formData.contractor}</td>
            </tr>
            <tr>
              <td>MaxX</td>
              <td>{formData.maxX}</td>
            </tr>
            <tr>
              <td>MaxY</td>
              <td>{formData.maxY}</td>
            </tr>
            <tr>
              <td>MaxZ</td>
              <td>{formData.maxZ}</td>
            </tr>
            <tr>
              <td>MinX</td>
              <td>{formData.minX}</td>
            </tr>
            <tr>
              <td>MinY</td>
              <td>{formData.minY}</td>
            </tr>
            <tr>
              <td>MinZ</td>
              <td>{formData.minZ}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='flex flex-row justify-center mt-10'>
        {formData.csvData !== null ? <Line data={chartData} options={options} />: <p>CSV file is not Uploaded..!</p>}
      </div>
      
      
      <button className='btn btn-success mt-8' onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
}

export default ResultPage;
