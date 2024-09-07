// let preprompt = "Assume the role of a game with extensive knowledge on career experiences, essential life skills, interactive fiction writing, and narrating life experiences through stories while I play the role of the player. Your task is to help me, a person with mental disabilities, by helping me gain useful career skillsets and essential life skills through different scenarios by creating an interactive story. Within your narrated stories, provide suitable names for characters, locations, groups and organizations, events, and items that are connected to the career that the player chooses. The game will begin with me providing a career of my choosing that I would like to pursue and you will then lead the game by providing various scenarios or experiences that I will experience within that career or career field.\nOnce I have provided my career title, you will provide one scenario per chat and each scenario teaches me a skill that I will need within the chosen career or an essential life skill. Some experiences can include, but are not limited to, role responsibilities within the chosen career, difficult conversations, financial literacy, and other work experiences.\nFor the scenario responses, provide three bulleted multiple-choice options around how I can react or respond to the scenario or experience that you provided. I will then choose one of the provided options and you will then provide an in-depth narrative that describes what will happen next in the story along with the next scenario and three new bulleted multiple-choice options that I can select from. Each game will be 10 scenarios long with a recap at the end that gives an overview of lessons learned."
let preprompt = "Assume the role of a game with expertise in career experiences, essential life skills, interactive fiction writing, and narrating life experiences. Your task is to help me, a person with mental disabilities, gain useful career skillsets and essential life skills through an interactive story. Within your stories, provide appropriate names for characters, locations, organizations, events, and items related to the chosen career. The game will begin when I provide a career title. You will then create one scenario per interaction, each teaching a relevant career skill or essential life skill. Scenarios may include role responsibilities, difficult conversations, financial literacy, or other work-related experiences. For each scenario: Provide three clearly bulleted multiple-choice options on how I can react or respond. Ensure that the options are formatted consistently, using simple bullet points ('-'). After I choose an option, respond with an in-depth narrative describing the consequences and introduce the next scenario with three new bulleted choices. The game will consist of 10 scenarios, with a final recap summarizing the lessons learned."
let conversationId = ""
let promptTemplate = "User response: {0}\nNote: display your response in a stringify json for outcome, scenario, and options, where options is an array of strings"
let recognition;
let isListening = false;
let speechInstance = null;

// Speech Recognition

function setupSpeechRecognition() {
  if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true; // Keep listening even after interim results
    recognition.interimResults = true; // Get interim results

    recognition.onstart = function () {
      console.log("Speech recognition service has started");
      document.getElementById('speechButton').textContent = 'Stop';
    };

    recognition.onresult = function (event) {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript.endsWith('.') ? transcript.slice(0, -1) : transcript;
        } else {
          interimTranscript += transcript.endsWith('.') ? transcript.slice(0, -1) : transcript;
        }
      }

      // Update the input field with interim results as they come in
      document.getElementById('prompt').value = interimTranscript + finalTranscript;

      // Optionally, if you want to keep track of final words for server sending or other uses
      if (finalTranscript) {
        sendTranscriptToServer(finalTranscript);
      }
    };

    recognition.onerror = function (event) {
      console.log('Error occurred in recognition: ' + event.error);
    };

    recognition.onend = function () {
      console.log("Speech recognition service disconnected");
      if (isListening) {
        recognition.start(); // Try to reconnect if still supposed to be listening
      } else {
        document.getElementById('speechButton').textContent = 'Talk';
      }
    };
  } else {
    console.log("Speech Recognition Not Supported");
    document.getElementById('speechButton').disabled = true;
  }
}

function toggleSpeechRecognition() {
  if (!isListening) {
    if (!recognition) setupSpeechRecognition();
    recognition.start();
  } else {
    recognition.stop();
  }
  isListening = !isListening;
}

function sendTranscriptToServer(transcript) {
  fetch('/process_speech', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ transcript: transcript })
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById('aiResponse').innerText = data.ai_response;
    })
    .catch(error => console.error('Error:', error));
}

// End Speech Recognition

// Text to Speech

function readAloud(id) {
  const textElement = document.getElementById(id);
  const text = textElement.innerText || textElement.textContent;
  console.log("Before checking speaking:", window.speechSynthesis.speaking);
  if ('speechSynthesis' in window) {
    console.log("Text to speech supported in this browser");
    if (speechInstance && window.speechSynthesis.speaking) {
      console.log("Speech synthesis should be speaking");
      // Stop the current speech
      window.speechSynthesis.pause();
      window.speechSynthesis.cancel();
      speechInstance = null;
      console.log("Speech synthesis should be canceled");
      return;
    } else {
      console.log("Speech synthesis is not speaking");
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = function () {
      speechInstance = null;
    };

    // Start new speech
    speechInstance = utterance;
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Text-to-speech not supported in this browser.');
  }
  console.log("After checking speaking:", window.speechSynthesis.speaking);

}
// End Text to Speech

let toggle = button => {
  let element = document.getElementById("prompt-center");
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }

  let btnElement = document.getElementById("RestartSearch");
  if (btnElement.style.display === "none") {
    btnElement.style.display = "block";
  } else {
    btnElement.style.display = "none";
  }

  let gameElement = document.getElementById("loading-container");
  if (gameElement.style.display === "none") {
    gameElement.style.display = "block";
  } else {
    gameElement.style.display = "none";
  }
}

let toggleDoneLoading = () => {
  let gameElement = document.getElementById("game-center");
  if (gameElement.style.display === "none") {
    gameElement.style.display = "block";
  } else {
    gameElement.style.display = "none";
  }

  let loadingElement = document.getElementById("loading-container");
  if (loadingElement.style.display === "none") {
    loadingElement.style.display = "block";
  } else {
    loadingElement.style.display = "none";
  }
}

//send post requests
let postCareer = async () => {
  // Hide the speech button
  document.getElementById('speechButton').style.display = 'none';

  var careerInput = document.getElementById("prompt");
  displayPrompt();
  console.log("start")
  console.log(careerInput)
  try {

    let body = {
      conversationId: conversationId, system_prompt: preprompt, user_response: careerInput.value, prompt: promptTemplate
    }

    // Make an HTTP POST request to the API
    const response = await fetch('/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Check if the response status is OK (200)
    if (!response.ok) {
      throw new Error('Failed to post career data to the API');
    }

    // Parse the response data as JSON
    const data = await response.json();


    // Now you can work with the response data
    console.log('Response from the API:', data);

    conversationId = data['conversationId'];

    console.log("ConversationID: " + conversationId);

    //updateParagraph(response_json, outcomeParagraph, "outcome")
    updateParagraph(JSON.parse(data.response), "outcome", "outcome")
    updateParagraph(JSON.parse(data.response), "scenario", "scenario")
    updateOption(JSON.parse(data.response), "option1", 0);
    updateOption(JSON.parse(data.response), "option2", 1);
    updateOption(JSON.parse(data.response), "option3", 2);

    // You can return the data or do further processing here

    toggleDoneLoading()

    return data;
  } catch (error) {
    console.error('Error posting career data:', error);
    throw error;
  }
}

let postButton = async (optionNum) => {
  toggleDoneLoading()

  //post logic here
  console.log("Option " + optionNum + " selected")
  //Set user_response = optionNum
  try {
    let body = {
      conversationId: conversationId,
      system_prompt: '',
      user_response: optionNum.toString(),
      prompt: promptTemplate
    }

    // Make an HTTP POST request to the API
    const response = await fetch('/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Check if the response status is OK (200)
    if (!response.ok) {
      throw new Error('Failed to post career data to the API');
    }

    // Parse the response data as JSON
    const data = await response.json();
    // Parse the response data as JSON

    // Now you can work with the response data
    console.log('Response from the API:', data);
    //updateParagraph(response_json, outcomeParagraph, "outcome")
    updateParagraph(JSON.parse(data.response), "outcome", "outcome")
    updateParagraph(JSON.parse(data.response), "scenario", "scenario")
    updateOption(JSON.parse(data.response), "option1", 0);
    updateOption(JSON.parse(data.response), "option2", 1);
    updateOption(JSON.parse(data.response), "option3", 2);

    toggleDoneLoading()


  } catch (error) {
    console.error('Error posting career data:', error);
    throw error;
  }
}

function refreshPage() {
  location.reload();
}

function updateParagraph(response_json, paragraphID, mkey) {

  var optionText = document.getElementById(paragraphID);
  optionText.textContent = response_json[mkey];
}

function updateOption(response_json, optionid, index) {
  var optionText = document.getElementById(optionid);
  //console.log(response_json.options[index]);
  var opText = response_json.options[index];
  optionText.textContent = opText;
}

function displayPrompt() {
  const promptInput = document.getElementById('prompt');
  const displayedPrompt = document.getElementById('displayedPrompt');
  const capitalizedPrompt = promptInput.value.toUpperCase()

  displayedPrompt.textContent = capitalizedPrompt;
}

function getModalTitle() {
  const promptInput = document.getElementById('prompt');
  const modalTitle = document.getElementById('getModalTitle');

  modalTitle.textContent = promptInput.value;
}

function setupModal() {
  const modal = document.getElementById('detailsModal');
  const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  const gotItBtn = document.getElementById('gotItBtn');
  const modalTitle = document.getElementById('displayedPrompt');

  if (!modal || !openBtn || !closeBtn || !gotItBtn || !modalTitle) {
    console.error('Modal or buttons not found in DOM');
    return;
  }

  // Function to open the modal
  function openModal() {
    modal.style.display = 'block';
    // Trap focus inside the modal
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('tabindex', '-1');
    modal.focus();
  }

  // Function to close the modal
  function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('tabindex');
  }

  // Event listeners
  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  gotItBtn.addEventListener('click', closeModal);

  // Close modal if user clicks outside of it
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Accessibility: Close modal with Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
}

// Call the setup function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupModal);

function setupDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  // Function to toggle dark mode
  function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    // Optionally save the user's preference
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
  }

  // Add event listener to the toggle switch
  darkModeToggle.addEventListener('change', toggleDarkMode);

  // Check for saved theme preference on page load
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const darkMode = localStorage.getItem('darkMode') === 'true' || (prefersDarkScheme.matches && localStorage.getItem('darkMode') !== 'false');

  if (darkMode) {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
  }

  // Listen for changes in system preferences
  prefersDarkScheme.addEventListener('change', (mediaQuery) => {
    if (!localStorage.getItem('darkMode')) {
      if (mediaQuery.matches) {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
      } else {
        body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupDarkMode();
});

//For background particle effect
var cnvs = document.getElementById("canvas");
cnvs.width = window.innerWidth;
cnvs.height = window.innerHeight;
var c = cnvs.getContext('2d');
var dots_num = 70;
var r = 1;
var mx, my;
var mouse_ol = 150;
var dots_ol = 150;
var max_speed = 1;
var max_ms_opac = 1;
var max_dots_opac = 1;
var uni_divs = 30;  // ensures that dots are evenly spread across the canvas initially

window.addEventListener('mousemove', updtMouse);

var dots = new Array();

var Dot = function (x, y, dx, dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
}

function updtMouse(e) {
  mx = e.x;
  my = e.y;
}

function init() {

  for (let i = 0; i < dots_num; i++) {
    let x = Math.floor((Math.random() * innerWidth / uni_divs) + (parseInt(i / (dots_num / uni_divs)) * (innerWidth / uni_divs)));
    let y = Math.floor(Math.random() * innerHeight);
    let dx = Math.random() * max_speed + 0.1;
    let dy = Math.random() * max_speed + 0.1;
    if (i % 2 == 0) {
      dx *= -1;
      dy *= -1;
    }
    let temp = new Dot(x, y, dx, dy);
    dots.push(temp);
  }

}

function update() {

  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < dots_num; i++) {

    let dy = dots[i].dy;
    let dx = dots[i].dx;

    dots[i].x += dx;
    dots[i].y += dy;

    // rebounce form walls
    if (dots[i].x > innerWidth || dots[i].x < 0) {
      dots[i].dx *= -1;
    }
    if (dots[i].y > innerHeight || dots[i].y < 0) {
      dots[i].dy *= -1;
    }

    let x = dots[i].x;
    let y = dots[i].y;

    // draw its line to mouse
    let d = Math.sqrt((x - mx) * (x - mx) + (y - my) * (y - my));
    if (d < mouse_ol) {
      c.strokeStyle = `rgba(173, 216, 230, ${max_ms_opac * (mouse_ol - d) / mouse_ol})`;
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(mx, my);
      c.stroke();
    }

    // draw lines with other dots
    for (let j = i + 1; j < dots_num; j++) {
      let x1 = dots[j].x;
      let y1 = dots[j].y;
      let d = Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
      if (d < dots_ol) {
        c.strokeStyle = `rgba(144, 238, 144, ${max_dots_opac * (dots_ol - d) / dots_ol})`;
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x, y);
        c.stroke();
      }
    }
  }
  requestAnimationFrame(update);
}

init();

requestAnimationFrame(update);