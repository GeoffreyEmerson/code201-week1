// 'app.js' for Code Fellows 201 Week 1
// by Geoffrey Emerson
// Wednesday May 11, 2016

// all questions are element 0, and answers are always an array of possible answers
var quiz_array = [
  ['What is Geoff\'s last name?', ['Emerson']],
  ['What state is Geoff from?', ['California','CA']],
  ['How old is Geoff?', [43]],
  ['Is Geoff 6\'4" tall? (Yes/No)', ['Yes']],
  ['Complete the sentence: Geoff is _______.', ['Tall', 'Cool', 'Awesome', 'Smart', 'Really really ridiculously good looking']]
];

// set up variables and dom queries
var current_question; // tracks quiz flow
var correct_answers; // tracks points
var already_high; // tracks user hints for number guessing
var already_low; // also tracks user hints for number guessing
var number_guesses; // tracks how many guesses were given for a number (up to 4)
var needed_help; // boolean that tracks whether the player needed help guessing a number
var player_name; // no idea what this tracks
var body = document.body;  // this could change if I add an html template

game();

function game() {
  initialize_globals();
  welcome();
  request_player_name();

  // the rest executes based on user clicks
}

function initialize_globals() {
  current_question = 0;
  correct_answers = 0;
  already_high = false;
  already_low = false;
  number_guesses = 0;
  needed_help = false;
  player_name = '';
  body.innerHTML = '';
}

// quick function to simplify adding each new div
function add_div(html, focus_id) {
  var new_div = document.createElement('div');
  new_div.innerHTML = html;
  body.appendChild(new_div);
  if (focus_id) {
    document.getElementById(focus_id).focus();
  }
}

function welcome() {
  var html_string = '<h1>Hello! And welcome to the All About Geoff! Quiz</h1>';
  add_div(html_string);
}

// greet player and ask for the player's name
function request_player_name() {
  var html_string = '<form class="padded"><h2>';
  html_string += '<label for="player_name">Player, what is your name? </label>';
  html_string += '<input name="player_name" id="name" autocomplete="off">';
  html_string += '<button onclick="event.preventDefault(); get_player_name();">';
  html_string += 'Start Quiz</button>';
  html_string += '</h2></form>';
  add_div(html_string, 'name');
}

// get the player name and welcome the player by name
function get_player_name() {
  var user_input_element = document.getElementById('name');
  player_name = user_input_element.value;
  if (player_name) {
    user_input_element.disabled = true;
    var html_string = '<h2 class="padded">';
    html_string += 'Welcome, ' + player_name + '! Here come the questions:';
    html_string += '</h2>';
    add_div(html_string);
    check_done(); // just in case the quiz array is empty
  }
}

function show_question(question_num) {
  var html_string = '<form class="padded"><p>';
  html_string += '<label for="question' + question_num + '">';
  html_string += quiz_array[question_num][0] + ' </label>';
  html_string += '<input name="question' + question_num + '" ';
  html_string += 'id="question' + question_num + '" autocomplete="off">';
  html_string += '<span id="span' + question_num + '">';
  html_string += '<button onclick="event.preventDefault(); check_answer(' + question_num + ');">';
  html_string += 'Guess</button><span id="error' + question_num + '"></span>';
  html_string += '</span>';
  html_string += '</p></form>';
  add_div(html_string, 'question' + question_num);
}

// check the user's answer against the answer in the array
function check_answer(question_num){
  var user_input_element = document.getElementById('question' + question_num);
  var user_answer = user_input_element.value;
  console.log('User answered ' + user_answer + ' for question ' + quiz_array[question_num][0]);
  var answer_array = quiz_array[question_num][1];

  // Check in answer arrays for the type of answers (number or strings)
  if (typeof(answer_array[0]) == 'string') {
    // needs to be mapped to compare lower case answers
    var lower_case_array = answer_array.map(function(value) {
      return value.toLowerCase();
    });
    var answer_index = lower_case_array.indexOf(user_answer.toLowerCase());
    if (answer_index >= 0) {
      var html_string = ' ' + answer_array[answer_index] + ' is correct!';
      // give a point!
      correct_answers++;
    } else {
      // Display possible answers for player
      if (answer_array.length < 2) {
        var html_string = ' Sorry, the answer was ' + answer_array[0];
      } else {
        var html_string = ' Sorry, possible answers were ';
        for (var i = 0; i < answer_array.length - 1; i++) {
          html_string += answer_array[i] + ', ';
        }
        html_string += 'or ' + answer_array[answer_array.length - 1] + '.';
      }
    }
    user_input_element.disabled = true;
    document.getElementById('span' + question_num).innerHTML = html_string;
    check_done();
  }

  // special high/low game for numerical answers
  else if (typeof(answer_array[0]) == 'number') {
    var correct_number = answer_array[0];
    number_guesses++;
    if (user_answer == correct_number) {
      html_string = ' ' + correct_number + ' is correct!';
      document.getElementById('span' + question_num).innerHTML = html_string;
      user_input_element.disabled = true;
      // reset these in case another number answer occurs
      already_high = false;
      already_low = false;
      // give a point!
      correct_answers++;
      check_done();
    } else if (isNaN(user_answer) || user_answer == '') {
      var html_string = ' Answer must be a number.';
      document.getElementById('error' + question_num).innerHTML = html_string;
      already_high = false;
      already_low = false;
    } else if (user_answer > correct_number && number_guesses < 4) {
      if (already_high) {
        html_string = ' Still too high! Try again.';
      } else {
        html_string = ' Too high, try again.';
        already_high = true;
        already_low = false;
      }
      needed_help = true;
      document.getElementById('error' + question_num).innerHTML = html_string;
    } else if (user_answer < correct_number && number_guesses < 4) {
      if (already_low) {
        html_string = ' Still too low! Try again.';
      } else {
        html_string = ' Nope. Too low, try again.';
        already_low = true;
        already_high = false;
      }
      needed_help = true;
      document.getElementById('error' + question_num).innerHTML = html_string;
    } else if (number_guesses == 4) {
      var html_string = 'Out of guesses! The answer was ' + correct_number + '.';
      document.getElementById('span' + question_num).innerHTML = html_string;
      user_input_element.disabled = true;
      // reset these in case another number answer occurs
      already_high = false;
      already_low = false;
      check_done();
    } else {
      html_string = ' Please enter a number, no letters.';
      document.getElementById('error' + question_num).innerHTML = html_string;
    }
  }
} // end of function check_answer()

// check to see if the user has answered all the questions
function check_done() {
  if (current_question < quiz_array.length) {
    show_question(current_question);
    current_question++;
  } else {
    show_final_score();
  }
}

// display message
function show_final_score() {
  var html_string = '<h2 class="padded">You answered all the questions!</h2>';
  html_string += '<h3 class="padded">You got ' + correct_answers + ' correct answers';
  html_string += ' out of ' + quiz_array.length + '!';
  if (needed_help) {
    html_string += ' (With hints.)';
  }
  html_string += '</h3>';
  if (correct_answers > 1) {
    html_string += '<h2 class="padded">Congrats! Thanks for playing, ' + player_name + '!</h2>';
  } else {
    html_string += '<h2 class="padded">You suck, ' + player_name + '.</h2>';
  }
  html_string += '<p class="padded"><a href="index.html"><button id="start_over">Back to Home</button></a></p>';
  add_div(html_string, 'start_over');
}

function restore_page() {
  body.innerHTML = html_stash;
}
