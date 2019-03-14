//object of options and corresponding components

let info = {
  romantic: {
    phrase: "For your love, I could wait more lifetimes than ",
    noun: "lifetimes."
  },
  flirty: {
    phrase: "I want to kiss you more times than ",
    noun: "kisses."
  },
  tender: {
    phrase: "To carry all my love for you, I would need more hearts than ",
    noun: "hearts."
  },
  cheesy: {
    phrase: "To outshine your smile it would take more stars than ",
    noun: "stars."
  },
  passionate: {
    phrase: "The instant I look at you my heart beats more times than ",
    noun: "heart beats."
  },
  contemporary: {
    phrase: "I would swipe right on your profile more times than ",
    noun: "right swipes."
  }
};

// get number trivia fact
const getTrivia = function(number, type, sentence) {
  console.log(type);
  $.ajax({
    url: `http://numbersapi.com/${number}/${type}?fragment&notfound=floor&json`,
    method: "GET"
  }).then(function(data) {
    writeValentine(data.text, data.number, sentence);
  });
};

//write out Valentine
const writeValentine = function(data, number, sentence) {
  $(".valentine").html("");
  $(".value").html("");
  $(".item").html("");
  console.log(info[sentence].phrase + data);
  let userValentine = info[sentence].phrase + data + ".";
  let userNoun = info[sentence].noun;
  new ClipboardJS(".copy");
  $(".valentine")
    .append(userValentine)
    .attr("value", userValentine);
  $(".value").append(number);
  $(".item").append(userNoun);
  $(".copy").on("click", function() {
    $(".copy")
      .html("Copied!")
      .addClass("copied");
    setTimeout(() => {
      $(".copy")
        .html("Copy to Clipboard")
        .removeClass("copied");
    }, 3000);
  });
  reset();
};

//flip card back around and reset options
const reset = function() {
  $(".reset").on("click", function() {
    console.log("i was clicked");
    $(".back")
      .removeClass("zoomIn")
      .addClass("zoomOut")
      .one("animationend", function() {
        $(".back").removeClass("visible");
        $(".front").removeClass("zoomOut");
        $(".front").addClass("zoomIn");
      });
    $(".number").val("");
    $(".phrase").val("romantic");
    $(".nerdy").removeAttr("checked");
  });
};

//get user input
const getUserInput = function() {
  $("form").on("submit", function(event) {
    $(".front")
      .removeClass("zoomIn")
      .addClass("animated zoomOut")
      .one("animationend", function() {
        console.log("im done");
        $(".back").addClass("animated zoomIn visible");
      });
    $(".back").removeClass("zoomOut");
    event.preventDefault();
    let phrase = $(".phrase").val();
    let userNumber = $(".number").val();
    let userType;
    if ($(".extraNerdy").prop("checked")) {
      userType = "math";
    } else {
      userType = "trivia";
      if (userNumber >= 5500000 && userNumber < 5880000) {
        userNumber = 5400000;
      }
      if (userNumber >= 343 && userNumber < 350) {
        userNumber = 342;
      }
    }
    getTrivia(userNumber, userType, phrase);
  });
};

$(function() {
  getUserInput();
});
