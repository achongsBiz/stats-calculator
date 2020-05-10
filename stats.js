document.addEventListener( 'DOMContentLoaded',
    () => {
        const caclBtn = document.getElementById('calculate');
        caclBtn.addEventListener('click', flowControl);

        const clearBtn = document.getElementById('clear');
        clearBtn.addEventListener('click', clearPad);

    }
)

function flowControl() {

    let numListInput = document.getElementById('num-input').value.split(',');
    const dataBlock = document.getElementById('data');

    const dataArr = cleanData(numListInput);
    dataArr.sort();

    let mean = calcMean(dataArr); 
    let median = calcMedian(dataArr);
    let sumDiffFromMean = calcSqDiffFromMean(dataArr, mean);
    let standardDeviation = calcStandardDeviation(sumDiffFromMean, dataArr.length);
    let resultBlock = createResultElement(mean, median, standardDeviation);

    dataBlock.prepend(resultBlock);
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

function createResultElement(mean, median, standardDeviation) {

    let elements = [mean, median, standardDeviation.sample, standardDeviation.population];
    let elementsDesc = ['Mean: ', 'Median: ', 'Sample Standard Deviation: ', 'Population Standard Deviation: '];

    const resultsBlock = document.createElement('div');

    for (let i=0; i < elements.length; i++) {

        const meanResults = document.createElement('p');
        meanResults.innerText = elementsDesc[i] + elements[i].toFixed(3);
        resultsBlock.appendChild(meanResults);
    }

    const divider = document.createElement('hr');
    divider.classList.add('divider');
    resultsBlock.appendChild(divider);
    resultsBlock.classList.add('goodResults');

    return resultsBlock;
}

function clearPad() {

    const pad = document.getElementById('data');
    pad.innerHTML = '';
}
