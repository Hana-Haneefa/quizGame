window.onload = function() {
  setTimeout(() => {
    document.getElementById("prompt").style.opacity = 1;
  }, 1000);
};

function selectGender(gender) {
  const prompt = document.getElementById("prompt");
  prompt.innerHTML = `<p>You selected: ${gender}</p>`;
  setTimeout(() => {
    prompt.style.opacity = 0;
  }, 1000);

};

setTimeout(() => {
 window.location.href = './home.html';
}, 2000);

// function selectGender(gender) {
//   changeLogo(gender);
// }

// function changeLogo(gender) {
//   if (gender === 'Boy') {
//     document.getElementById("logo").src = './Assests/Images/Boy.png';
//   } else {
//     document.getElementById("logo").src = './Assests/Images/Brainy.png';
//   }
// };