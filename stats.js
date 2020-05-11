document.addEventListener( 'DOMContentLoaded',
    () => {
        const caclBtn = document.getElementById('calculate');
        caclBtn.addEventListener('click', flowControl);

        const clearBtn = document.getElementById('clear');
        clearBtn.addEventListener('click', clearPad);

    }
)

function validate(textInput) {

    if (!textInput.includes(',')) {
        return false;
    }

    if (textInput.includes(',') && textInput.length === 1) {
        return false;
    }

    if (textInput.charAt(textInput.length-1) === ',' || textInput.charAt(0) === ',') {
        return false;
    }

    let numListInput = textInput.split(',');
    for (let i=0; i <numListInput.length; i++) {
        if(isNaN(numListInput[i])) {
            return false;
        }
     }
     return true;
}

function flowControl() {

    const numList = document.getElementById('num-input').value;
    const dataBlock = document.getElementById('data');

    if(validate(numList)) {

        let numListInput = document.getElementById('num-input').value.split(',');
        const dataArr = cleanData(numListInput);
        dataArr.sort();

        let mean = calcMean(dataArr); 
        let median = calcMedian(dataArr);
        let sumDiffFromMean = calcSqDiffFromMean(dataArr, mean);
        let standardDeviation = calcStandardDeviation(sumDiffFromMean, dataArr.length);
        let resultBlock = createResultElement(numListInput, mean, median, standardDeviation);
        dataBlock.prepend(resultBlock);
    }
    else {
        let errorBlock = createErrorElement();
        dataBlock.prepend(errorBlock);
    }
}

function cleanData(arr) {
    return  arr.map( (x) => parseFloat(x));
}

function sumArray(arr) {
    return arr.reduce( (total, x)=> total +x);
}

function calcMean(arr) {
    return sumArray(arr) / arr.length;
}

function calcMedian(arr) {

    let isEven = arr.length%2 == 0;

    if (isEven) {
        let mid= arr.length/2 - 1;
        return (calcMean([arr[mid], arr[mid + 1]]));
    }
    else {
        let mid = Math.ceil(arr.length/2)-1;
        return arr[mid];
    }
}

function calcSqDiffFromMean(arr, mean) {
    let sqDiffFromMeanArr =  arr.map( (x)=> Math.pow(x-mean,2) );
    return sumArray(sqDiffFromMeanArr);
}

function calcStandardDeviation(sumDiffFromMean, sampleSize) {

    let standardDeviation = {
        sample : 0,
        population : 0
    };

    standardDeviation.sample = Math.sqrt(sumDiffFromMean / (sampleSize - 1));
    standardDeviation.population = Math.sqrt(sumDiffFromMean / (sampleSize));

    return standardDeviation;
}

function createResultElement(dataSet, mean, median, standardDeviation) {

    let elements = [ mean, median, standardDeviation.sample, standardDeviation.population];
    let elementsDesc = [ 'Mean: ', 'Median: ', 'Sample Standard Deviation: ', 'Population Standard Deviation: '];

    const resultsBlock = document.createElement('div');

    const data = document.createElement('p');
    let dataSetStr = 'Data: ' + dataSet.toString();
    data.innerText = dataSetStr;
    resultsBlock.appendChild(data);

    for (let i=0; i < elements.length; i++) {

        const result = document.createElement('p');
        result.innerText = elementsDesc[i] + elements[i].toFixed(3);
        resultsBlock.appendChild(result);
    }

    const divider = document.createElement('hr');
    divider.classList.add('divider');
    resultsBlock.appendChild(divider);
    resultsBlock.classList.add('goodResults');

    return resultsBlock;
}

function createErrorElement() {

    const errorBlock = document.createElement('div');
    const result = document.createElement('p');
    result.innerText = 'Invalid input, please enter the data in this format: 4,3.2,1.1,9';
    errorBlock.appendChild(result);
    const divider = document.createElement('hr');
    divider.classList.add('divider');
    errorBlock.appendChild(divider);
    errorBlock.classList.add('badResults');

    return errorBlock;
}

function clearPad() {

    const pad = document.getElementById('data');
    pad.innerHTML = '';
}

function validateData(arr) {

    for (let i=0; i <arr.length; i++) {
       if(isNaN(arr[i])) {
           return true;
       }
    }

    return false;

}