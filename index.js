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

//Select area
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


  /*
//Show form for second parish
const parishData2 = document.getElementById('newParish2');
const newParishBtn = document.getElementById('newParishBtn');

function showParishData2() {
  parishData2.style.display = 'block';
  parishData2.innerHTML = `
  <hr>
<h5>Parish 2</h5>
<input type="text" name="parish" id="parish" placeholder="Enter parish name" required>
<div class="attendance">
  <p>Attendance</p>
  <input type="number" placeholder="Men" id="men" required>
  <input type="number" placeholder="Women" id="women" required>
  <input type="number" placeholder="Children" id="children" required>
</div>
<p id="totalAttendance"></p>
<input type="number" name="offering" id="offering" required placeholder="Enter total offering">
<input type="button" value="Click to see amount to remit" onclick="calculateAnswer()" class="calculateBtn">
<p id="result"></p>

<div class="comment">
  <textarea name="commentService" id="commentService" cols="" rows="4" placeholder="Comments on the service"></textarea>
</div>
<input type="button" value="Click to add report for another parish" id="newParishBtn">`
}

newParishBtn.addEventListener('click', showParishData2)


  */
