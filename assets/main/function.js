export { displayList , updateButtons}

let btnPreview = document.querySelector('.preview');
let btnNext = document.querySelector('.next');
const displayList = (list, indiceInitiale, indiceDePage) => {
    for (let index = indiceInitiale; index < indiceInitiale + indiceDePage; index++) {
        if (list[index]) {
            list[index].style.display = 'flex';
        }
    }
}
const updateButtons = (list, indiceDePage ,pageActuel, totalPages ) => {
    if (list.length%indiceDePage === 0) {
            totalPages =  Math.trunc(list.length / indiceDePage); 
        }
    else{
        totalPages =  Math.trunc(list.length / indiceDePage) + 1; 
    }
    
    if (pageActuel === 1 ) {
        btnPreview.disabled = true; 
    } else {
        btnPreview.disabled = false; 
    }

    if (pageActuel === totalPages ) { 
        btnNext.disabled = true;
        console.log('fin');
    } else {
        btnNext.disabled = false;
    }
}








