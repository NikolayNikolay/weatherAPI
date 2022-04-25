const inpRadio = document.querySelectorAll('.radio-language__radio');
const langText = document.querySelector('.languages__text');
const langActiv = document.querySelector('.languages');
const formLang = document.querySelector('.languages__radio');
const reload = document.querySelector('.update');
// ========================================================================



inpRadio.forEach(function (elem) {
   if (elem.checked) {
      langText.textContent = elem.value;

   }
   elem.addEventListener("click", function (e) {
      if (elem.checked) {
         langText.textContent = elem.value;
      }
   });
});

langActiv.addEventListener("click", function (item) {
   if (langActiv.classList.contains('_active')) {
      langActiv.classList.remove('_active');
      formLang.classList.remove('_active');
   }
   else {
      langActiv.classList.add('_active');
      formLang.classList.add('_active');
   };
});
window.addEventListener("click", function (e) {
   const target = e.target;
   if (!target.closest('.languages') && !target.closest('.languages__radio')) {
      langActiv.classList.remove('_active');
      formLang.classList.remove('_active');
   }
   if (target.name == 'lang') {
      formLang.classList.remove('_active');
      langActiv.classList.remove('_active');
      console.log(1);
   }
   if (target.closest('.update')) {
      reload.classList.toggle('_active');
      this.setTimeout(function () {
         window.location.reload();
      }, 1000);
   }
});
// ==========блок с температурой================================================================================================
const tempInput = document.querySelectorAll('.checkbox__input');
const far = document.querySelector('.faring');
const cel = document.querySelector('.celsiy');
const tempLabelone = document.querySelector('.c_1');
const tempLabeltwo = document.querySelector('.c_2');
let imperialNum = document.querySelectorAll('.imperial-num');
let units = "metric";
cel.disabled = true;
tempInput.forEach(function (elem) {
   if (elem.checked) {
      tempLabeltwo.classList.add('_active');
   }
   elem.addEventListener("click", function (e) {
      let target = e.target;
      if (target.getAttribute('id') == 'c_1') {
         tempLabelone.classList.add('_active');
         tempLabeltwo.classList.remove('_active');
      }
      else if (target.getAttribute('id') == 'c_2') {
         tempLabelone.classList.remove('_active');
         tempLabeltwo.classList.add('_active');
      }
      if (elem.checked && elem.getAttribute('id') == 'c_1') {
         imperialNum.forEach((elem) => {
            let sum = Math.round((elem.textContent * 9 / 5) + 32);
            elem.textContent = sum;
         })
         units = 'imperial';
         console.log(elem.getAttribute('id'));
         far.disabled = true;
         cel.disabled = false;
      }
      else if (elem.checked && elem.getAttribute('id') == 'c_2') {
         imperialNum.forEach((elem) => {
            let sum = Math.round((elem.textContent - 32) * 5 / 9);
            elem.textContent = sum;
         })
         units = "metric";
         cel.disabled = true;
         far.disabled = false;
      }
   });
});