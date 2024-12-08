document.addEventListener("DOMContentLoaded", () => {
  const partyCountForm = document.getElementById("partyCountForm");
  const partyForm = document.getElementById("partyForm");
  const numPartiesInput = document.getElementById("numParties");
  const partyInputsContainer = document.getElementById("partyInputs");
  const stepOne = document.getElementById("stepOne");
  const stepTwo = document.getElementById("stepTwo");
  const resultsSection = document.getElementById("resultsSection");

  let partyNames = [];

  // Step 1: Select number of parties
  partyCountForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const numParties = parseInt(numPartiesInput.value, 10);

    partyInputsContainer.innerHTML = "";
    for (let i = 1; i <= numParties; i++) {
      partyInputsContainer.innerHTML += `
        <div class="mb-3">
          <label for="partyName${i}" class="form-label">Party ${i} Name</label>
          <input type="text" id="partyName${i}" class="form-control partyNameInput" placeholder="Enter party name" required>
        </div>`;
    }

    stepOne.classList.add("d-none");
    stepTwo.classList.remove("d-none");
  });

  // Step 2: Submit party names and fetch data
  partyForm.addEventListener("submit", (event) => {
    event.preventDefault();

    partyNames = Array.from(document.querySelectorAll(".partyNameInput")).map((input) => input.value);
    const numComments = parseInt(document.getElementById("numComments").value, 10);
    const subreddit = document.getElementById("subreddit").value;

    // Simulated Data for Chart Rendering
    const data = partyNames.reduce((acc, name) => {
      acc[name] = Math.floor(Math.random() * numComments);
      return acc;
    }, {});

    const labels = Object.keys(data);
    const values = Object.values(data);

    renderBarChart(labels, values);
    renderPieChart(labels, values);

    stepTwo.classList.add("d-none");
    resultsSection.classList.remove("d-none");
  });

  function renderBarChart(labels, values) {
    const ctx = document.getElementById("barChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Number of Mentions",
          data: values,
          backgroundColor: labels.map(() => getRandomColor()),
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  function renderPieChart(labels, values) {
    const ctx = document.getElementById("pieChart").getContext("2d");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: labels.map(() => getRandomColor()),
        }]
      },
      options: {
        responsive: true,
      }
    });
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});
