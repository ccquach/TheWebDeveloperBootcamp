// *** printReverse ***

function printReverse(arr) {
	for(i = arr.length - 1; i >= 0; i--) {
		console.log(arr[i]);
	}
}
printReverse([1,2,3,4]);
//4
//3
//2
//1
printReverse(["a","b","c"]);
//"c"
//"b"
//"a"

// *** isUniform ***

function isUniform(arr) {
	var firstElement = arr[0];
	for(i = 1; i < arr.length; i++) {
		if(arr[i] !== firstElement) {
			return false
		}
	}
	return true;
}
isUniform([1,1,1,1]); //true
isUniform([2,1,1,1]); //false
isUniform(["a", "b", "p"]); //false
isUniform(["b", "b", "b"]); //true

// *** sumArray ***

function sumArray(arr) {
	var sum = 0;
	arr.forEach(function(e) {
		sum += e;
	});
	return sum;
}
sumArray([1,2,3]); //6
sumArray([10,3,10,4]); //27
sumArray([-5,100]); //95

// *** max ***

function max(arr) {
	var maxNum = arr[0];
	arr.forEach(function(e) {
		if(e > maxNum) {
			maxNum = e;
		}
	});
	return maxNum;
}
max([1,2,3]); //3
max([10,3,10,4]); //10
max([-5,100]); //100