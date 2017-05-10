var Nightmare = require('nightmare');
var nightmare = Nightmare({show : true});
var readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function summonAims(username, pass) {
	console.log('BaLLS');
	nightmare
		.goto('http://192.168.0.103:9090/aims/')
		.type('#loginId', username)
		.type('#pswrd', pass)
		.click('#login')
		.wait(5000)
		.html('/home/shashank/Code/js/wrappinAims/bullshit/ASS.html', 'HTMLComplete')
		.screenshot('/home/shashank/Code/js/wrappinAims/bullshit/screeny.png')
		.wait(5000)
		.end()
		.then(function(result) {
			console.log(result);
			return true;
		})
		.catch(function(error) {
			console.log(error);
			return false;
		});
}

/*var uname, pass, gotUname = 0, gotPass = 0;
rl.question('What is your username?', (answer) => {
  uname = answer;
});

rl.question('What is your password?', (answer) => {
  pass = answer;
});
*/
summonAims('EE16BTECH11026', '@rAvind1453');

// $(document).ready(function(){
// 	$("#loginBalls").click(function(){
// 	var username = $.trim($("#uid").val());
// 	var pass = $.trim($("#pswrd").val());
// 	console.log(username + ' ' + pass);
// 	return summonAims(username, pass);
// 	});
// });