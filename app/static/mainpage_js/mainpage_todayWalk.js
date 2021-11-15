import { date } from './mainpage_calendar.js';

const googleTodayStepCountUrl = "https://v1.nocodeapi.com/kimyunjun/fit/lHneRLggDPetxSfn/aggregatesDatasets?dataTypeName=steps_count&timePeriod=today&durationTime=hourly";
const $noTodayStepDataText = document.querySelector(".mainpage__today__main");

async function getTodayStepApi() {
  const response = await fetch(googleTodayStepCountUrl);
  const data = await response.json();
  console.log("API 호출")
  return data;
}

export async function getTodayStepData() {
  const data = await getTodayStepApi();

  if(data.steps_count.length > 0) {
    showTodayStepData(data.steps_count);
  }
  else {
    $noTodayStepDataText.textContent = "오늘 걸은 데이터가 없습니다";
  }
}

function showTodayStepData(stepData) {
  const $todayWalkWrap = document.querySelector(".mainpage__today__main");
  const $todayWalkLine = document.getElementById("mainpage__today__line");

  const walkLine = $todayWalkLine.getContext("2d");
  walkLine.beginPath();
  walkLine.lineWidth = 1;
  walkLine.strokeStyle = "gray";
  walkLine.moveTo(0, 107);

  $todayWalkWrap.style.width = `${stepData.length*100}px`;
  $todayWalkLine.style.width = `${stepData.length*90}px`;
  $todayWalkLine.style.height = "18vh";
  console.log(stepData.length)

  for(let i = 0; i < stepData.length; i++) {
    const stepDataDott = document.createElement('div');
    const dottStepText = document.createElement('span')
    const dottStartTimeText = document.createElement('span')
    const dottEndTimeText = document.createElement('span')
    stepDataDott.classList.add("stepDataDott");
    dottStepText.classList.add("dottStepText");
    dottStartTimeText.classList.add("dottStartTimeText");
    dottEndTimeText.classList.add("dottEndTimeText");
    dottStepText.innerText = `${stepData[i].value}걸음`;
    dottStartTimeText.innerText = `${stepData[i].startTime.substring(12, 20)}`;
    dottEndTimeText.innerText = `${stepData[i].endTime.substring(12, 20)}`;
    console.log(i)

    if(i%2 === 0) {
      stepDataDott.style.top = `${100}px`;
      dottStepText.style.top = `${86}px`;
      dottStartTimeText.style.top = `${110}px`;
      dottEndTimeText.style.top = `${120}px`;
      if(i > 0) {
        walkLine.quadraticCurveTo(i*70, 130, i*115, 46);
      }
      console.log("실행")
    } 
    else if(i%2 === 1) {
      stepDataDott.style.top = `${50}px`;
      dottStepText.style.top = `${40}px`;
      dottStartTimeText.style.top = `${60}px`;
      dottEndTimeText.style.top = `${70}px`;
      if(i < stepData.length - 1) {
        walkLine.quadraticCurveTo(i*70, 5, i*115, 107);
      }

      console.log("실행실행")
    } 
    stepDataDott.style.left = `${i*90}px`;
    dottStepText.style.left = `${i*90}px`;
    dottStartTimeText.style.left = `${i*90}px`;
    dottEndTimeText.style.left = `${i*90}px`;
    $noTodayStepDataText.append(stepDataDott, dottStepText, dottStartTimeText, dottEndTimeText);
  }
  walkLine.stroke();
}

export function showTodayWalkDate() {
  const $todayWalkDate = document.querySelector(".mainpage__today__title__date");
  $todayWalkDate.textContent = (`${date.getMonth()+1}월 ${date.getDate()}일`)
}