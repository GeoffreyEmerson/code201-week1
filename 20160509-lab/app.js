// 'app.js' for Lab 1
// by Geoffrey Emerson
// May 9, 2016

// all questions and answers are separate arrays within the main array
var mainQuiz = [
  ['How many states are in the U.S.?', 50],
  ['What is the name of the planet closest to the sun?', 'Mercury'],
  ['What number am I thinking of?', 42],
  ['Where is Jim Morrison buried?', 'Paris']
];

// track how many questions have been answered
var answerTotal = 0;

// Populate the quiz questions and input fields
var html_string;
console.log(mainQuiz.length);
for (var i = 0; i < mainQuiz.length; i++) {
  html_string = '<p>';
  html_string += '<label for=\"question' + i + '\">' + mainQuiz[i][0] + ' </label>';
  html_string += '<input name=\"question' + i + '\" id=\"question' + i + '\" required>';
  html_string += '<span id=\"span' + i + '\">';
  html_string += '<button type=\"submit\" onclick=\"check(' + i + '); return false;\">';
  html_string += 'Guess</button>';
  html_string += '</span>';
  html_string += '</p>';
  document.getElementById('responsiveQuiz').innerHTML += html_string;
}

// check the user's answer against the answer in the array
function check(ans){
  var user_ans = document.getElementById('question' + ans).value;
  console.log('User answered ' + user_ans + ' for question ' + ans);
  if (user_ans == mainQuiz[ans][1]) {
    var response = ' ' + user_ans + ' is correct!';
  } else {
    var response = ' Sorry, the answer is ' + mainQuiz[ans][1] + '.';
  }
  document.getElementById('span' + ans).innerHTML = response;
  answerTotal++;
  checkDone();
}

// check to see if the user has answered all the questions, then display message
function checkDone() {
  if (answerTotal == mainQuiz.length) {
    document.getElementById('finished').innerHTML = '<h2>You answered all the questions!</h2>';
  }
}
