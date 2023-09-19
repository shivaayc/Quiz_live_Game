const popup=document.querySelector(".popup");
if(sessionStorage.getItem('ispopupshown')===null)
sessionStorage.setItem('ispopupshown','false');
//calling popup function if popup is not shown previously
if(sessionStorage.getItem('ispopupshown')==='false')
showPopup();
else
hidePopup();
//popup-functions
function showPopup() {
  popup.style.display = "block";
  document.getElementById("popup-effected-blur-area").classList.add("blur-filter");
}

function hidePopup() {
  popup.style.display = "none";
  popup.parentElement.style.zIndex='-9999';
  document.getElementById("popup-effected-blur-area").classList.remove("blur-filter");
  sessionStorage.setItem('ispopupshown','true');
}





