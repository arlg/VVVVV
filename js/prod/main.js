// /*
//  * Main.js ---- VVVVV !
//  * Main file that handles the diferent screens / Menus + highscores calls
//  * This file is a little messy :/
//  * @author aurelieng http://www.arlg.me
//  */

// ----------------------------------------
// MAIN
// ----------------------------------------


// Create Namespace
var VVVVV = window.VVVVV || {};

VVVVV.Main = {
  init: function() {

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        CONSTS.IS_MOBILE = true;
        
        this.removeToolBar();
        
    }

    VVVVV.Preloader.init();
    
  },

  removeToolBar: function() {
    setTimeout(scrollTo, 0, 0, 1);
  }

};

VVVVV.Preloader = {

    currentNbLoaded : 0,
    totalImages : GAME_IMAGES.length,
    domEL : document.getElementById("preloadednumber"),

    init: function(){
        for(var i = 0; i < this.totalImages; i++) {
            var image = new Image();
            image.src = GAME_IMAGES[i];
            image.onload = function() {
              VVVVV.Preloader.onSingleLoaded();
            };
        }
    },

    onSingleLoaded: function(){
        this.currentNbLoaded++;

        this.domEL.innerHTML = (0.5 + (this.currentNbLoaded * 100) / this.totalImages) <<0;

        if(this.currentNbLoaded == this.totalImages){
            
            $("#preload").remove();

            //start the menu and game looop
            document.getElementById("sound-game-home").play();
            $("#vvvvv").fadeIn(1000, function(){

                VVVVV.Menus.init();
                VVVVV.Scores.get();
                VVVVV.Scores.init();

            });
        }
    }
};

VVVVV.GameLauncher = {
  init: function() {
    this.game = new Game(CONSTS.CANVAS_WIDTH, CONSTS.CANVAS_HEIGHT);
    this.game.frame();
  },

  play: function() {
    //$("#home").hide();
    VVVVV.Scores.alreadySent = false;
    GLOBAL_VARS.GAME_STARTED = true;
    this.game.startGame(); // inits the main timer
  }
};

//Animation before game starts
VVVVV.PreGameAnim = {
  init: function() {
    $("#home").addClass("launchanim");

    setTimeout(function() {
      VVVVV.PreGameAnim.launchAnimSanta();
    }, 1000);

  },

  launchAnimSanta: function() {

    document.getElementById("sound-game-home").pause();
    var bgSound = document.getElementById("sound-game-background");

    bgSound.play()
    bgSound.volume=0.7;


    //Jump animaation
    $(".santagif").attr("src", "img/home/santaintro.gif");

    setTimeout(function() {

      $(".santagif").addClass("goaway");

      //$(".santagif").fadeOut(200, function(){
          VVVVV.GameLauncher.play();
          $("#game-ui").addClass("active");
      //});
      
    }, 1900); ///1900

  }
};

//Launch of the game, we are on the Menus
VVVVV.Menus = {

  isEnded : false,


  init: function() {
    VVVVV.GameLauncher.init();
    this.initListeners();
  },

  initListeners: function() {

    $(".play-btn").on("click", function() {
        VVVVV.PreGameAnim.init();
    });

    $(".highscores-btn").on("click", function() {
        VVVVV.Menus.showHighscrores();
    });

    $("#end .highscores").on("click", function() {
        VVVVV.Menus.showHighscrores();
    });

    $("#end .replay").on("click", function() {
        //TODO :: Proper Game Reloading
        document.location.reload(true);
    });

    $(".credits-btn").on("click", function() {
        VVVVV.Menus.showCredits();
    });

    $("#highscores .back-btn").on("click", function() {
        VVVVV.Menus.showHome();
    });

  },

  showHighscrores: function(isEnded) {
    if(this.isEnded === false){
        $(".menu").hide();
        $("#highscores").show();
        $("#highscores .title").show();
    }else{
        $(".menu").hide();
        $("#highscores").show();
        $("#highscores .title").hide();

      $("#highscores .back-btn").on("click", function() {
          $(".menu").hide();
          $("#end").show();
      });

    }
    //Arrows
     $("#highscores .bottom").on("click", function(){
          if($("#highscores .table").height() > Math.abs(parseInt($("#highscores .table").css("top"), 10)-145))
              $("#highscores .table").filter(':not(:animated)').animate({"top": parseInt($("#highscores .table").css("top"), 10) - 145+"px"}, 300);
     });

     $("#highscores .top").on("click", function(){
          if((parseInt($("#highscores .table").css("top"), 10) < 0))
              $("#highscores .table").filter(':not(:animated)').animate({"top": parseInt($("#highscores .table").css("top"), 10) + 145+"px"}, 300);
     });
  },

  showCredits: function() {
      $(".menu").hide();
      $("#credits").show();

      var that = this;

      $("#credits .back-btn").on("click", function() {
        if(that.isEnded === false){
            VVVVV.Menus.showHome();
        }
        else{
             $(".menu").hide();
             $("#end").show();
        }
    });

  },

  showHome: function() {
      $(".menu").hide();
      $("#home").show();
  },

  showEnd: function(score) {
      this.isEnded = true;
      $(".menu").hide();
      $("#end").fadeIn(500, function(){
          $(".santawin").addClass("active");
      });

      $("#vvvvv-end").css("top", "237px"); // force the end gif to be at the bottom

      VVVVV.Scores.score = score;

      var strScore = score.toString().replace(".",":");

      $("#end").find("#endscore p").text(strScore);

  }
};

VVVVV.Scores = {

  alreadySent : false,
  score : 0,

  init: function() {
    this.initListeners();
    $("#end").find("#endscore p").removeClass("valid");
  },

  initListeners: function() {

    //Insert
    $(".form-score").submit(function(e) {
      e.preventDefault();

      if(VVVVV.Scores.alreadySent === true){
        alert("You have already sent your score. Y U NO replay ?");
          return false;
      }

      var name = $(".form-score .name").val();
      var score = VVVVV.Scores.score;
      if(name === "" || name == "enter your name") {
          $(".form-score .name").css("color", "red").focus();
          return false;
      } else {
          var dataString = 'name=' + name + '&score=' + score;
          $.ajax({
              type: "POST",
              url: "http://www.arlg.me/vvvvv/back/vvvvv.php",
              data: dataString,
              success: function() {

                  //Confirmation
                  $("#end").find("#endscore p").addClass("valid");

                  $("#highscores .table").attr("data-name", name);

                  VVVVV.Scores.alreadySent = true;

                  //refresh the list with that new score
                  VVVVV.Scores.get();
              }
          });
        return false;
      }
    });
  },

  //Retrieve
  get: function() {

    //1 - ajax call
    $.ajax({
      url: 'http://www.arlg.me/vvvvv/back/vvvvv-getscores.php',
      success: function(data) {
        VVVVV.Scores.fillHighscores(data);
      }
    });

  },

  fillHighscores: function(data) {
    var json = jQuery.parseJSON(data);

    var $parent = $("#highscores .table");
    $parent.empty();

    $.each(json, function(i) {

      if($parent.attr("data-name") == json[i].name) {
          $parent.append("<div class='thisplayer'><div>" + (i + 1) + "</div><div>" + json[i].name + "</div><div>---</div><div>" + json[i].score.toString().replace(".",":") + "</div></div>");
      } else {
          $parent.append("<div><div>" + (i + 1) + "</div><div>" + json[i].name + "</div><div>---</div><div>" + json[i].score.toString().replace(".",":") + "</div></div>");
      }

    });
  }
};


$(window).ready(function() {
  VVVVV.Main.init();
  VVVVV.SoundManager.init();
});