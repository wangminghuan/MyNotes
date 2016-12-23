item => item + 1;
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6]();
//参数为v，返回v
var fn= v => v;
//没有参数，返回

var f2= ()=>g;

//多个参数，返回

var f3= (arg1,arg2)=> h;

var sum = (num1, num2) => { return num1 + num2; }

var sum2 = (num1, num2) => num1 + num2;

var sum3=(num1,num2)=>{
	if(num1>0){
		return num1
	}else{
		return num1+num2
	}
}

function* gen(){
	console.log("start");
	yield console.log("first");
	yield console.log("second");
	yield console.log("third");
} 
var hw=gen();
hw.next();
/*hw.next();
hw.next();
*/
/*function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}*/

var timeout=new Promise(function(resolve,reject){
     setTimeout(resolve, 5000, 'done');
})
timeout.then((value) => {
  console.log(value);
});