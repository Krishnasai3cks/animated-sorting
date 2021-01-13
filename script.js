let canvas = document.getElementById("canvas");
let speedButton = document.getElementById("visualSpeed");

let ctx = canvas.getContext("2d");
let width = 500,
    height = 400;
let barWidth = 3,
    oneBarUnit = 5;
let startBottom = height - 20,
    startLeft = 20;
let tick,
    arr = [];
let visualSpeed = 50; //The lower the value faster is the rendering
// slow = 50 medium = 10 fast = 5;
let arrayLength = 58;
for (let i = 0; i < arrayLength; i++) {
    arr.push(Math.floor(Math.random() * arrayLength));
}
let start = 30;
draw();
speedButton.addEventListener("change", () => {
    if (speedButton.value == "slow") {
        visualSpeed = 50;
    } else if (speedButton.value == "medium") {
        visualSpeed = 10;
    } else if (speedButton.value == "fast") {
        visualSpeed = 5;
    }
});

function shuffle() {
    arr = [];
    for (let i = 0; i < 58; i++) {
        arr.push(1 + Math.floor(Math.random() * 58));
    }
    draw();
}
async function sort() {
    let value = document.getElementById("algorithms").value;
    switch (value) {
        case "quick sort":
            await quickSort(arr, 0, arr.length - 1);
            break;
        case "bubble sort":
            await bubbleSort();
            break;
        case "selection sort":
            await selectionSort();
            break;
        case "insertion sort":
            await insertionSort();
            break;
        default:
            await quickSort();
            break;
    }
}
async function swap(i, j, items) {
    await sleep(visualSpeed);
    let temp;
    if (items) {
        temp = items[i];
        items[i] = items[j];
        items[j] = temp;
    } else {
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
async function bubbleSort(a) {
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                swapped = true;
                await swap(i, i + 1);
                draw();
            }
        }
    } while (swapped);
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    start = startLeft + 5;
    ctx.fillStyle = "white";
    arr.forEach((data) => {
        ctx.fillRect(
            start,
            startBottom - data * oneBarUnit,
            barWidth,
            data * oneBarUnit
        );
        start += 5;
    });
    //draw both axes
    ctx.fillStyle = "white";
    ctx.fillRect(startLeft, 0, 1, height);
    ctx.fillRect(0, startBottom, width, 1);
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)], //middle element
        i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            await swap(i, j, items); //sawpping two elements
            draw();
            i++;
            j--;
        }
    }
    return i;
}

async function quickSort(items, left, right) {
    var index;
    if (items && items.length > 1) {
        index = await partition(items, left, right); //index returned from partition
        if (left < index - 1) {
            //more elements on the left side of the pivot
            await quickSort(items, left, index - 1);
        }
        if (index < right) {
            //more elements on the right side of the pivot
            await quickSort(items, index, right);
        }
    }
    return items;
}

async function selectionSort() {
    for (let i = 0; i < arrayLength; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        for (let j = i + 1; j < arrayLength; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min != i) {
            // Swapping the elements
            await swap(i, min);
            draw();
        }
    }
}

async function insertionSort() {
    for (let i = 1; i < arrayLength; i++) {
        // Choosing the first element in our unsorted subarray
        let current = arr[i];
        // The last element of our sorted subarray
        let j = i - 1;
        while (j > -1 && current < arr[j]) {
            arr[j + 1] = arr[j];
            await sleep(visualSpeed);
            draw();
            j--;
        }
        arr[j + 1] = current;
    }
}