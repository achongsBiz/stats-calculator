let should = chai.should();

describe('Input Validation', function() {
    it('No commas fail validation', noCommas);
    it('Cannot start with a comma', startWithComma);
    it('Cannot end with a comma', endWithComma);
    it('Can only contain numbers', numbersOnly);
})

describe('Data Preparation', function(){
    it('Transforms input array from strings to numbers', cleanDataTest);
})

describe('Calculations', function(){
    it('Mean is calculated correctly', calculateMean);
    it('Median is calculated correctly for even number of elements', calculateMedianEvens);
    it('Median is calculated correctly for odd number of elements', calculateMedianOdds)
    it('Sum of square difference from mean array is calculated correctly', calculateSqDiffMeanArray)
    it('Standard deviation calculated correctly.', calculateSdSample);
})

function noCommas() {
    let actualResult = validate('3 4 5');
    actualResult.should.equal(false);
}

function startWithComma() {
    let actualResult = validate(',3 4 5');
    actualResult.should.equal(false);
}

function endWithComma() {
    let actualResult = validate('3 4 5,');
    actualResult.should.equal(false);
}

function numbersOnly() {
    let actualResult = validate('a, 4, 2');
    actualResult.should.equal(false);
}

function cleanDataTest() {
    let actualResult = cleanData(['3', '9.2', '0', '-234.3']);
    actualResult[0].should.equal(3);
    actualResult[1].should.equal(9.2);
    actualResult[2].should.equal(0);
    actualResult[3].should.equal(-234.3);
}

function calculateMean() {

    let actualResult = calcMean([-1,2.1, 3,4,45]).toFixed(2);
    actualResult.should.equal('10.62');
}

function calculateMedianEvens() {

    let actualResult = calcMedian([-1 ,2.1, 4, 45]).toFixed(2);
    actualResult.should.equal('3.05');
}

function calculateMedianOdds() {

    let actualResult = calcMedian([-1,2.1, 3,4,45]).toFixed(2);
    actualResult.should.equal('3.00');
}

function calculateSqDiffMeanArray() {
    let actualResult = calcSqDiffFromMean([-5.2, 2, 43.2, 100], 35).toFixed(2);
    actualResult.should.equal('6997.28');

}

function calculateSdSample() {
    let actualResult = calcStandardDeviation(14.75, 4);
    actualResult.sample.toFixed(2).should.equal('2.22');
    actualResult.population.toFixed(2).should.equal('1.92');
}