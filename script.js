const API_URL =
"https://script.google.com/macros/s/AKfycbzADReZdzmu8iEXZs-JSsaeemOfhF9OU2BV8gyH6nosAxSPum9zXYrYYv98Ct3hlEBULA/exec";

let students = [];

async function loadLeaderboard(){

  const response = await fetch(API_URL);

  students = await response.json();

  const tbody =
    document.getElementById("leaderboardBody");

  tbody.innerHTML = "";

  students.forEach(student=>{

    tbody.innerHTML += `
      <tr id="rank-${student.rank}">
        <td>${student.rank}</td>
        <td>${student.name}</td>
        <td>${student.badge}</td>
      </tr>
    `;
  });

}

function findRank(){

  const email =
    document.getElementById("searchEmail")
      .value
      .trim()
      .toLowerCase();

  const student = students.find(
      s=>s.email.toLowerCase()===email
  );

  if(!student){

    document.getElementById("studentCard")
      .innerHTML =
      "<div class='card'>Student not found</div>";

    return;
  }

  document.getElementById("studentCard")
    .innerHTML = `
      <div class="card">

      <h2>${student.name}</h2>

      <h1>#${student.rank}</h1>

      <h3>${student.badge}</h3>

      <p>Score: ${student.score}</p>

      </div>
    `;

  document
      .querySelectorAll("tr")
      .forEach(r=>r.classList.remove("highlight"));

  const row =
    document.getElementById(
      `rank-${student.rank}`
    );

  row.classList.add("highlight");

  row.scrollIntoView({
      behavior:"smooth",
      block:"center"
  });

}

loadLeaderboard();
