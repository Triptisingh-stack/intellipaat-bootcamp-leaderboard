const API_URL =
"https://script.google.com/macros/s/AKfycbzADReZdzmu8iEXZs-JSsaeemOfhF9OU2BV8gyH6nosAxSPum9zXYrYYv98Ct3hlEBULA/exec";

let students = [];

async function loadLeaderboard() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to fetch leaderboard");
        }

        students = await response.json();

        const tbody =
            document.getElementById("leaderboardBody");

        tbody.innerHTML = "";

        students.forEach(student => {

            tbody.innerHTML += `

            <tr id="rank-${student.rank}">

                <td>🏅 #${student.rank}</td>

                <td>${student.name}</td>

                <td>${student.badge}</td>

            </tr>

            `;

        });

    }

    catch(error){

        console.error(error);

        document.getElementById(
            "leaderboardBody"
        ).innerHTML = `

        <tr>
            <td colspan="3">
                Unable to load leaderboard.
            </td>
        </tr>

        `;
    }

}

function findRank() {

    const email =
        document
        .getElementById("searchEmail")
        .value
        .trim()
        .toLowerCase();

    if (!email) {

        alert(
            "Please enter your registered email."
        );

        return;
    }

    const student = students.find(

        s =>
        s.email &&
        s.email.toLowerCase() === email

    );

    const card =
        document.getElementById(
            "studentCard"
        );

    if (!student) {

        card.innerHTML = `

        <div class="card">

            <h2>
                Student Not Found
            </h2>

            <p>
                Please check your email and try again.
            </p>

        </div>

        `;

        return;
    }

    card.innerHTML = `

    <div class="card">

        <h2>${student.name}</h2>

        <h1>
            🏆 Rank #${student.rank}
        </h1>

        <h3>
            ${student.badge}
        </h3>

        <p>
            ⭐ Score: ${student.score}
        </p>

    </div>

    `;

    document
        .querySelectorAll("tbody tr")
        .forEach(row =>
            row.classList.remove(
                "highlight"
            )
        );

    const row =
        document.getElementById(
            `rank-${student.rank}`
        );

    if (row) {

        row.classList.add(
            "highlight"
        );

        row.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    }

}

document
.getElementById("searchEmail")
.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        findRank();

    }

});

window.onload = loadLeaderboard;
