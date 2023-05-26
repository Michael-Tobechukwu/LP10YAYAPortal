
  //Get current month of report
var currentMonth = moment().format('MMMM YYYY');
document.getElementById("currentMonth").innerHTML = currentMonth;


//Select zone
async function selectZone() {
  const endpoint = 'https://test.fintecgrate.com/api/zones';
  const zoneDropdown = document.getElementById('zonesList');

  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(endpoint, requestOptions);

    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }

    const data = await response.json();

    // Clear existing options
    zoneDropdown.innerHTML = '';
    // Add an empty option
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.textContent = '';
    zoneDropdown.appendChild(emptyOption);

    if (Array.isArray(data.zones)) {
      if (data.zones.length > 0) {
        // Iterate over the zones and create options
        data.zones.forEach((zone) => {
          const option = document.createElement('option');
          option.value = zone;
          option.textContent = zone;
          zoneDropdown.appendChild(option);
        });
      } else {
        console.warn('No zones available');
        // Alternatively, display a message to the user
      }
    } else {
      console.error('Invalid data format:', data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

window.onload = selectZone;
//--------

//Select area under area
async function selectArea(zone) {
    const endpoint = `https://test.fintecgrate.com/api/areas?zone=${zone}`;
    const areasListDropdown = document.getElementById('areasList');

  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(endpoint, requestOptions);

    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }

    const data = await response.json();

    // Clear existing options
    areasListDropdown.innerHTML = '';
     // Add an empty option
     const emptyOption = document.createElement('option');
     emptyOption.value = '';
     emptyOption.textContent = '';
     areasListDropdown.appendChild(emptyOption);

    if (Array.isArray(data.areas)) {
      if (data.areas.length > 0) {
        // Iterate over the zones and create options
        data.areas.forEach((area) => {
          const option = document.createElement('option');
          option.value = area;
          option.textContent = area;
          areasListDropdown.appendChild(option);
        });
      } else {
        console.warn('No areas available');
        // Alternatively, display a message to the user
      }
    } else {
      console.error('Invalid data format:', data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

const zoneDropdown = document.getElementById('zonesList');

zoneDropdown.addEventListener('change', function() {
  const selectedZone = zoneDropdown.value;
  selectArea(selectedZone);
});
//------

//Select parish under area
async function selectParish(area) {
  const endpoint = `https://test.fintecgrate.com/api/parishes?area=${area}`;
  const parishesListDropdown = document.getElementById('parishesList');

const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

try {
  const response = await fetch(endpoint, requestOptions);

  if (!response.ok) {
    throw new Error('HTTP error ' + response.status);
  }

  const data = await response.json();

  // Clear existing options
  parishesList.innerHTML = '';
  // Add an empty option
  const emptyOption = document.createElement('option');
  emptyOption.value = '';
  emptyOption.textContent = '';
  parishesList.appendChild(emptyOption);
  
  if (Array.isArray(data.parishes)) {
    if (data.parishes.length > 0) {
      // Iterate over the zones and create options
      data.parishes.forEach((parish) => {
        const option = document.createElement('option');
        option.value = parish;
        option.textContent = parish;
        parishesList.appendChild(option);
      });
    } else {
      console.warn('No parishes available');
      // Alternatively, display a message to the user
    }
  } else {
    console.error('Invalid data format:', data);
  }
} catch (error) {
  console.error('Error:', error);
}
}

const areasListDropdown = document.getElementById('areasList');

areasListDropdown.addEventListener('change', function() {
const selectedArea = areasListDropdown.value;
selectParish(selectedArea);
});
//-------


//Calculate amount to remit
  function calculateAnswer() {
    // Get the input value
    var inputElement = document.getElementById("offering");
    var inputValue = inputElement.value;

    // Perform the calculation on click
    var answer = 0.5 * parseFloat(inputValue); 

    // Display the result
    var resultElement = document.getElementById("result");
    resultElement.textContent = "You are to remit: N" + answer;
  }

  //Add up all attendance inputs
  var menInput = document.getElementById("men");
  var womenInput = document.getElementById("women");
  var childrenInput = document.getElementById("children");

  // Add event listener to each input element
  menInput.addEventListener("input", calculateAttendance);
  womenInput.addEventListener("input", calculateAttendance);
  childrenInput.addEventListener("input", calculateAttendance);

  // Function to calculate the attendance and update the result
  function calculateAttendance() {
    var menValue = parseFloat(menInput.value) || 0;
    var womenValue = parseFloat(womenInput.value) || 0;
    var childrenValue = parseFloat(childrenInput.value) || 0;

    var sum = menValue + womenValue + childrenValue;

    // Display the sum in the result paragraph
    var resultElement = document.getElementById("totalAttendance");
    resultElement.textContent = "Total Attendance: " + sum;
  }

//If remittance made, upload receipt
function receiptUpload() {
  const selectedRadioButton = document.querySelector('input[name="paymentResponse"]:checked');

  // If the selected radio button is "Yes", show the upload file input.
  if (selectedRadioButton.id === 'yes') {
    document.querySelector('#receiptUpload').style.display = 'block';
  } else {
    document.querySelector('#receiptUpload').style.display = 'none';
  }
}

const reportData = document.getElementById('reportData');
const parishSelect = document.getElementById('parishesList');

  function showReportData (){
    reportData.style.display = 'block';
  }

  parishSelect.addEventListener('change', showReportData)

  //Submit report to server
  function submitThisReport() {
    // Get form data
    var formData = {
      zone: document.getElementById('zonesList').value,
      area: document.getElementById('areasList').value,
      parish: document.getElementById('parishesList').value,
      men: document.getElementById('men').value,
      women: document.getElementById('women').value,
      children: document.getElementById('children').value,
      offering: document.getElementById('offering').value,
      commentService: document.getElementById('commentService').value,
      paymentResponse: document.querySelector('input[name="paymentResponse"]:checked').id,
      receiptUpload: document.getElementById('receiptUpload').value,
    };
  
    // Send POST request
    fetch(`https://test.fintecgrate.com/api/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the API response
        console.log('Response:', data);
        
        // Update UI with success message
        var reportDataElement = document.getElementById('reportData');
        reportDataElement.innerHTML = '<p>Your report has been successfully submitted for this parish</p>';
  
        // Add button to redirect to home page
       var homeButton = document.createElement('button');
        homeButton.innerHTML = 'Click to enter report for another parish';
        homeButton.addEventListener('click', function() {
          // Redirect logic goes here
         window.location.href = `https://lp-10-yaya-portal.vercel.app`;
        });
        reportDataElement.appendChild(homeButton);
      })
      .catch(error => {
       
        console.error('Error:', error);
      });
  }
  
  // Attach event listener to submit button
  var submitBtn = document.getElementById('submitBtn');
  submitBtn.addEventListener('click', submitThisReport);
  
