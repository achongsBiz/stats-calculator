document.addEventListener( 'DOMContentLoaded',
    () => {
        const btn = document.getElementById('calculate');
        btn.addEventListener('click', flowControl);
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
    
    console.log(standardDeviation);
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

    const resultsBlock = document.createElement('div');
    
    const meanResults = document.createElement('p');
    meanResults.innerText = 'Mean: ' + mean.toFixed(3);
    resultsBlock.append(meanResults);

    const medianResults = document.createElement('p');
    medianResults.innerText = 'Median: ' + median.toFixed(3);
    resultsBlock.append(medianResults);

    const stDevResultSample = document.createElement('p');
    stDevResultSample.innerText = 'Standard Deviation (Sample): ' + standardDeviation.sample.toFixed(3);
    resultsBlock.append(stDevResultSample);

    const stDevResultPopulation = document.createElement('p');
    stDevResultPopulation.innerText = 'Standard Deviation (Population): ' + standardDeviation.population.toFixed(3);
    resultsBlock.append(stDevResultPopulation);

    return resultsBlock;

}