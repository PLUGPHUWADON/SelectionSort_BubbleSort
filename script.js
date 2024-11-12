const main = document.querySelector(".main");
const title = document.querySelector(".title");
const btn = document.querySelector(".btn");

const width = 10;
const height = 100;
let arrpoleheight = [];
let togglestatus = false;
let stop = false;
let stop2 = false;

function newprocess() {
    main.innerHTML = "";

    for (let i = 1 ; i <= 80 ; i++) {
        const r = Math.floor(Math.random() * 255) + 0;
        const g = Math.floor(Math.random() * 255) + 0;
        const b = Math.floor(Math.random() * 255) + 0;
        const randomheight = Math.floor(Math.random() * 600) + 1;
    
        const div = document.createElement("div");
        div.style.width = width + "px";
        div.style.height = randomheight + "px";
        div.style.background = `rgb(${r},${g},${b})`;
        div.style.display = "inline-block";
        div.className = "pole";
    
        main.appendChild(div);
        arrpoleheight.push({height:randomheight,dom:div});
    }
}

async function selectionsort(array) {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        // Find the minimum element in the unsorted part
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (array[j].height < array[minIndex].height) {
                minIndex = j;
            }
        }

        // Swap the found minimum element with the first element with 500ms delay
        if (minIndex !== i) {
            // Delay the swap operation
            if (stop) return;
            await new Promise(resolve => setTimeout(resolve,200));
            if (stop) return;
            // Swap the height values in the array
            [array[i].height, array[minIndex].height, array[i].dom, array[minIndex].dom] = [array[minIndex].height, array[i].height,array[minIndex].dom, array[i].dom];
            // Move the DOM elements according to the new order
            if (i !== minIndex) {
                main.innerHTML = '';  // ล้างคอนเทนเนอร์ออกก่อน
                array.forEach(item => main.appendChild(item.dom));  // เพิ่มทุก dom ตามลำดับใหม่
            }
        }
    }
}

async function bubbleSort(array) {
    const n = array.length;
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (array[i].height > array[i + 1].height) {
                // Swap elements with delay
                if (stop2) return;
                await new Promise(resolve => setTimeout(resolve, 10));
                if (stop2) return;
                [array[i].height, array[i + 1].height,array[i].dom, array[i + 1].dom] = [array[i + 1].height, array[i].height,array[i + 1].dom, array[i].dom];
                swapped = true;
                main.innerHTML = '';
                array.forEach(item => main.appendChild(item.dom));
            }
        }
    } while (swapped);
}

newprocess();
selectionsort(arrpoleheight);

btn.addEventListener("click",() => {
    arrpoleheight = [];
    newprocess();

    if (togglestatus == false) {
        stop = true;
        stop2 = false;
        bubbleSort(arrpoleheight);
        togglestatus = true;
        title.innerHTML = "Bubble Sort";
        btn.innerHTML = "Selection Sort";
    }
    else if (togglestatus == true) {
        stop = false;
        stop2 = true;
        selectionsort(arrpoleheight);
        togglestatus = false;
        title.innerHTML = "Selection Sort"
        btn.innerHTML = "Bubble Sort";
    }
});