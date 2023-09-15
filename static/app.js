let preprompt = "Assume the role of a game with extensive knowledge on career experiences, essential life skills, interactive fiction writing, and narrating life experiences through stories while I play the role of the player. Your task is to help me, a person with mental disabilities, by helping me gain useful career skillsets and essential life skills through different scenarios by creating an interactive story. Within your narrated stories, provide suitable names for characters, locations, groups and organizations, events, and items that are connected to the career that the player chooses. The game will begin with me providing a career of my choosing that I would like to pursue and you will then lead the game by providing various scenarios or experiences that I will experience within that career or career field.\nOnce I have provided my career title, you will provide one scenario per chat and each scenario teaches me a skill that I will need within the chosen career or an essential life skill. Some experiences can include, but are not limited to, role responsibilities within the chosen career, difficult conversations, financial literacy, and other work experiences.\nFor the scenario responses, provide three multiple-choice options around how I can react or respond to the scenario or experience that you provided. I will then choose one of the provided options and you will then provide an in-depth narrative that describes what will happen next in the story along with the next scenario and three new multiple-choice options that I can select from. Each game will be 10 scenarios long with a recap at the end that gives an overview of lessons learned."
let conversationId = ""


let TTsEnabled = false
//Toggle prompt and game divs
let toggle = button => {
    let element = document.getElementById("prompt-center");
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }

    let btnElement = document.getElementById("TTS");
    if (btnElement.style.display === "none") {
        btnElement.style.display = "block";
    } else {
        btnElement.style.display = "none";
    }

    let gameElement = document.getElementById("boxes");
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

    let loadingElement = document.getElementById("boxes");
    if (loadingElement.style.display === "none") {
        loadingElement.style.display = "block";
    } else {
        loadingElement.style.display = "none";
    }
  }

  let gameElement = document.getElementById("game-center");
  if (gameElement.style.display === "none") {
    gameElement.style.display = "block";
  } else {
    gameElement.style.display = "none";
  }

  let btnElement = document.getElementById("TTS");
  if (btnElement.style.display === "none") {
    btnElement.style.display = "block";
  } else {
    btnElement.style.display = "none";
  }
}

//send post requests
let postCareer = async () => {
  var careerInput = document.getElementById("career");
  console.log("start")
  console.log(careerInput)
  try {

    let body = {
      conversationId: conversationId, system_prompt: preprompt, user_response: careerInput.value, prompt: "{0} display your response in a stringified json for outcome, scenario, and options, where options is an array of strings"
    }

    // Make an HTTP POST request to the API
    const response = await fetch('http://127.0.0.1:8080/ask', {
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

    return data;
  } catch (error) {
    console.error('Error posting career data:', error);
    throw error;
  }
}

let postButton = optionNum => {
  //post logic here
  console.log("Option " + optionNum + " selected")
  //Set user_response = optionNum
}

let toggleTTS = () => {
  //TTS logic here
  TTsEnabled = True
}

function refreshPage() {
  location.reload();
}

//This is the json_object we need to emulate with the backend parser
var response_json = {
  "outcome": "success",
  "scenario": "You have chosen to pursue a career as a Graphic Designer. Your first scenario involves creating a logo design for a local coffee shop. They want a design that reflects their brand and captures the essence of their coffee. How do you approach this task?",
  "options": [
    "Research the coffee shop's brand and target audience before starting the design.",
    "Start designing without any prior research.",
    "Ask the coffee shop owner for more information about their preferences and vision."
  ]
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


    // draw updated circle

    // c.beginPath();
    // c.arc(x, y, r, 0, Math.PI*2, true);
    // c.stroke();

    // draw its line to mouse
    let d = Math.sqrt((x - mx) * (x - mx) + (y - my) * (y - my));
    if (d < mouse_ol) {
      c.strokeStyle = `rgba(25, 145, 29, ${max_ms_opac * (mouse_ol - d) / mouse_ol})`;
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(mx, my);
      c.stroke();
    }

    // draw lines with other dots
    // for(let i=0; i<dots_num; i++) {
    for (let j = i + 1; j < dots_num; j++) {
      let x1 = dots[j].x;
      let y1 = dots[j].y;
      let d = Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
      if (d < dots_ol) {
        c.strokeStyle = `rgba(176, 141, 87, ${max_dots_opac * (dots_ol - d) / dots_ol})`;
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x, y);
        c.stroke();
        // }
      }
    }
  }
  requestAnimationFrame(update);
}

init();

requestAnimationFrame(update);

