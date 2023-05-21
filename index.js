let myLeads = [];
let oldLeads = [];
let saveButton = document.getElementById("btn-save");
const text = document.getElementById("input-el");
const button = document.getElementById("btn");
const ulEL = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const delButton = document.getElementById("btn-del");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li>
      <a target='blank' href='${leads[i]}'>
      ${leads[i]}
      </a>
      </li>`;
  }
  ulEL.innerHTML = listItems;
}

button.addEventListener("click", (event) => {
  myLeads.push(text.value);
  text.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

saveButton.addEventListener("click", (event) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

delButton.addEventListener("dblclick", (event) => {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
