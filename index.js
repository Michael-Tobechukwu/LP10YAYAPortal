  // Get references to the select elements
  var zoneSelect = document.getElementById("zone");
  var areasSelect = document.getElementById("areas");

  // Add event listener to the zone select
  zoneSelect.addEventListener("change", function() {
    // Clear previous options
    areasSelect.innerHTML = "";

    // Get the selected value from the zone select
    var selectedOption = zoneSelect.value;

    // Populate the areas select based on the selected option
    if (selectedOption === "Amazing Grace") {
      populateOptions(["","Adonai", "Mighty Favour", "Amazing Grace"]);
    } else if (selectedOption === ""){
      populateOptions(["Select your zone to see the list of areas",])
    }
    else if (selectedOption === "Bethel") {
      populateOptions(["","Bethel Area 1", "Bethel Area 2" ]);
    } else if (selectedOption === "Celebration") {
      populateOptions(["","Celebration Area 1", "Celebration Option 2", "Celebration Area 3"]);
    } else if (selectedOption === "Excellence") {
      populateOptions(["","Excellence Area 1", "Excellence Area 2", "Excellence Area 3"]);
    } else if (selectedOption === "Light House") {
      populateOptions(["","Light House Area 1", "Light House Area 2"]);
    } else if (selectedOption === "Livingstone") {
      populateOptions(["","Livingstone Area 1", "Livingstone Area 2", "Livingstone Area 3"]);
    } else if (selectedOption === "Garden of Love") {
      populateOptions(["","Garden of Love Area 1", "Garden of Love Area 2"]);
    } else if (selectedOption === "Peace Sanctuary") {
      populateOptions(["","Peace Sanctuary Parish"]);
    } else if (selectedOption === "Solid Rock") {
      populateOptions(["","Solid Rock Area 1", "Solid Rock Area 2", "Solid Rock Area 3"]);
    } else if (selectedOption === "Sunshine") {
      populateOptions(["","Sunshine Area 1", "Sunshine Area 2"]);
    } else if (selectedOption === "Victory Arena") {
      populateOptions(["","Victory Arena Area 1", "Victory Arena Area 2", "Victory Arena Area 3"]);
    } else if (selectedOption === "Wonderland") {
      populateOptions(["","Wonderland Area 1", "Wonderland Option 2", "Wonderland Area 3", "Wonderland Area 4"]);
    }
    
  });

  // Function to populate the areas select with options
  function populateOptions(options) {
    options.forEach(function(option) {
      var newOption = document.createElement("option");
      newOption.text = option;
      areasSelect.add(newOption);
    });
  }

  const reportData = document.getElementById('reportData');

  function showReportData (){
    reportData.style.display = 'block';
  }

  areasSelect.addEventListener('change', showReportData)

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
<input type="button" value="Click to add report for another parish" id="newParishBtn">


`
}

newParishBtn.addEventListener('click', showParishData2)

