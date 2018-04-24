
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    timer--;
    if (timer < 0) {
        var total = total_income();
        console.log(total);
        alert("congratulations! You got "+ total + " acorns! Thank you for helping Nibbles! Click 'ok' to play again!");
        window.location.reload();
        return;
    }
    setTimeout(startTimer, 1000, timer, display);
}

function click_hint() {
	// document.getElementById("clickhint").innerHTML="";
	$("#clickhint").html("");
    
    var twoMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(twoMinutes, display);
    
	repeat_gen_acorn();
}
function repeat_gen_acorn() {
  	var nIntervId = setInterval(generate_acorn, 3000);
}
    
function generate_one_acorn(acornId, timeOut){
	var opacity = $("#"+acornId).css('opacity');
	if (Math.random() > 0.5 && !(opacity === "1")) {
		$("#"+acornId).css('opacity', '1.0');
		var code = "$('#"+ acornId + "').css('opacity', '0');"
		// console.log(code);
    	setTimeout(code, timeOut);
	}
}
function generate_acorn() {
	generate_one_acorn("red_acorn1", 8000);
	generate_one_acorn("red_acorn2", 10000);
	generate_one_acorn("red_acorn3", 8000);
	generate_one_acorn("red_acorn4", 10000);
	generate_one_acorn("green_acorn1", 10000);
	generate_one_acorn("green_acorn2", 8000);
	generate_one_acorn("green_acorn3", 10000);
	generate_one_acorn("gold_acorn1", 10000);
	generate_one_acorn("gold_acorn2", 8000);
	generate_one_acorn("gold_acorn3", 10000);
	generate_one_acorn("blue_acorn1", 10000);
	generate_one_acorn("blue_acorn2", 8000);
	generate_one_acorn("blue_acorn3", 10000);
}

function click_acorn(counterId,acornId) {
	// console.log("enterclick_acorn.", "counterId= ", counterId, "acornId: ", acornId );
	// console.log("opacity: ", document.getElementById(acornId).style.opacity);
	var opacity = document.getElementById(acornId).style.opacity;
	if (opacity ==="1") {
		// console.log("enter if..");
		document.getElementById(counterId).innerHTML++;
		document.getElementById(acornId).style.opacity = 0.0;
	}
}

function openSavingNav() {
	document.getElementById("savingNav").style.width = "37%";
}

function closeSavingNav() {
	document.getElementById("savingNav").style.width = "0%";
}

function openInvestNav() {
	document.getElementById("investNav").style.width = "37%";
}

function closeInvestNav() {
	document.getElementById("investNav").style.width = "0%";
}

function addToSaveOne(counterId, savingCounterId) {
    document.getElementById(savingCounterId).innerHTML = +document.getElementById(savingCounterId).innerHTML + +document.getElementById(counterId).innerHTML;
    document.getElementById(counterId).innerHTML = "0";
}
function addToSave() {
    addToSaveOne('red_num', 'red_acorn_saving');
    addToSaveOne('green_num', 'green_acorn_saving');
    addToSaveOne('gold_num', 'gold_acorn_saving');
    addToSaveOne('blue_num', 'blue_acorn_saving');
}
function interest() {
    if (typeof this.constructor.interest == 'undefined') {
        this.constructor.interest = 0.0;
    }
    var interest=(+document.getElementById('red_acorn_saving').innerHTML+ +document.getElementById('green_acorn_saving').innerHTML
    + +document.getElementById('gold_acorn_saving').innerHTML+ +document.getElementById('blue_acorn_saving').innerHTML) * 0.01;
    this.constructor.interest = +this.constructor.interest + +interest;
    console.log(this.constructor.interest);
    var previous = document.getElementById('interest_acorn_num').innerHTML;
    document.getElementById('interest_acorn_num').innerHTML = Math.round(this.constructor.interest);
    if (document.getElementById('interest_acorn_num').innerHTML > previous) {
        flash($('#interest_acorn_num'), 1);
    }
}
function repeat_calculate_interest() {
    var inteval = setInterval(interest, 3000);
}
function flash($element, times) {
  var colors = ['#f86d36', '#000'];
  $element.css('color', colors[times % colors.length]);
  if (times === 0) return;
  setTimeout(function () {
    flash($element, times - 1);
  }, 300);
}

function addToInvest() {
    openInvestNav();
    if ($("#invest_acorn_num").html() > 0) return;

    var savingAmount = +$("#red_acorn_saving").html() + +$("#green_acorn_saving").html()
    + +$("#gold_acorn_saving").html() + +$("#blue_acorn_saving").html();
    if (savingAmount < 30) {
        $("#invest-status").css('display', 'none');
        $("#invest-prompt").css('display', 'block');
    } else {
        $("#invest-status").css('display', 'block');
        $("#invest-prompt").css('display', 'none');
        $("#invest_acorn_num").html(savingAmount);

        $("#red_acorn_saving").html(0);
        $("#green_acorn_saving").html(0);
        $("#gold_acorn_saving").html(0);
        $("#blue_acorn_saving").html(0);
        setTimeout(investOutcome, 3000);
    }
    
}
function investOutcome() {
    // 50% probability 3 times return
    // 50% probability 0.4 times return
    // expected return is 0.5 * 3 + 0.5 * 0.4 = 1.7
    var success = Math.random() > 0.5;
    if (success) {
        var outCome = Math.round($("#invest_acorn_num").html() * 3);
        $("#invest_return_num").html(outCome);
        $("#invest-outcome").attr('src', "invest_live_tree.png");
    } else {
        var outCome = Math.round($("#invest_acorn_num").html() * 0.4);
        $("#invest_return_num").html(outCome);
        $("#invest-outcome").attr('src', "invest_dead_tree.png");
    }
    $("#invest-status").css('display', 'none');
    $("#invest-prompt").css('display', 'none');
    $("#invest-outcome").css('display', 'block');
    $('#return_tosaving_btn').prop('disabled', false).css('background-color', '#d1c3b8');
    $("#return_tosaving_btn").hover(function() {
      $(this).css("background-color","#ede34b");
    });
}
function return_tosaving() {
    console.log('return_tosaving');
    var total_return = $("#invest_return_num").html();
    $("#invest_acorn_num").html(0);
    $("#invest_return_num").html(0);
    var remainder = total_return % 4;
    var each_return = Math.floor(total_return / 4);
    $("#red_acorn_saving").html(+$("#red_acorn_saving").html() + each_return);
    $("#green_acorn_saving").html(+$("#green_acorn_saving").html() + each_return);
    $("#gold_acorn_saving").html(+$("#gold_acorn_saving").html() + each_return);
    $("#blue_acorn_saving").html(+$("#blue_acorn_saving").html() + each_return + remainder);


    $("#invest-status").css('display', 'none');
    $("#invest-prompt").css('display', 'none');
    $("#invest-outcome").css('display', 'none');
    $('#return_tosaving_btn').prop('disabled', true).css('background-color', 'gray');
    $("#return_tosaving_btn").hover(function() {
      $(this).css("background-color","gray")
    });
}

function total_income() {
    var saving = +$("#red_acorn_saving").html()+
                +$("#green_acorn_saving").html()+
                +$("#gold_acorn_saving").html()+
                +$("#blue_acorn_saving").html()+
                +$("#interest_acorn_num").html();
    // console.log(saving);
    var invest = $("#invest_return_num").html();
    // console.log(invest);
    var total = +saving + +invest;
    // console.log(total);
    return total;
}






