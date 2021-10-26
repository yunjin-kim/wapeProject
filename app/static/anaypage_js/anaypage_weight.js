//목표 체중 모달
const $noWeightGoalDiv = document.querySelector(".anaypage__noweight__accure");

export function showGoalWeihgtModal(e){
  const goalWeightModalDiv = document.createElement('div');
  goalWeightModalDiv.classList.add("goalWeightModal")

  const goalWeightTitle = document.createElement('h3');
  goalWeightTitle.classList.add("goalWeightModalTitle");
  goalWeightTitle.textContent = "목표 체중"
  goalWeightModalDiv.append(goalWeightTitle);

  const goalWeightModalClose = document.createElement('button');
  goalWeightModalClose.textContent = "X";
  goalWeightModalClose.classList.add("goalWeightModalClose")
  goalWeightModalDiv.append(goalWeightModalClose);
  goalWeightModalClose.addEventListener('click',()=>{
    goalWeightModalDiv.remove();
  })

  let goalWeight;
  const goalWeightInput = document.createElement('input');
  goalWeightInput.classList.add("goalWeightInput");
  goalWeightInput.setAttribute('type','number');
  goalWeightModalDiv.append(goalWeightInput);
  goalWeightInput.addEventListener('change', (e)=>{
    goalWeight = e.target.value;
  })

  const goalWeightSubmitBtn = document.createElement('button');
  goalWeightSubmitBtn.classList.add("goalWeightSubmitBtn");
  goalWeightSubmitBtn.textContent = "목표 설정";
  goalWeightSubmitBtn.addEventListener('click', ()=>{
    localStorage.setItem("STEP_GOAL_WEIGHT", goalWeight);
    goalWeightModalDiv.remove();
    $noWeightGoalDiv.classList.add("hiddenDiv");
    setGoalWeight();
  });
  goalWeightModalDiv.append(goalWeightSubmitBtn);

  e.target.parentNode.parentNode.parentNode.parentNode.append(goalWeightModalDiv);
}

//목표 체중 설정
export function setGoalWeight(){
  const $goalWeight = document.querySelector(".goalWeight");
  const $goalWeihgtDiv = document.querySelector(".anaypage__weight__accure");
  let getGoalWeight = localStorage.getItem("STEP_GOAL_WEIGHT");
  let parseGoalWeight = JSON.parse(getGoalWeight);

  if(parseGoalWeight){
    $goalWeihgtDiv.classList.remove("hiddenDiv");
    $goalWeight.textContent = `${parseGoalWeight}kg`;
  }
  else{
    $noWeightGoalDiv.classList.remove("hiddenDiv");
    $goalWeihgtDiv.classList.add("hiddenDiv");
    $noWeightGoalDiv.innerHTML = `<span class="noWeightGoal">목표 체중을 설정해주세요</span>`;
  }
}

//현재 체중 모달
const $noWeightDiv = document.querySelector(".anaypage__noweight__current");
export function showWeihgtModal(e){
  const measureDay = new Date().getDate();

  const weightModalDiv = document.createElement('div');
  weightModalDiv.classList.add("weightModal")

  const weightTitle = document.createElement('h3');
  weightTitle.classList.add("weightModalTitle");
  weightTitle.textContent = "현재 체중"
  weightModalDiv.append(weightTitle);

  const weightModalClose = document.createElement('button');
  weightModalClose.textContent = "X";
  weightModalClose.classList.add("weightModalClose")
  weightModalDiv.append(weightModalClose);
  weightModalClose.addEventListener('click',()=>{
    weightModalDiv.remove();
  })

  let currnetWeight
  const weightInput = document.createElement('input');
  weightInput.classList.add("weightInput");
  weightInput.setAttribute('type','number');
  weightModalDiv.append(weightInput);
  weightInput.addEventListener('change', (e)=>{
    currnetWeight = e.target.value;
  })

  const weightSubmitBtn = document.createElement('button');
  weightSubmitBtn.classList.add("weightSubmitBtn");
  weightSubmitBtn.textContent = "현재 체중";

  weightSubmitBtn.addEventListener('click', ()=>{
    let getTotalWeightData = localStorage.getItem("STEP_CURRENT_WEIGHT");
    let parseTotalWeightData = JSON.parse(getTotalWeightData);

  if(parseTotalWeightData){
    if(parseTotalWeightData[parseTotalWeightData.length - 2] === measureDay){
      parseTotalWeightData.pop()
      parseTotalWeightData.pop()
      localStorage.setItem("STEP_CURRENT_WEIGHT", JSON.stringify(parseTotalWeightData.concat([measureDay, currnetWeight])));
    }
    else{
      localStorage.setItem("STEP_CURRENT_WEIGHT", JSON.stringify(parseTotalWeightData.concat([measureDay, currnetWeight])));
    }
  }
  else{
    localStorage.setItem("STEP_CURRENT_WEIGHT", JSON.stringify([measureDay, currnetWeight]));
  }
  weightModalDiv.remove();
  $noWeightDiv.classList.add("hiddenDiv");
  setCurrentWeight();
  });

  weightModalDiv.append(weightSubmitBtn);

  e.target.parentNode.parentNode.parentNode.parentNode.append(weightModalDiv);
}

//현재 체중 설정
export function setCurrentWeight(){
  const $currnetWeight= document.querySelector(".currnetWeight");
  const $weightDiv = document.querySelector(".anaypage__weight__current");
  let getWeight = localStorage.getItem("STEP_CURRENT_WEIGHT");
  let parseWeight = JSON.parse(getWeight);

  if(parseWeight){
    $weightDiv.classList.remove("hiddenDiv");
    $currnetWeight.textContent = `${parseWeight[parseWeight.length-1]}kg`;
  }
  else{
    $noWeightDiv.classList.remove("hiddenDiv");
    $weightDiv.classList.add("hiddenDiv");
    $noWeightDiv.innerHTML = `<span class="noWeight">현재 체중을 적어주세요</span>`;
  }
}

export function setuntilGoalWeight(){
  let getWeight = localStorage.getItem("STEP_GOAL_WEIGHT");
  let parseWeight = JSON.parse(getWeight);
  let getTotalWeightData = localStorage.getItem("STEP_CURRENT_WEIGHT");
  let parseTotalWeightData = JSON.parse(getTotalWeightData);

  return parseTotalWeightData[parseTotalWeightData.length-1]-parseWeight;
}
//데이터에 해당날짜가 없다면 해당날짷고 빈 무게 값 넣어주기
export const weightDataArr = [[], [], [], []]

function rangeWeightData(){
  let getTotalWeightData = localStorage.getItem("STEP_CURRENT_WEIGHT");
  let parseTotalWeightData = JSON.parse(getTotalWeightData);
  let reverseWeightData = parseTotalWeightData.reverse();

//한 배열당 14개씩 '몸무게', 날짜


  let weightDataArrNum = 0;
  for(let i = 0; i < 56; i++){
    if(!reverseWeightData[i]) reverseWeightData[i] = "";
      weightDataArr[weightDataArrNum].push(reverseWeightData[i]);
      if(weightDataArr[weightDataArrNum].length > 13) weightDataArrNum++;
      if(weightDataArrNum === 4) break;
  }
}
rangeWeightData()