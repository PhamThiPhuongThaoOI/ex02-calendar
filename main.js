const calendar = document.querySelector(".calendar");
const monthYear = calendar.querySelector(".month-year");
const daysContainer = calendar.querySelector(".calendar-body");
const weekdaysHeader = calendar.querySelector(".weekdays");
const prevBtn = calendar.querySelector(".prev");
const nextBtn = calendar.querySelector(".next");

let selectedDate = new Date();
const CALENDAR_BODY_TYPE = {
  DATE: "DATE",
  MONTH: "MONTH",
  YEAR: "YEAR",
};
let calendarBodyType = CALENDAR_BODY_TYPE.DATE;


// Thêm các phần tử month-display và year-display vào month-year
const monthDisplay = document.createElement('span');
monthDisplay.classList.add('month-display');
const yearDisplay = document.createElement('span');
yearDisplay.classList.add('year-display');

monthYear.appendChild(monthDisplay);
monthYear.appendChild(yearDisplay);

function getMonth() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  
  btnMonths = [];

  for (let i = 0; i < months.length; i++) {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    btnMonths.push(
      `<div class="${currentYear === selectedDate.getFullYear() && currentMonth === i? "this-month highlight-month" : ""} month-of-year">${
        months[i]
      }</div>`
    );
  }

  return btnMonths;
}

function getDate() {
  selectedDate.setDate(1);

  const month = selectedDate.toLocaleString("en", { month: "long" });
  const year = selectedDate.getFullYear();


  if (calendarBodyType === CALENDAR_BODY_TYPE.DATE) {
    monthDisplay.textContent = month;
    yearDisplay.textContent = year;
  } else if (calendarBodyType === CALENDAR_BODY_TYPE.MONTH) {
    monthDisplay.textContent = '';
    yearDisplay.textContent = year;
  } else if (calendarBodyType === CALENDAR_BODY_TYPE.YEAR) {
    const startYear = Math.floor(year / 10) * 10;
    const endYear = startYear + 9;
    monthDisplay.textContent = '';
    yearDisplay.textContent = `${startYear}-${endYear}`;
  }
  

  
  const lastDay = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayIndex = selectedDate.getDay();
  const lastDayIndex = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDay();
  const prevLastDay = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    0
  ).getDate();

  const days = [
    "<div class='day-of-week'>Su</div>",
    "<div class='day-of-week'>Mo</div>",
    "<div class='day-of-week'>Tu</div>",
    "<div class='day-of-week'>We</div>",
    "<div class='day-of-week'>Th</div>",
    "<div class='day-of-week'>Fr</div>",
    "<div class='day-of-week'>Sa</div>",
  ];

  for (let x = firstDayIndex; x > 0; x--) {
    days.push(`<div class="date prev-date" >${prevLastDay - x + 1}</div>`);
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      selectedDate.getMonth() === new Date().getMonth() &&
      selectedDate.getFullYear() === new Date().getFullYear()
    ) {
      days.push(`<div class="date today" >${i}</div>`);
    } else {
      days.push(`<div class="date">${i}</div>`);
    }
  }

  for (let j = 1; j <= 7 - lastDayIndex - 1; j++) {
    days.push(`<div class="date next-date">${j}</div>`);
  }

  return days;
}

// thêm function cho năm

function getYears() {
  const years = [];
  const currentYear = selectedDate.getFullYear();
  const startYear = Math.floor(currentYear / 10) * 10;

  for (let i = startYear; i < startYear + 10; i++) {
    years.push(
      `<div class="${i === currentYear ? "this-year highlight-year" : ""} year-of-decade">${i}</div>`
    );
  }
  return years;
}

function renderCalendar() {
  if (calendarBodyType === CALENDAR_BODY_TYPE.DATE) {
    daysContainer.innerHTML = getDate().join("");
  } else if (calendarBodyType === CALENDAR_BODY_TYPE.MONTH) {
    console.log(getMonth())
    daysContainer.innerHTML= ''
    daysContainer.innerHTML = getMonth().join("");
  } else if (calendarBodyType === CALENDAR_BODY_TYPE.YEAR) {
    daysContainer.innerHTML = getYears().join("");
  }

  updateHeader();
  // if (calendarBodyType === CALENDAR_BODY_TYPE.MONTH) {
  //   addNewHighlightForMonth();
  // }
  removeOldHighlights();
  addNewHighlight();
}

function updateHeader() {
  const month = selectedDate.toLocaleString("en", { month: "long" });
  const year = selectedDate.getFullYear();
  if (calendarBodyType === CALENDAR_BODY_TYPE.DATE) {
    monthDisplay.textContent = month;
    yearDisplay.textContent = year;
  } else if (calendarBodyType === CALENDAR_BODY_TYPE.MONTH) {
    monthDisplay.textContent = '';
    yearDisplay.textContent = year;
  } else if (calendarBodyType === CALENDAR_BODY_TYPE.YEAR) {
    const startYear = Math.floor(year / 10) * 10;
    const endYear = startYear + 9;
    monthDisplay.textContent = '';
    yearDisplay.textContent = `${startYear}-${endYear}`;
  }

}

function removeOldHighlights() {
  const oldHighlightMonth = daysContainer.querySelector('.highlight-month');
  const oldHighlightYear = daysContainer.querySelector('.highlight-year');
  if (oldHighlightMonth) oldHighlightMonth.classList.remove('highlight-month');
  if (oldHighlightYear) oldHighlightYear.classList.remove('highlight-year');
}

function addNewHighlight() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  if (calendarBodyType === CALENDAR_BODY_TYPE.MONTH) {
    const monthElements = daysContainer.querySelectorAll('.month-of-year');
    if(year == currentYear) {
      monthElements[currentMonth].classList.add('highlight-month');
    }
  } else if (calendarBodyType === CALENDAR_BODY_TYPE.YEAR) {
    const yearElements = daysContainer.querySelectorAll('.year-of-decade');
    yearElements.forEach(yearElement => {
      if (parseInt(yearElement.textContent) === currentYear) {
        yearElement.classList.add('highlight-year');
      }
    });
  }
}

prevBtn.addEventListener("click", () => {
  if (calendarBodyType === CALENDAR_BODY_TYPE.DATE) {
    selectedDate.setMonth(selectedDate.getMonth() - 1);
  } else if (calendarBodyType === CALENDAR_BODY_TYPE.MONTH) {
    selectedDate.setFullYear(selectedDate.getFullYear() - 1);
  } else if (calendarBodyType === CALENDAR_BODY_TYPE.YEAR) {
    selectedDate.setFullYear(selectedDate.getFullYear() - 10); // Giảm 10 năm khi ở chế độ YEAR
  }
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  if (calendarBodyType === CALENDAR_BODY_TYPE.DATE) {
    selectedDate.setMonth(selectedDate.getMonth() + 1);
  } else if (calendarBodyType === CALENDAR_BODY_TYPE.MONTH) {
    selectedDate.setFullYear(selectedDate.getFullYear() + 1);
  } else if (calendarBodyType === CALENDAR_BODY_TYPE.YEAR) {
    selectedDate.setFullYear(selectedDate.getFullYear() + 10); // Tăng 10 năm khi ở chế độ YEAR
  }
  renderCalendar();
});

monthYear.addEventListener("click", () => {
  if (calendarBodyType === CALENDAR_BODY_TYPE.DATE) {
    calendarBodyType = CALENDAR_BODY_TYPE.MONTH;
  } else if (calendarBodyType === CALENDAR_BODY_TYPE.MONTH) {
    calendarBodyType = CALENDAR_BODY_TYPE.YEAR; // Thêm chế độ chuyển sang YEAR
  } else if (calendarBodyType === CALENDAR_BODY_TYPE.YEAR) {
    calendarBodyType = CALENDAR_BODY_TYPE.DATE;
  }
  renderCalendar();
});


renderCalendar();
daysContainer.addEventListener("click", (e) => {
  const isClickOnDateButton = e.target.className.split(" ").includes("date");
  if (isClickOnDateButton) {
    const previouslySelected = daysContainer.querySelector(".selected");

    if (previouslySelected) {
      previouslySelected.classList.remove("selected");
    }

    e.target.classList.add("selected");
  }


});
daysContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains('month-of-year')) {
    removeOldHighlights();
    const selectedMonth = e.target.textContent;
    const monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(selectedMonth);

    selectedDate.setMonth(monthIndex);
    calendarBodyType = CALENDAR_BODY_TYPE.DATE;
    renderCalendar();

  } else if (e.target.classList.contains('year-of-decade')) {
    removeOldHighlights();
    const selectedYear = parseInt(e.target.textContent);

    selectedDate.setFullYear(selectedYear);
    calendarBodyType = CALENDAR_BODY_TYPE.MONTH;
    renderCalendar();
  }
});

renderCalendar();

function updateDateTime() {
  const dateTimeElement = document.getElementById('current-date-time');
  const now = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  dateTimeElement.textContent = now.toLocaleDateString('en-VN', options);
}

// Gọi hàm updateDateTime mỗi giây
setInterval(updateDateTime, 1000);

updateDateTime(); 

document.getElementById('toggle-calendar').addEventListener('click', () => {
  const calendar = document.getElementById('calendar01');
  calendar.classList.toggle('hidden');
  console.log("hello world")



  abc
  xyz
});

