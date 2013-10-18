$(function () {
  $("#start-towtruck").click(TogetherJS);
  randomize();
});

function cell(row, col) {
  return $("#cell-" + row + "-" + col);
}

function randomColor() {
  return "#" + Math.floor(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1);
}

function randomize() {
  for (var row=1; row<6; row++) {
    for (var col=1; col<6; col++) {
      var c = cell(row, col);
      c.css({"background-color": randomColor()});
    }
  }
}

$(document).on("click", "#flips td", function () {
  var el = $(this);
  var color = randomColor();
  el.css({"background-color": color});
  if (TogetherJS.running) {
    TogetherJS.send({type: "flip-color", id: el.attr("id"), color: color});
  }
});

var TogetherJSConfig_hub_on = {
  "flip-color": function (msg) {
    $("#" + msg.id).css({"background-color": msg.color});
  },
  "towtruck.hello": function (msg) {
    var colors = [];
    $("td").each(function () {
      var el = $(this);
      colors.push({id: el.attr("id"), color: el.css("background-color")});
    });
    TogetherJS.send({type: "init", colors: colors});
  },
  "init": function (msg) {
    msg.colors.forEach(function (c) {
      $("#" + c.id).css({"background-color": c.color});
    });
  }
};
