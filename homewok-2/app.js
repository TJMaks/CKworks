const sourceJson = `{
  "event": {
    "title": "Ночь в музее",
    "date": "15 ноября, 18:30",
    "place": "Музей космонавтики, проспект Мира, 111",
    "description": "Вечерняя программа с выставкой и экскурсиями",
    "meeting": "Сбор: 18:30. Начало: 19:00."
  },
  "services": [
    { "id": "guide", "title": "  Экскурсия с гидом  ", "price": 500 },
    { "id": "audio", "title": "Аудиогид", "price": 350 },
    { "id": "catalog", "title": "Каталог выставки", "price": 250 }
  ]
}`;


const showProgramButton = document.querySelector('#show-program');
const programBlock = document.querySelector('#program');
const serviceForm = document.querySelector('#service-form');
const choiceError = document.querySelector('#choice-error');
const dataError = document.querySelector('#data-error');
const resultBlock = document.querySelector('#result');
const reportJson = document.querySelector('#report-json');
 
let data;
 
try {
  data = JSON.parse(sourceJson);
  serviceForm.hidden = false;
} catch (error) {
  dataError.textContent = 'Ошибка данных.';
  dataError.hidden = false;
  serviceForm.hidden = true;
}
 
function buildReport(services, guideChecked, audioChecked, catalogChecked) {
  const selected = {
    guide: guideChecked,
    audio: audioChecked,
    catalog: catalogChecked
  };
 
  const items = services
    .filter(function (service) {
      return selected[service.id];
    })
    .map(function (service) {
      const { title, price } = service;
      return { title: title.trim(), price: price };
    });
 
  const total = items.reduce(function (sum, item) {
    return sum + item.price;
  }, 0);
 
  return { count: items.length, total: total, items: items };
}
 
function onShowProgramClick() {
  if (!data) {
    return;
  }
  programBlock.innerHTML = data.event.meeting;
  programBlock.hidden = false;
}
 
function onFormSubmit(event) {
  event.preventDefault();
 
  if (!data) {
    return;
  }
 
  const guideChecked = document.querySelector('#guide').checked;
  const audioChecked = document.querySelector('#audio').checked;
  const catalogChecked = document.querySelector('#catalog').checked;
 
  if (!guideChecked && !audioChecked && !catalogChecked) {
    choiceError.textContent = 'Выберите хотя бы одну услугу.';
    choiceError.hidden = false;
    resultBlock.hidden = true;
    reportJson.hidden = true;
    return;
  }
 
  choiceError.hidden = true;
 
  const report = buildReport(data.services, guideChecked, audioChecked, catalogChecked);
 
  const titles = report.items.map(function (item) {
    return item.title;
  });
  resultBlock.innerHTML =
    'Выбрано услуг: ' + report.count + '<br>' +
    'Итого: ' + report.total + ' руб.<br>' +
    titles.join('<br>');
  resultBlock.hidden = false;
 
  const jsonString = JSON.stringify(report);
  JSON.parse(jsonString);
  reportJson.textContent = jsonString;
  reportJson.hidden = false;
}
 
showProgramButton.addEventListener('click', onShowProgramClick);
serviceForm.addEventListener('submit', onFormSubmit);
 
