// 'app.js' for Lab 2
// by Geoffrey Emerson
// May 10, 2016

// all questions and answers are separate arrays within the main array
var main_quiz = [
  ['What is Geoff\'s last name?', 'Emerson'],
  ['What state is Geoff from?', ['California','CA']],
  ['How old is Geoff?', 43],
  ['Is Geoff 6\'4\" tall? (Yes/No)', 'Yes'],
  ['Complete the sentence: Geoff is _______.', ['Tall', 'Cool', 'Awesome', 'Smart', 'Really really ridiculously good looking']]
];

// set up variables and dom queries
var current_question = 0;
var answer_total = 0;
var correct_answers = 0;
var needed_help = false;
var html_string = ''; // string that builds a response to the user in various places
var player_name = '';
var greeting_div = document.getElementById('greeting');
var player_name_div = document.getElementById('player_name');

// greet player and ask for the player's name
greeting_div.textContent = 'Hello! And welcome to the Lab 2 Quiz: All About Geoff!';
html_string = '<form><h2>';
html_string += '<label for=\"player_name\">Player, what is your name? </label>';
html_string += '<input name=\"player_name\" id=\"name\" autocomplete=\"off\">';
html_string += '<button onclick=\"event.preventDefault(); get_player_name(); return false;\">';
html_string += 'Start Quiz</button>';
html_string += '</h2></form>';
player_name_div.innerHTML = html_string;
document.getElementById('name').focus();

// get the player name and magically change the dom to welcome the player by name
function get_player_name() {
  player_name = document.getElementById('name').value;
  if (player_name) {
    html_string = '<h2>';
    html_string += 'Welcome, ' + player_name + '! Here are the questions:';
    html_string += '</h2>';
    player_name_div.innerHTML = html_string;
    show_question();
  }
}

function show_question() {
  if (current_question < main_quiz.length) {
    var new_div = document.createElement('div');
    html_string = '<form><p>';
    html_string += '<label for=\"question' + current_question + '\">' + main_quiz[current_question][0] + ' </label>';
    html_string += '<input name=\"question' + current_question + '\" id=\"question' + current_question + '\" autocomplete=\"off\">';
    html_string += '<span id=\"span' + current_question + '\">';
    html_string += '<button onclick=\"event.preventDefault(); check(' + current_question + '); return false;\">';
    html_string += 'Guess</button><span id=\"error' + current_question + '\"></span>';
    html_string += '</span>';
    html_string += '</p></form>';
    new_div.innerHTML = html_string;
    document.getElementById('responsive_quiz').appendChild(new_div);
    document.getElementById('question' + current_question).focus();
  }
}

// check the user's answer against the answer in the array
function check(ans){
  var user_ans_div = document.getElementById('question' + ans);
  var user_ans = user_ans_div.value;
  console.log('User answered ' + user_ans + ' for question ' + main_quiz[ans][0]);
  var array_ans = main_quiz[ans][1];
  
  // Check in answer arrays first
  if (typeof(array_ans) == 'object') {
    // needs to be mapped to compare lower case answers
    var lower_case_array = array_ans.map(function(value) {
      return value.toLowerCase();
    });
    var ans_index = lower_case_array.indexOf(user_ans.toLowerCase());
    if (ans_index >= 0) {
      html_string = ' ' + main_quiz[ans][1][ans_index] + ' is correct!';
      correct_answers++;
    } else {
      html_string = ' Sorry, possible answers were ';
      for (var i = 0; i < main_quiz[ans][1].length-1; i++) {
        html_string += main_quiz[ans][1][i] + ", ";
      }
      html_string += 'or ' + main_quiz[ans][1][main_quiz[ans][1].length-1] + '.';
    }
    user_ans_div.disabled = true;
    document.getElementById('span' + ans).innerHTML = html_string;
    answer_total++;
    check_done();
  } 
  
  // compare for string type answers, case insensitive
  else if (typeof(user_ans) == 'string' && typeof(array_ans) == 'string') {
    if (user_ans.toLowerCase() == array_ans.toLowerCase()) {
      html_string = ' ' + main_quiz[ans][1] + ' is correct!';
      correct_answers++;
    } else {
      html_string = ' Sorry, the answer is ' + main_quiz[ans][1] + '.';
    }
    user_ans_div.disabled = true;
    document.getElementById('span' + ans).innerHTML = html_string;
    answer_total++;
    check_done();
    
  // special high/low game for numerical answers  
  } else if (typeof(array_ans) == 'number') {
    var already_high = false;
    var already_low = false;
    if (user_ans == array_ans) {
      html_string = ' ' + main_quiz[ans][1] + ' is correct!';
      correct_answers++;
      user_ans_div.disabled = true;
      document.getElementById('span' + ans).innerHTML = html_string;
      answer_total++;
      check_done();
    } else if (user_ans > array_ans) {
      if (already_high) {
        html_string = ' Still too high! Try again.';
      } else {
        html_string = ' Too high, try again.';
        already_high = true;
        already_low = false;
      }
      needed_help = true;
      document.getElementById('error' + ans).innerHTML = html_string;
    } else if (user_ans < array_ans) {
      if (already_low) {
        html_string = ' Still too low! Try again.';
      } else {
        html_string = ' Nope. Too low, try again.';
        already_low = true;
        already_high = false;
      }
      needed_help = true;
      document.getElementById('error' + ans).innerHTML = html_string;
    } else {
      html_string = ' Please enter a number, no letters.';
      document.getElementById('error' + ans).innerHTML = html_string;
    }
  }
}

// check to see if the user has answered all the questions, then display message
function check_done() {
  if (answer_total == main_quiz.length) {
    html_string = '<h2>You answered all the questions!</h2>';
    html_string += '<h3>You got ' + correct_answers + ' correct answers out of ' + main_quiz.length + '!';
    if (needed_help == true) {
      html_string += ' (With a little help.)'; 
    }
    html_string += '</h3>';
    if (correct_answers > 1) {
      html_string += '<h2>Congrats! Thanks for playing, ' + player_name + '!</h2>';
    } else {
      html_string += '<h2>You suck, ' + player_name + '.</h2>';
    }
    document.getElementById('finished').innerHTML = html_string;
  } else {
    current_question++;
    show_question();
  }
}
