const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        // console.log('drag start');
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        // console.log('drag start');
        draggable.classList.remove('dragging');
    });
});

containers.forEach(container => {
    container.addEventListener('dragover', (e) => {
        // To get the dropping cursor, we do
        event.preventDefault();

        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        if( afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    });
});

// Required to insert the div between any other divs of a container.
// y: the position after which we add the draggable element. 
function getDragAfterElement(container, y) {
    // 1. get all the elements for the container, excluding the element we are dragging
    // 2. spread operator, converts it to a Array and store result in dra
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging')];

    // loops through all the elements and we position the dragging element after the "y" position.
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}