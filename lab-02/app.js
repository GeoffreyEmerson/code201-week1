// 'app.js' for Lab 2
// by Geoffrey Emerson
// May 10, 2016

// all questions and answers are separate arrays within the main array
var main_quiz = [
  ['What is Geoff\'s last name?', 'Emerson'],
  ['Whate state is Geoff from?', 'California'],
  ['How old is Geoff?', 43],
  ['Is Geoff 6\'4\" tall? (Yes/No)', 'Yes']
];

// set up variables and dom queries
var answer_total = 0;
var correct_answers = 0;
var needed_help = false;
var html_string = ''; // string that builds a response to the user in various places
var player_name = '';
var greeting_div = document.getElementById('greeting');
var player_name_div = document.getElementById('player_name');

// greet player and ask for the player's name
greeting_div.textContent = 'Hello! And welcome to the Lab 2 Quiz: All About Geoff!';
html_string = '<h2>';
html_string += '<label for=\"player_name\">Player, what is your name? </label>';
html_string += '<input name=\"player_name\" id=\"name\"required>';
html_string += '<button onclick=\"event.preventDefault(); get_player_name(); return false;\">';
html_string += 'Start Quiz</button>';
html_string += '</h2>';
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
    start_quiz();
  }
}

// Populate the quiz questions and input fields
function start_quiz() {
  console.log(main_quiz.length);
  for (var i = 0; i < main_quiz.length; i++) {
    html_string = '<p>';
    html_string += '<label for=\"question' + i + '\">' + main_quiz[i][0] + ' </label>';
    html_string += '<input name=\"question' + i + '\" id=\"question' + i + '\" required>';
    html_string += '<span id=\"span' + i + '\">';
    html_string += '<button onclick=\"event.preventDefault(); check(' + i + '); return false;\">';
    html_string += 'Guess</button><span id=\"error' + i + '\"></span>';
    html_string += '</span>';
    html_string += '</p>';
    document.getElementById('responsive_quiz').innerHTML += html_string;
  }
  document.getElementById('question0').focus();
}

// check the user's answer against the answer in the array
function check(ans){
  var user_ans_div = document.getElementById('question' + ans);
  var user_ans = user_ans_div.value;
  console.log('User answered ' + user_ans + ' for question ' + ans);
  var array_ans = main_quiz[ans][1];
  if (typeof(user_ans) == 'string' && typeof(array_ans) == 'string') {
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
  } else if (typeof(array_ans) == 'number') {
    if (user_ans == array_ans) {
      html_string = ' ' + main_quiz[ans][1] + ' is correct!';
      correct_answers++;
      user_ans_div.disabled = true;
      document.getElementById('span' + ans).innerHTML = html_string;
      answer_total++;
      check_done();
    } else if (user_ans > array_ans) {
      html_string = ' Too high, try again.';
      needed_help = true;
      document.getElementById('error' + ans).innerHTML = html_string;
    } else if (user_ans < array_ans) {
      html_string = ' Nope. Too low, try again.';
      document.getElementById('error' + ans).innerHTML = html_string;
      needed_help = true;      
    } else {
      html_string = ' Wat. Did you just enter letters?';
      document.getElementById('error' + ans).innerHTML = html_string;
    }
  } else {
    html_string = ' Wat.';
    document.getElementById('error' + ans).innerHTML = html_string;
  }
}

// check to see if the user has answered all the questions, then display message
function check_done() {
  if (answer_total == main_quiz.length) {
    html_string = '<h2>You answered all the questions!</h2>';
    html_string += '<h3>You got ' + correct_answers + ' correct answers!';
    if (needed_help == true) {
      html_string += ' (With a little help.)'; 
    }
    html_string += '</h3>';
    document.getElementById('finished').innerHTML = html_string;
  }
}
