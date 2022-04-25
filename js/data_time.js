const mainData = document.querySelector('.data-dey');
let mainTime = document.querySelector('.data-time');
let dayDate = new Date();
let monthDay = dayDate.toDateString();
let timeMonth = dayDate.toLocaleTimeString().slice(0, -3);

mainData.textContent = `${monthDay}`;
mainTime.textContent = `${timeMonth}`;

function name1() {
   let dataTime = new Date();
   let timeDay = dataTime.toLocaleTimeString().slice(0, -3);
   mainTime.textContent = `${timeDay}`;
   console.log(1);
}
setInterval(name1, 60000);
// .slice(0, -3);