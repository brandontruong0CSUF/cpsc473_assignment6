var http = require("http"),
    express = require("express"),
    router = express.Router(),
    app;

app = express();
app.use(express.static(__dirname + "/homepage"));

http.createServer(app).listen(3000);
console.log("Server running at http://localhost:3000/");

// Game global variables
var ties = 0,
    losses = 0,
    wins = 0;


router.get("/play/:input", function (req, res) {
  var cpuChoice = Math.floor(Math.random() * 5);
  // array index player chooses 0 = rock, 1 = paper, 2 = scissors, 3 = lizard, 4 = spock
  // 0 = tie, -1 = player loses, 1 = player wins
  var victory = [
                [0,-1,1,1,-1],
                [1,0,-1,-1,1],
                [-1,1,0,1,-1],
                [-1,1,-1,0,1],
                [1,-1,1,-1,0]
                ];
  var outcome = {"0":"You tie!", "-1":"You lose!", "1":"You win!"};
  var convertChoices = {rock:0, paper:1, scissors:2, lizard:3, spock:4};
  var playerChoice = convertChoices[req.params.input];
  var output = {};
  
  // Determine victor
  switch(victory[playerChoice][cpuChoice]) {
    case 0:
      ++ties;
      break;
    
    case -1:
      ++losses;
      break;
    
    case 1:
      ++wins;
      break;
    
    default:
      // Print error message
  }
  
  // Send game statistics to client
  output.outcome = outcome[victory[playerChoice][cpuChoice]];
  output.ties = ties;
  output.losses = losses;
  output.wins = wins;
  res.json(output);
  
});

app.use("/", router);