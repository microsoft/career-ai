//Toggle prompt and game divs
let toggle = button => {
    let element = document.getElementById("prompt-center");
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }

    let gameElement = document.getElementById("game-center");
    if (gameElement.style.display === "none") {
        gameElement.style.display = "block";
    } else {
        gameElement.style.display = "none";
    }
  }

//send post requests
let postCareer = prompt => {
  console.log("postcareer")
    // Get the input element by its ID
    var inputElement = document.getElementById("prompt");
    
    // Get the value entered in the input field
    var inputValue = inputElement.value;
    
    // Get the paragraph element by its ID
    var paragraph = document.getElementById("chatGPTResp");
    
    // Update the paragraph's content with the input value
    paragraph.textContent = "You chose the career of a " + inputValue + "!";
    askFirstPrompt(inputValue);
    //askAI(inputValue);

}

function askAI(profession) {
  console.log("Attempting to Ask AI for the " + profession + " career");
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/ask', true);
  xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');
  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status ===200){
      const json = JSON.parse(xhr.responseText);
      console.log(json.response);
    }
  };

  const data = JSON.stringify({'profession: ': profession});
  xhr.send(data);
  
}



let postButton = optionNum => {
    //post logic here
    console.log("PostButton " + optionNum);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/ask', true);
    xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');
    xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status ===200){
      const json = JSON.parse(xhr.responseText);
      console.log(xhr.responseText);
    }
  };
}

let toggleTTS = () => {
    //TTS logic here
}

function refreshPage() {
  location.reload();
}


//For particle effect
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

var Dot = function(x, y, dx, dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
}

function updtMouse(e) {
  mx = e.x;
  my = e.y;
  //console.log(mx + " " + my);
}

function init() {

  for(let i=0; i<dots_num; i++) {
    let x = Math.floor((Math.random()*innerWidth/uni_divs)+(parseInt(i/(dots_num/uni_divs))*(innerWidth/uni_divs)));
    let y = Math.floor(Math.random()*innerHeight);
    let dx = Math.random()*max_speed+0.1;
    let dy = Math.random()*max_speed+0.1;
    if(i%2==0) {
      dx*=-1;
      dy*=-1;
    }
    let temp = new Dot(x, y, dx, dy);
    dots.push(temp);
  }

}

function update() {

  c.clearRect(0, 0, innerWidth, innerHeight);

  for(let i=0; i<dots_num; i++) {

    let dy = dots[i].dy;
    let dx = dots[i].dx;

    dots[i].x += dx;
    dots[i].y += dy;

    // rebounce form walls
    if(dots[i].x>innerWidth || dots[i].x<0) {
      dots[i].dx *= -1;
    }
    if(dots[i].y>innerHeight || dots[i].y<0) {
      dots[i].dy *= -1;
    }

    let x = dots[i].x;
    let y = dots[i].y;


    // draw updated circle

    // c.beginPath();
    // c.arc(x, y, r, 0, Math.PI*2, true);
    // c.stroke();

    // draw its line to mouse
    let d = Math.sqrt((x-mx)*(x-mx)+(y-my)*(y-my));
    if(d<mouse_ol) {
      c.strokeStyle = `rgba(100, 180, 255, ${max_ms_opac*(mouse_ol-d)/mouse_ol})`;
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(mx, my);
      c.stroke();
    }

    // draw lines with other dots
    // for(let i=0; i<dots_num; i++) {
      for(let j=i+1; j<dots_num; j++) {
        let x1 = dots[j].x;
        let y1 = dots[j].y;
        let d = Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        if(d<dots_ol) {
          c.strokeStyle = `rgba(157, 210, 255, ${max_dots_opac*(dots_ol-d)/dots_ol})`;
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

function askFirstPrompt(profession){
  var system_prompt = "Assume the role of a game with extensive knowledge on career experiences, "
 + "interactive fiction writing, and narrating life experiences through stories while the user plays the role of the player. Your task is to help a person that has limited learning skills with how to navigate a career by helping them gain useful skillsets through different scenarios. "
 +" Within your narrated stories, provide suitable names for characters, locations, groups and organizations, events, and items that are connected to the career that the player chooses."
 +" The game will begin with the player providing a career of "
 + profession +
 +" and you will then lead the game by providing various scenarios or experiences that they will experience within that career or career field.";
+" you will provide one scenario per chat and each scenario teaches the player a skill that they will need within the chosen career. Some experiences can include, but are not limited to, role responsibilities within the chosen career, difficult conversations, financial decisions, and other work experiences. "
+ " Each of your responses will be broken into three parts: Outcome, Scenario, and Options." 
+"For the scenario responses, provide three multiple-choice options around how the player can react or respond to the scenario or experience that you provided. The player will then choose an option and you will provide an in-depth narrative that describes what will happen next along with the next scenario and three new multiple-choice options that the player can select from."
+"Each game will be 10 scenarios long with a recap at the end that gives an overview of lessons learned.";
mprompt = "return your response broken down in three sections: Outcome, Scenario, and Options, in markdown syntax"
mresponse = ""
const xhr = new XMLHttpRequest();
  xhr.open('POST', '/ask', true);
  xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');
  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status ===200){
      const json = JSON.parse(xhr.responseText);
      mresponse = json.response;
      console.log(xhr);
      var respy = xhr["response"];
      console.log(JSON.parse(respy).conversationId)
      updateParsable(mresponse)
    }
  };
  const data = JSON.stringify({'system-prompt': system_prompt, 'user-response': '', 'prompt': mprompt, 'conversationId': ''});
  xhr.send(data);

   

}

function updateParsable(mresponse){
  // Get the paragraph element by its ID
  var parsable = document.getElementById("parsable");
    
  // Update the paragraph's content with the input value
  parsable.textContent = mresponse
}


init();

requestAnimationFrame(update);