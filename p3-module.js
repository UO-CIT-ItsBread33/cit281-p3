const validDenomination = (coin) => {
    const coins = [1,5,10,25,50,100];
    if (coins.indexOf(coin) !== -1) {
        return true; 
    } else {
        return false;
    }
}

const valueFromCoinObject = (obj) => {
    let {denom = 0, count = 0} = obj;
    return denom*count;
}

const valueFromArray = (arr) => {
    let sum = arr.reduce((total, num) => total + valueFromCoinObject(num), 0);
    return sum
}

const coinCount = (...coinage) => {
    return valueFromArray(coinage);
}

module.exports = {coinCount};

/*
console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));
*/



