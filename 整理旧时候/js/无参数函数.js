x = findMax(1, 123, 500, 115, 44, 88);
function findMax() {
    var i, max = arguments[0];
    if(arguments.length < 2){
        return max;
        console.log(max);
    }

    for (i = 1; i < arguments.length; i++) {
        if (arguments[i] > max) {
            max = arguments[i];
            console.log(max)
        }
    }
    console.log(max);
}
