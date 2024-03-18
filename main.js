function showNextForm(event, formId) {
  event.preventDefault();

  // Update the step indicator text based on the current form
  const stepText = document.querySelector(".step span");
  const stepNumber = parseInt(formId.substr(-1));
  stepText.textContent = `Step ${stepNumber} of 3`;

  // Update the class of the circles based on the current form
  const circles = document.querySelectorAll(".circle");
  circles.forEach((circle) => circle.classList.remove("active-circle")); // Remove active-circle class from all circles
  const activeCircleIndex = parseInt(formId.substr(-1)) - 1; // Extract the index of the active circle from the formId
  circles[activeCircleIndex].classList.add("active-circle"); // Add active-circle class to the appropriate circle

  // Collect input values from form 1
  if (formId === "form2") {
    const form1 = document.getElementById("form1");
    const form1Inputs = form1.querySelectorAll("input");
    const form1Data = {};

    form1Inputs.forEach((input) => {
      form1Data[input.name] = input.value;
    });

    // Store form1Data for later use
    window.form1Data = form1Data;
  }

  // Collect input values from form 2
  if (formId === "form3") {
    const form2 = document.getElementById("form2");
    const form2Inputs = form2.querySelectorAll(".interest-btn");
    const form2Data = [];

    form2Inputs.forEach((input) => {
      if (input.classList.contains("selected")) {
        form2Data.push(input.value);
      }
    });

    // Store form2Data for later use
    window.form2Data = form2Data;

    console.log("Selected Topics:", form2Data);
    // Display collected data in form 3
    const summaryContainer = document.getElementById("summary-container");
    summaryContainer.innerHTML = `
<p><span style="color: #4d5562; margin-right: 10px; margin-bottom: 30px">Name:</span> <span style="color: #e5e7eb;">${
      window.form1Data.name
    }</span></p><br>
<p><span style="color: #4d5562; margin-right: 10px; margin-bottom: 30px">Email:</span> <span style="color: #e5e7eb;">${
      window.form1Data.email
    }</span></p><br>
<p><span style="color: #4d5562; margin-right: 10px; margin-bottom: 30px">Topics:</span></p><br>
<ul class="topics-list">${form2Data
      .map((topic) => `<li><span style="color: #e5e7eb;">${topic}</span></li>`)
      .join("")}</ul><br>
`;
    summaryContainer.style = "color: ";
  }

  // Show the next form and hide the current one
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    if (form.id === formId) {
      form.style.display = "block"; // Make the current form visible
    } else {
      form.style.display = "none"; // Hide all other forms
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const interestBtns = document.querySelectorAll(".interest-btn");

  interestBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const buttonValue = this.value; // Fetch the value of the clicked button
      console.log("Clicked button value:", buttonValue);
      this.classList.toggle("selected"); // Toggle the 'selected' class
    });
  });
});
