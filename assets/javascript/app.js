$(document).ready(function() {

    // Q&A List
    let playerName = "";

    let questionList = {
        1: {
            question: "In what 2017 film do we see 'Hugh Jackman' caring for an ailing 'Patrick Stewart' at a remote outpost near the Mexican border?",
            choiceArray:["Logan", "Guardians of the Galaxy Vol.2", "Thor - Ragnarok", "Justice League"],
            answer: "Logan",
            moreInfo: "Logan is loosely based on the comic series 'Old Man Logan' by Mark Millar and Steve McNiven.",
        },

        2: {
            question: " What film from the 'Planet of the Apes' reboot series was released in July of 2017?",
            choiceArray:["Beneath the Planet of the Apes", "Dawn of the Planet of the Apes", "Rise of the Planet of the Apes", "War for the Planet of the Apes"],
            answer: "War for the Planet of the Apes",
            moreInfo:"War for the Planet of the Apes is the third film in the Planet of the Apes reboot series. ",
        },

        3: {
            question: "Based on true events, what 2017 film depicts the evacuation of 330,000 Allied troops to Britain during World War II.",
            choiceArray:["Sand Castle", "Battle of the Bulge", "Battle of Dunkirk", "War Machine"],
            answer: "Battle of Dunkirk",
            moreInfo:"The story is told from three perspectives - the land, sea and air. ",
        },

        4: {
            question: "Name the 2011 film that tells the story of a boy who lives alone in a railway station in Paris during the 1930s.",
            choiceArray:["Hugo", "The Adventures of Tintin", "Limitless", "Take Shelter"],
            answer: "Hugo",
            moreInfo:"Hugo received eleven Academy Award nominations and won five Oscars including Best Cinematography. ",
        },

        5: {
            question: "In what year was Walt Disney's mega-hit 'Frozen' released?",
            choiceArray:["2015", "2014", "2013", "2012"],
            answer: "2013",
            moreInfo:"Frozen won two Academy Awards - Best Animated Feature and Best Original Song for Let It Go.",
        },

        6: {
            question: "Released in 2015, 'Star Wars - The Force Awakens' was given what episodic number?",
            choiceArray:["8", "6", "5", "7"],
            answer: "7",
            moreInfo:"Two sequels, Episode VIII and Episode IX, are scheduled for 2017 and 2019 respectively. ",
        },

        7: {
            question: "What is the name of the dragon featured in the 2010 film, 'How to Train Your Dragon'?",
            choiceArray:["Joyless", "Toothless", "Endless", "Ruthless"],
            answer: "Toothless",
            moreInfo:"How to Train Your Dragon is based on a book series of the same name by British Author Cressida Cowell.",
        },

        8: {
            question: "Which movie series was 'rebooted' again in 2015 with Miles Teller and Kate Mara as stars?",
            choiceArray:["Star Trek", "Spiderman", "Fantastic Four", "Superman"],
            answer: "Fantastic Four",
            moreInfo:"Considered by many to be a washout, the film was the lowest grossing Fantastic Four film to date. ",
        },

        9: {
            question: "Who directed the 2010 psychological thriller film 'Shutter Island'?",
            choiceArray:["Christopher Nolan", "Quentin Tarantino", "Martin Scorsese", "Richard Linklater"],
            answer: "Martin Scorsese",
            moreInfo:"Leonardo DiCaprio plays the role of U.S. Marshal Edward 'Teddy' Daniels in the film. ",
        },

        10: {
            question: "Which of these films does NOT feature American actor Channing Tatum?",
            choiceArray:["Silver Linings Playbook", "Magic Mike", "Foxcatcher", "22 Jump Street"],
            answer: "Silver Linings Playbook",
            moreInfo:"Channing Tatum made his film debut in the 2005 film Coach Carter. ",
        },
    }

    //  

    let points = 0;
    let countDownTime = 15;
    let questionCount = 1;
    let intervalID;

    // Suffle questions and answers...
    for (var i=10; i>0; i--) {
        var j = Math.floor(Math.random() * i)+1;
        var temp = questionList[j];
        questionList[j] = questionList[i];
        questionList[i] = temp;
        for (var n=3; n>=0; n--) {
            var m = Math.floor(Math.random() * n)+1;
            var tempAnswer = questionList[i].choiceArray[m];
            questionList[i].choiceArray[m] = questionList[i].choiceArray[n];
            questionList[i].choiceArray[n] = tempAnswer;
        }
        console.log(questionList);
    }

    
    // Things that need to be done at the end of each question, whether it is a Win or Lose:
        // 1) show "next question" button or "end of game" button
        // 2) clear all questions and answers, and stop/clear the timer
  
    function endOfOneQ() {
        $("#next").attr("hidden", false);
        $("#questionArea").empty();
        $("#choiceArea").empty();
        $("#timer").empty()
        resetTime();

        if (questionCount === 10) {
            var endingMsg = $("<div>This is the end of the game. </div>")
            var endBtn = $("<button id='end' type='button' class='btn-secondary'>Show My Score...</button>");
            $("#win-lose").append(endingMsg);
            $("#win-lose").append(endBtn);
        }

        else {
            var nextBtn = $("<button id='next' type='button' class='btn btn-success'>Next Question</button>");
            $("#win-lose").append(nextBtn);
        }
    }
    
    // Things that need to be done when player guessed correct:
        // 1) Adding points
        // 2) Show the right answer & fun fact
        // 3) Show the win picture
        // 4) execute the endOfOneQ() function

    function guessedRight(qNum) {
        points = points +10;
        var winImg = $("<img src='assets/images/correct.gif' width=250px height=200px>");
        var correctAnswer = $("<div>");
        var correctAnswerText = $("<span>");
        $(correctAnswerText).text(questionList[qNum].answer)
        $(correctAnswerText).addClass("answerStyle");
        var funFact = $("<div>");
        $(funFact).addClass("funfactStyle");
        $(correctAnswer).text("The correct answer is: ");
        $(correctAnswer).append(correctAnswerText);
        $(funFact).html("<strong>FUN FACT: </strong>");
        $(funFact).append(questionList[qNum].moreInfo);
        $("#win-lose").html("<h1>Correct!</h1>");
        $("#win-lose").append(correctAnswer);
        $("#win-lose").append(winImg);
        $("#win-lose").append(funFact);
        endOfOneQ();
    }

    // Things that need to be done when player guessed correct:
        // 1) Show the right answer & fun fact
        // 2) Show the lose picture
        // 3) execute the endOfOneQ() function

    function guessedWrong(qNum) {
        var correctAnswer = $("<div>");
        var funFact = $("<div>");
        $(funFact).addClass("funfactStyle");
        var correctAnswerText = $("<span>");
        $(correctAnswerText).text(questionList[qNum].answer)
        $(correctAnswerText).addClass("answerStyle");
        var loseImg = $("<img src='assets/images/nope.gif' width=250px height=200px>");
        $(correctAnswer).text("The correct answer is: ");
        $(correctAnswer).append(correctAnswerText);
        $(funFact).html("<strong>FUN FACT: </strong>");
        $(funFact).append(questionList[qNum].moreInfo);
        $("#win-lose").html("<h1>Nope!</h1>");
        $("#win-lose").append(correctAnswer);
        $("#win-lose").append(loseImg);
        $("#win-lose").append(funFact);
        endOfOneQ();
    }

    function timesUp(qNum) {
        var correctAnswer = $("<div>");
        var correctAnswerText = $("<span>");
        $(correctAnswerText).addClass("answerStyle");
        var funFact = $("<div>");
        $(funFact).addClass("funfactStyle");
        var timeImg = $("<img src='assets/images/timeup.gif' width=250px height=200px>");
        $(correctAnswer).text("The correct answer is: ");
        $(correctAnswer).append(correctAnswerText);
        $(correctAnswerText).text(questionList[qNum].answer);
        $(funFact).html("<strong>FUN FACT: </strong>");
        $(funFact).append(questionList[qNum].moreInfo);
        $("#win-lose").html("<h1>Time's Up!</h1>");
        $("#win-lose").append(correctAnswer);
        $("#win-lose").append(timeImg);
        $("#win-lose").append(funFact);
        endOfOneQ();
    }

    function resetTime() {
        clearInterval(intervalID);
        countDownTime = 15;
    }

    function clockGo() {
        intervalID = setInterval(countDown, 1000)
    }

    function countDown() {
        countDownTime --
        var secondText = $("<span>")
        $("#timer").empty();
        $(secondText).text(countDownTime);
        $(secondText).addClass("timeTextStyleStrong")
        $("#timer").append("Time Remaining: ");
        $("#timer").append(secondText);
        $("#timer").append("<span class='timeTextStyle'> Seconds </span>");
    }

    // Function that populates the questions (populate question #qNum)..
    function questionPop(qNum) {
        // Shows the timer
        var secondText = $("<span>");
        $(secondText).text("15");
        $(secondText).addClass("timeTextStyleStrong")
        $("#win-lose").empty();
        $("#timer").text("Time Remaining: ");
        $("#timer").append(secondText);
        $("#timer").append(" Seconds");
        clockGo();

        var currentQ = questionList[qNum];
        $("#questionArea").text(currentQ.question);
        
        for (var i=0; i<4; i++) {
            var choice = $("<li>");
            $(choice).addClass("choiceClass");
            $(choice).attr("data-num", i);
            $(choice).text(currentQ.choiceArray[i]);
            $("#choiceArea").append(choice);
        }

        var timeOutID = setTimeout(function() {
            timesUp(qNum) 
          }, 15010)

        $(".choiceClass").on("click", function() {
            window.clearTimeout(timeOutID);
            console.log($(this).attr("data-num"));
            console.log(currentQ.choiceArray.indexOf(currentQ.answer));
            if ($(this).attr("data-num") == currentQ.choiceArray.indexOf(currentQ.answer)) {
                guessedRight(qNum);
            }

            else {
                guessedWrong(qNum);
            }
        })

    }


    $("#nameInput").keyup(function() {
        if ($("#nameInput").val() != "") {
            $("#start").removeAttr("disabled");
        } 

        else {
            $("#start").attr("disabled", "disabled");
        }
    });




    $("#start").on("click", function() {
        playerName = document.getElementById("nameInput").value;
        console.log(playerName);
        $("#start").attr("hidden", true);
        $("#instruction").attr("hidden", true);
        questionPop(questionCount); 
    })

    $(document).on("click", "#next", function() {
        questionCount ++;
        $("#next").attr("hidden", true);
        questionPop(questionCount);
    })

    $(document).on("click", "#end", function() {
        $("#end").attr("hidden", true);
        $("#win-lose").empty();
        $("#questionArea").text("The total score for " + playerName + " is: " + points + "!")
        if (points > 70) {
            var rankMsg = $("<div>");
            rankMsg.text("Wow, you are a true movie lover! Let's go watch movie together sometime!  ヽ(◕ヮ◕ヽ)");
            $("#questionArea").append(rankMsg);
        }

        else if (points > 40) {
            var rankMsg = $("<div>");
            rankMsg.text("You know some movies, but I'd encourage you to watch more!   ( ͡° ͜ʖ ͡°) ");
            $("#questionArea").append(rankMsg);
        }

        else {
            var rankMsg = $("<div>");
            rankMsg.text("Ummm.... Please go watch more movies before playing this game... ಠ_ಠ ");
            $("#questionArea").append(rankMsg);
        }
    })
        
})