const draggables = document.querySelectorAll('.draggable')
const containers  =  document.querySelectorAll('.container')

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })

containers.forEach(container => {
    container.addEventListener('dragover', e => {
    console.log('drag over');
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector('.dragging');
    container.appendChild(draggable);
    })
})

})

function getDragAfterElement(container, y) {
   const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

   return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        console.log(box)
        console.log(offset)

        if (offset < 0 && offset> closest.offset) {
            return { offset: offset, element: child } 
        } else {
               return closest
            }
       

   }, {offset: Number.NEGATIVE_INFINITY}).element
}

function uncheckAll() {
    document.querySelectorAll('input[type="checkbox"]')
      .forEach(el => el.checked = false);
  }
  
  document.querySelector('button').addEventListener('click', uncheckAll)

  const pictures = document.querySelectorAll('.picture');
  pictures.forEach(picture => {
    picture.addEventListener('drag', checkOrder);
  
  });

  // Get all the images and the checklist
const images = document.querySelectorAll('.image-container img');
const checklistItems = document.querySelectorAll('.checklist li');

// Add drag and drop functionality to each image
images.forEach((image) => {
  // Set the data that will be transferred during the drag
  image.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
  });
  
  // Prevent default behavior for dragover and drop events
  image.addEventListener('dragover', (event) => {
    event.preventDefault();
  });
  
  image.addEventListener('drop', (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(id);
    const dropzone = event.target.closest('.image-container');
    const checklistItem = checklistItems[id.charAt(id.length-1)-1];
    
    // Check if the image is being dropped in the appropriate location
    if (dropzone === image.parentElement) {
      dropzone.classList.add('dropzone');
      dropzone.appendChild(draggableElement);
      checklistItem.style.color = 'green';
      checklistItem.innerHTML += ' &#10004;';
    } else {
      alert('Wrong location!');
    }
  });
});

const correctOrder = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6'];

const checkboxes = document.querySelectorAll('.checkbox');
