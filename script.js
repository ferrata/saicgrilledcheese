const draggables = document.querySelectorAll('.draggable')
const containers  =  document.querySelectorAll('.container')

refreshCheckboxes();

function getFileNameFromUrl(url) {
  // return a file name from URL, e.g. http://127.0.0.1:8080/images/01b_pan_on.png -> 01b_pan_on.png
  const elements = url.split("/");
  return elements[elements.length - 1];
}

function getStepFromFileName(fileName) {
  // return a step name from a file name, e.g. 01b_pan_on.png -> 01b
  return fileName.split("_")[0];
}

function getImagesOrder() {
  // go through all <img> tags on the page and collect corresponsing step names
  const order = [];
  document.querySelectorAll("img").forEach((element) => {
    const fileName = getFileNameFromUrl(element.src);
    order.push(fileName);
  });
  return order;
}

function refreshCheckboxes() {
  // get images order and the checklist order
  // (we are assuming that the checklist order is the correct order)
  const images = getImagesOrder();
  const checklistItems = document.querySelectorAll(".cbox");

  // compare image on each position with a corresponding checkbox, 
  // update each checkbox with checked true/false
  images.forEach((imageName, index) => {
    const imageStep = getStepFromFileName(imageName);
    const shouldBeChecked = imageStep === checklistItems[index].id;
    checklistItems[index].checked = shouldBeChecked;
  });
}

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    // when drag is complete, refresh all the checkboxes
    draggable.classList.remove("dragging");
    refreshCheckboxes();
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    // "dragover" event is empty, but it is needed for "drop" to be possibe
    e.preventDefault();
  });
  
  container.addEventListener("drop", (e) => {
    // "drop" event does the job of swapping images between containers
    e.preventDefault();

    const draggedFrom = document.querySelector(".dragging");
    const draggedTo = e.target;

    const fromContainer = draggedFrom.parentNode;
    const toContainer = draggedTo.parentNode;

    fromContainer.removeChild(draggedFrom);
    toContainer.removeChild(draggedTo);

    fromContainer.appendChild(draggedTo);
    toContainer.appendChild(draggedFrom);
  });
});

function uncheckAll() {
  document
    .querySelectorAll('input[type="checkbox"]')
    .forEach((el) => (el.checked = false));
}

document.querySelector("button").addEventListener("click", uncheckAll);
