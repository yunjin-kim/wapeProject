import { _filter, _map } from "../fx.js";
//전역에 있는거 함수로 감싸주기
//언제 걸을끼요 날짜
const date = new Date();
const todayDates = new Date();
export const onToday = todayDates.getDate();

export const todayDay = date.getDay();
let todayDays = todayDay;
export const holeDay = ['월','화','수','목','금','토','일'];
let todayDate = date.getDate();
const thisYear = date.getFullYear();
const thisMonth = date.getMonth();
const thisLast = new Date(thisYear, thisMonth+1, 0)
export const lastMonthDate = new Date(thisYear, thisMonth, 0).getDate()
const thisLastDate = thisLast.getDate();

export const holeDayArr = [];
export const holeDateArr = [];

// function set
export function setDateDay(){
  for(let i = 0; i < 7; i++){
    todayDays--;
    if(todayDays === -1) todayDays = 6;
    holeDayArr.push(holeDay[todayDays]);
  
    if(todayDate > thisLastDate) todayDate = 1;
    holeDateArr.push(todayDate)
    todayDate++;
  }
}

//언제 걸을까요 클릭하면 background색
const CLICK_GREEN = 'backgroundGreen';
const DATE_SPAN = 'dateSpan';
const COLORED_BOX = 'coloredBox';

export function clickDate(e){
  if(e.target.classList.contains(COLORED_BOX)){

    if(e.target.classList.contains(CLICK_GREEN)){
      e.target.classList.remove(CLICK_GREEN)
    }
    else{
      e.target.classList.add(CLICK_GREEN)
    }
  }

  else if(e.target.classList.contains(DATE_SPAN)){
    
    if(e.target.parentNode.classList.contains(CLICK_GREEN)){
      e.target.parentNode.classList.remove(CLICK_GREEN)
    }
    else{
      e.target.parentNode.classList.add(CLICK_GREEN)
    }
  }
}

//몇시에 걸을까요 시 option값
export const hourArr = [];
  for(let i = 1; i < 24; i++){
    if(i < 10){
      i = "0"+i;
    }
    let option = document.createElement('option');
    option.textContent = i;
    hourArr.push(option);
  }

//몇시에 걸을까요 분 option값
export const minuteArr = [];
  for(let i = 1; i < 60; i++){
    if(i < 10){
      i = "0"+i;
    }
    let option = document.createElement('option');
    option.textContent = i;
    minuteArr.push(option);
  }

//걷기 알림 날짜 클릭
let reserveArr = []; 
export function setClickDateArr(e){
  if(e.target.classList.contains(COLORED_BOX)){
    //박스가 초록색이라면
    if(e.target.classList.contains(CLICK_GREEN)){
      reserveArr.filter((date, idx)=>{
        date === e.target.children[1].textContent ? reserveArr.splice(idx, 1) : " ";
      })
    }
    //박스가 초록색이 아닐마면
    else{
      reserveArr.push(e.target.children[1].textContent)
    }
  }
    // span 클릭하면 
  else if(e.target.classList.contains(DATE_SPAN)){
    //부모 박스가 초록색이면
    if(e.target.parentNode.classList.contains(CLICK_GREEN)){
      //요일 클릭
      if(e.target.parentNode.children[0]){
        e.target.parentNode.children[1].textContent
        reserveArr.filter((date, idx)=>{
          date === e.target.parentNode.children[1].textContent ? reserveArr.splice(idx, 1) : " ";
        });
      }
      //날짜 클릭
      else{
        reserveArr.filter((date, idx)=>{
          date === e.target.textContent ? reserveArr.splice(idx, 1) : " ";
        });
      }
    }
    //부모 박스가 초록색이 아니라면
    else{
      //요일 클릭
      if(e.target.parentNode.children[0]){
        reserveArr.push(e.target.parentNode.children[1].textContent)
      }
      //날짜 클릭
      else{
        reserveArr.push(e.target.textContent)
      }
    }
  }
}

//예약 기능
export function clickReserve(reserveHour, reserveMinute){
  const reserveObjArr = [];

  for(let reserveDate of reserveArr){
    let reserveObj = {
      date: reserveDate,
      hour: reserveHour,
      minute: reserveMinute
    }
    reserveObjArr.push(reserveObj);
  }
  reserveArr = [];

  let getReserveDate = localStorage.getItem("RESERVE_DATE");
  let parseGetReserveDate = JSON.parse(getReserveDate);
  console.log(parseGetReserveDate)
  if(parseGetReserveDate.length > 0){
    //오늘 이전 예약 
    let subLastReserve = _filter(
      d => d.date < onToday, parseGetReserveDate
    )
    //오늘 이후 예약
    let afterReserve = _filter(
      d => d.date >= onToday, parseGetReserveDate
    )

    console.log(subLastReserve)
    console.log(afterReserve)

    if(subLastReserve.length > 0){
        localStorage.setItem("RESERVE_DATE",JSON.stringify(afterReserve));
    }
    else{
      localStorage.setItem("RESERVE_DATE",JSON.stringify(parseGetReserveDate.concat(reserveObjArr)));
    }

  }
  else{
    localStorage.setItem("RESERVE_DATE",JSON.stringify(reserveObjArr));
  }
  
}

