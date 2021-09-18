const firebaseConfig = {
  apiKey: "AIzaSyDe_xXOCgATlJuCw1raHFlhnL5MpN4YHdU",
  authDomain: "chat-js-d81cf.firebaseapp.com",
  projectId: "chat-js-d81cf",
  storageBucket: "chat-js-d81cf.appspot.com",
  messagingSenderId: "336131609833",
  appId: "1:336131609833:web:b36f84af4380035de74c78",
  measurementId: "G-5Z9BETRK85",
};

firebase.initializeApp(firebaseConfig);
const chatRef = firebase.database().ref().child("chats");
const chatLimitRef = firebase.database().ref().child("chats").limitToLast(70)

const username = localStorage.getItem("chat-js");

const chatSec = document.querySelector(".chat");
const formChat = document.getElementById("form-chat");
const messageInput = document.getElementById("message");
const chatSection = document.querySelector(".chat-content")
const menu = document.querySelector(".menu")
const btnMenu = document.getElementById("btn-menu")
const btnLogout = document.getElementById("logout")
const btnFullScreen = document.getElementById("fullscreen")

document.addEventListener("DOMContentLoaded", function() {
  scrollToBottom()
})

document.getElementById("name").innerText = username

formChat.addEventListener("submit", handleSend);
btnMenu.addEventListener("click", openMenu)
btnLogout.addEventListener("click", Logout)
btnFullScreen.addEventListener("click", fullScreen)

function scrollToBottom() {
  window.scrollTo(0, chatSec.scrollHeight);
}

function openMenu() {
  menu.classList.toggle("active")
  if(menu.classList.contains("active")) {
    btnMenu.setAttribute("class", "fa fa-times")    
  } else {
    btnMenu.setAttribute("class", "fa fa-bars")    
  }
}

function Logout() {
  localStorage.removeItem("chat-js");
  window.location.replace("login.html")
}

function fullScreen() {
  if(!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  }
}

function sfx() {
  const sound = new Audio("assets/sfx.mp3")
  sound.currentTime = 0
  sound.play()
}

function handleSend(e) {
  e.preventDefault();
  let message = messageInput.value;

  if (message.length < 1) {
    alert("Pesan Harus Diisi");
    return;
  }

  const times = new Date();
  const h = times.getHours() < 10 ? "0"+times.getHours() : times.getHours()
  const m = times.getMinutes() < 10 ? "0"+times.getMinutes() : times.getMinutes()
  const timeStamp = h + ":" + m;

  sendMessage(message, timeStamp);
  sfx()
  formChat.reset();
}

function sendMessage(message, timeStamp) {
  let dataChat = chatRef.push();
  dataChat.set({
    username: username,
    message: message,
    time: timeStamp,
  });
}

chatLimitRef.on("value", function (getChats) {
  let template = "";
  getChats.forEach((dataChat) => {
    let chat = dataChat.val();
    if (chat.username == username) {
        template += `
        <div class="message" id="me">
            <div>
                <h4>${chat.username}</h4>
                <p>${chat.message}</p>
                <p>${chat.time}</p>
            </div>
        </div>`
    } else {
        template += `
        <div class="message">
            <div>
                <h4>${chat.username}</h4>
                <p>${chat.message}</p>
                <p>${chat.time}</p>
            </div>
        </div>`
    }
   
    chatSection.innerHTML = template
    scrollToBottom()
  })
})
