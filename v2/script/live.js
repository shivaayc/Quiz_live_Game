// !!! Very Important- question must be in tempalate ex- ':' is necessary just after Qno. . I used QQ and qqa,qqb,qqc,qqd to separate question and options.
var Qdata = [
    "Q1: Find q1 and Scan QR code near the place as shown in the following image:",
    "Q2: Find q2 and Scan QR code near the place as shown in the following image:",
    "Q3: Find q3 and Scan QR code near the place as shown in the following image:"
  ];
  var Adata = [
    "Answer of Kedernath Live Quiz Q1",
    "Answer of Kedernath Live Quiz Q2",
    "Answer of Kedernath Live Quiz Q3"
  ];
  
  //Variables
  const question = document.getElementById("question");
  const qno = document.getElementById("q-no");
  const qImg =document.getElementById('q-img');
  const scannedValue = document.getElementById('outputData');
  var correctOption;
  const answered = new Set();
  const correctanswered = new Set();

  
  //Iterating between questions
  function iterateQuestion(index) {
    qno.innerText = Qdata[index].substring(0, Qdata[index].indexOf(":") + 1);
    question.innerText = Qdata[index].substring(Qdata[index].indexOf(":") + 1);
    correctOption = Adata[index];
    qImg.src='images/live-q'+qno.innerText.substring(1,2)+'.jpg';
    scannedValue.innerText='';
  }
  
  var indexCounter = 0;
  iterateQuestion(0);
  
  
  document.getElementById("prev-btn").addEventListener("click", () => {
    if (indexCounter === 0)
      return;
    else {
      resetColors();
      iterateQuestion(--indexCounter);
      if (answered.has(qno.innerText)) {
        document.getElementById("check-btn").disabled = true;
        document.getElementById("check-btn").innerText = 'Answered';
      }
    }
  });
  document.getElementById("next-btn").addEventListener("click", () => {
  
    if (indexCounter === (Qdata.length - 1))
      return;
    else {
      resetColors();
      iterateQuestion(++indexCounter);
  
      if (answered.has(qno.innerText)) {
        document.getElementById("check-btn").disabled = true;
        document.getElementById("check-btn").innerText = 'Answered';
      }
      
    }
  });
  
  
  document.getElementById("check-btn").addEventListener("click", () => {
    var selectedValue = scannedValue.innerText.trim();
    var correctValue = correctOption.trim();

    if (correctValue === selectedValue) {
    //   document.querySelector("label[for=" + selectedOption.id + "]").style.background = 'green';
    //display success popup here
      correctanswered.add(qno.innerText);
    }
    else {
    //display error popup here

    //   document.querySelector("label[for=" + selectedOption.id + "]").style.background = 'red';
    //   document.querySelector("label[for=option-" + correctValue[0] + "]").style.background = 'green';
    }
    answered.add(qno.innerText);
    document.getElementById("check-btn").disabled = true;
    document.getElementById("check-btn").innerText = 'Answered';
  });
  
  function resetColors() {
    document.getElementById("check-btn").disabled = false;
    document.getElementById("check-btn").innerText = 'Check';
   
  }
  
  
  
  document.getElementById("submit-btn").addEventListener("click", () => {
    document.querySelector('main').style.display = 'none';
    document.getElementById('score-window').style.display = 'block';
    //Correct list Rendering
    let correctList = [...correctanswered];
    let correctAnswers = correctList.reduce((ans, value) => {
      ans = ans + value + ", ";
      return ans;
    }, '');
    if (correctList.length === 0)
      document.getElementById("correct-answers").innerText = "None";
    else
      document.getElementById("correct-answers").innerText = (correctAnswers.substring(0, correctAnswers.lastIndexOf(','))).replaceAll(':', '');
  
    //Incorrect list Rendering
    let incorrectList = [...([...answered].filter(x => !correctanswered.has(x)))];
    let incorrectAnswers = incorrectList.reduce((ans, value) => {
      ans = ans + value + ", ";
      return ans;
    }, '');
    if (incorrectList.length === 0)
      document.getElementById("incorrect-answers").innerText = "None";
    else
      document.getElementById("incorrect-answers").innerText = (incorrectAnswers.substring(0, incorrectAnswers.lastIndexOf(','))).replaceAll(':', '');
  
    //Coins Rendering
    const coins = 2 * (correctanswered.size);
    document.getElementById("coins-earned").innerText = coins;
    
  });
    