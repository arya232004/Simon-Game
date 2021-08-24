var buttoncolors=["red","blue","green","yellow"];
var randomChosenColour; 
var gamepattern=[];
var userclickedpattern=[];
var userchoosencolor;
var level=0;
var started=false;
$(document).keydown(function()
{ 
   if(!started)
   {    $("#level-title").text("Level " + level);
      nextsequence();
    
      started=true;
   }
})

$( ".btn" ).click(function() {
      
      userchoosencolor=$(this).attr("id");

      userclickedpattern.push(userchoosencolor);
      
     playsound(userchoosencolor);

     animatepress(userchoosencolor);
     checkanswer(userclickedpattern.length-1);
    });

function nextsequence()
{  
   userclickedpattern=[];
   level++;
   $("#level-title").text("Level " + level);
   var randomnumber=Math.floor(Math.random()*4);
  
   randomChosenColour=buttoncolors[randomnumber];
  

   gamepattern.push(randomChosenColour);
 

   $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   var audio=new Audio("sounds/"+randomChosenColour+".mp3");
   audio.play();
}
function playsound(name)
{   
   var audio=new Audio("sounds/"+name+".mp3");
   audio.play();
}

function animatepress(currentcolor)
{  
  $("#"+currentcolor).addClass("pressed");
  setTimeout(() => {  $("#"+currentcolor).removeClass("pressed");}, 100);
   
}

function checkanswer(currentlevel)
{
  console.log(currentlevel);
  if(gamepattern[currentlevel]===userclickedpattern[currentlevel])
  {  
     if(userclickedpattern.length===gamepattern.length)
     {
   $("#level-title").text("Level "+level);
   setTimeout(function () {
      nextsequence();
    }, 1000);
  }
  }

  else
  {  $("h1").text("Game Over, Press Any Key to Restart");
   console.log("wrong");
   var sound=new Audio("sounds/wrong.mp3")
   sound.play();
   $("body").addClass("game-over")
   setTimeout(() => {  $("body").removeClass("game-over");}, 200);
   startover();
  }

}
function startover()
{ 
 level=0;
 gamepattern=[];
 started=false;
}