const quizData = [
  {
    question: "Who is considered the 'God of cricket'?",
    options: ["Virat kohli", "Rohit sharma", "Sachin tendulkar", "Ms dhoni"],
    answer: "Sachin tendulkar"
  },
  {
    question: "who has the highest Test batting average?",
    options: ["muttiah muralitharan", "Brian lara", "Shane warne", "Don bradman"],
    answer: "Don bradman"
  },
  {
    question: "What does LBW stand for?",
    options: ["Leg bye four", "Leg before wicket", "Long ball wicket", "Left before wicket"],
    answer: "Leg before wicket"
  }
];

let currentIndex = 0;
let score = 0;

function loadQuestion() {
  const current = quizData[currentIndex];
  document.getElementById('question').innerText = current.question;
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';

  current.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.className = "option";
    btn.onclick = () => {
      checkAnswer(option);
      
      document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
      btn.classList.add('selected');
    };
    optionsDiv.appendChild(btn);
  });
}
function checkAnswer(selected) {
  const correct = quizData[currentIndex].answer;
  if (selected === correct) {
    score++;
    
    document.getElementById('result').innerText = 'Correct!';
  } else {
   
    document.getElementById('result').innerText = `Incorrect! The correct answer is ${correct}.`;
  }
  document.querySelectorAll('.option').forEach(btn => btn.disabled = true);
}
function nextQuestion() {
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuestion();
  } else {
    
    const nextBtn = document.querySelector('.btn');
    nextBtn.innerText = 'Finish';
    nextBtn.onclick = finishQuiz;
  }
}


function finishQuiz() {
  
  document.getElementById('result').innerText = `Your final score is ${score}/${quizData.length}`;
  document.querySelectorAll('.option').forEach(btn => btn.disabled = true);
}

loadQuestion();


document.getElementById("get-weather").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;
  
  if (city) {
    const apiKey = "b445d38a8607d15f8d8afac046330276";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const weatherInfo = `Weather in ${data.name}: ${data.weather[0].main} - ${data.main.temp}°C`;
        document.getElementById("weather-info").innerText = weatherInfo;
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        document.getElementById("weather-info").innerText = "City not found.";
      });
  }
});