console.log("hello")
var config = {
    apiKey: "AIzaSyA4GYa-JDS44n8D0RZSxmkAgyVMdEQRoM4",
    authDomain: "rps-multiplayer-sjt.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-sjt.firebaseio.com",
    projectId: "rps-multiplayer-sjt",
    storageBucket: "rps-multiplayer-sjt.appspot.com",
    messagingSenderId: "51666473404"
  };
firebase.initializeApp(config);

var database= firebase.database();
var convo = "";
var user1Picked = "";
var user2Picked= "";
var p1rot;
var p2rot;
var p1gone= false;
var p2gone= false;

var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
connectedRef.on("value", function(snap) {
    if (snap.val()) {
      var con = connectionsRef.push(true);
      con.onDisconnect().remove();
    }
  });

connectionsRef.on("value", function(snapshot) {
    if(snapshot.numChildren()==1){
        $("#status").text("wait for opponent");
    }else if (snapshot.numChildren()==2){
        $("#status").text("Play!");
    }else if (snapshot.numChildren()>2){
        $("#status").text("Wait your turn...");
    }
  });

$("#addConvo").click(function(error){
    error.preventDefault();
    convo = $("#chat-input").val();
    database.ref("/chat").push({
        convo:convo
    });
    $("#chat-input").empty();
});
database.ref("/chat").on("child_added", function(snapshot){
    var snap= snap;
    var div = $("<div>")
    div.append(snap.convo);
    $("#convo").append(div)
},
function(errObjects){
    consloe.log(errObjects.code)
    }
)

$("#playBtn").click(function(){
    $("#playBtn").css("display", "none");
    p1rot= setInterval(rotate, 2500);
    function rotate(){
        $("#rps1 div").last().fadeOut(1000, function(){
            $(this).insertBefore($("#rps1 div").first()).show();
        });

    }
});  

$("#play2Btn").click(function(){
    $("#play2Btn").css("display", "none");
    p2rot= setInterval(rotate, 2500);
    function rotate(){
        $("#rps2 div").last().fadeOut(1000, function(){
            $(this).insertBefore($("#rps2 div").first()).show();
        });
    }
})


$(".rps1Pic").click(function(){
    user1Picked=$(this).attr("data-name");
    $("#rps1").css("display", "none");
    clearInterval(p1rot);
    console.log(user1Picked);
    p1gone=true;
    database.ref("/players").push().set({
        user1Picked:user1Picked,
        turn1:p1gone
    })
})

$(".rps2Pic").click(function(){
    user2Picked=$(this).attr("data-name");
    $("#rps2").css("display", "none");
    clearInterval(p2rot);
    console.log(user2Picked);
    p2gone=true;
    database.ref("/players").push().set({
        user2Picked:user2Picked,
        turn2:p2gone
    })
})

database.ref("/players").on("value", function(snapshot){
    var snap= snapshot.val();
    if(snap.turn1== true && snap.turn2== true){
    $("#results1").text(snap.user1Picked);
    user1Picked = snap.user1Picked;
    $("#results2").text(snap.user2Picked);
    user2Picked = snap.user2Picked
    $("#results1").css("display", "block");
    $("#results2").css("display", "block");
        if(snap.user1Picked=="rock" && snap.user2Picked=="paper"){
            $("#results1").append("You Lose...");
            $("#results2").append("You Win!");
        }
        if(sanp.user1Picked=="rock" && snap.user2Picked=="scissor"){
            $("#results1").append("Rock- You Win!");
            $("#results2").append("Scissor- You Lose...");
        }
        if(snap.user1Picked=="paper" && snap.user2Picked=="rock"){
            $("#results1").append("You Win!");
            $("#results2").append("You Lose...");
        }
        if(snap.user1Picked=="paper" && snap.user2Picked=="scissor"){
            $("#results1").append("You Lose...");
            $("#results2").append("You Win!");
        }
        if(snap.user1Picked=="scissor" && snap.user2Picked=="rock"){
            $("#results1").append("You Lose...");
            $("#results2").append("You Win!");
        }
        if(snap.user1Picked=="scissor" && snap.user2Picked=="paper"){
            $("#results1").append("You Win!");
            $("#results2").append("You Lose...");
        }else{
            $("#results1").append("You picked the same... It's a Tie!");
            $("#results2").append("You picked the same... It's a Tie!");        
        }
    $("#restart").css("display", "block");
    }
})



$("#restart").click(function(){
    user1Picked = "";
    user2Picked= "";
    p1gone= false;
    p2gone= false;
    $("#playBtn").css("display", "block");
    $("#play2Btn").css("display", "block");
    database.ref("/players").set({
        user1Picked:user1Picked,
        turn1:p1gone,
        user2Picked:user2Picked,
        turn2:p2gone
    })

})