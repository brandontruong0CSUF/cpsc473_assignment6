var main = function () {

  $("a").click(function (e) {
    e.preventDefault();
    console.log($(this).attr("choice"));
    $.get("/play/" + $(this).attr("choice"), function (res) {
      var stats = $('#stats');
      stats.empty();
      stats.append($('<h2>').text("Outcome: " + res.outcome));
      stats.append($('<h2>').text("Ties: " + res.ties));
      stats.append($('<h2>').text("Losses: " + res.losses));
      stats.append($('<h2>').text("Wins: " + res.wins));
    });
  });

};

$(document).ready(main);