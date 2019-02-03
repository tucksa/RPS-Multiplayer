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

$("#signUp").click(function(e){
    e.preventDefault();
    var userName= $("#userName").val();
    var email = $("#emailInput").val();
    var password = $("#passwordInput").val();
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(user){
        user.updateProfile({userName:userName});
    });
    $("#userName").empty();
    $("#emailInput").empty();
    $("#passwordInput").empty();
    console.log("click");
});

$('#signIn').click(function(e){
    e.preventDefault();
    var email = $("#emailInput").val();
    var password = $("#passwordInput").val();
    firebase.auth().signInWithEmailAndPassword(email, password);
    $("#userName").empty();
    $("#emailInput").empty();
    $("#passwordInput").empty(); 
    console.log("click");

});


$("#addConvo").click(function(error){
    error.preventDefault();
    convo = $("#chat-input").val();
    database.ref("/chat").push().set({
        name:firebase.auth().currentUser.userName,
        convo:convo
    });
    $("#chat-input").html(" ");
});
database.ref("/chat").on("child_added", function(snapshot){
    var snap= snapshot.val();
    console.log(snap.name);
    var div = $("<div>")
    div.text(snap.name + ": ");
    div.append(snap.convo);
    $("#convo").append(div)
},
function(errObjects){
    consloe.log(errObjects.code)
    }
)


$("#playBtn1").click(function(){
    $("#playBtn1").css("display", "none");
    setInterval(rotate, 2500);
    function rotate(){
        $("#rps1 div").last().fadeOut(1000, function(){
            $(this).insertBefore($("#rps1 div").first()).show();
        });
    }
});   
$("#rpsPic").click(function(){
    user1Picked=$(this).attr("data-name").val()
})

$("#playBtn2").click(function(){
    $("#playBtn2").css("display", "none");
    setInterval(rotate, 2500);
    function rotate(){
        $("#rps2 div").last().fadeOut(1000, function(){
            $(this).insertBefore($("#rps2 div").first()).show();
        });
    }
});   
$("#rpsPic").click(function(){
    user2Picked=$(this).attr("data-name").val()
})

// firebase.auth().onAuthStateChanged(authStateChangedListener);
// function authStateChangeListener(user){
//     if(user){
//         //do login opperations
//         Chat.onlogin();
//         Game.onlogin();
//     }else {//signout
//         window.location.reload()
//     }

//how to code for each user seeing their own values- make array of players
//if array length is more than 2 warn new user they muust wait
//put button play functions under each user and hide of other array value
//use splice to keep array positons the same if player 2 stays and player1 leaves
// var connectionsRef = database.ref("/connections");
// var connectedRef = database.ref(".info/connected");

// connectedRef.on("value", function(snap) {
//     if (snap.val()) {
//       var con = connectionsRef.push(true);
//       con.onDisconnect().remove();
//     }
//   });

//   // When first loaded or when the connections list changes...
//   connectionsRef.on("value", function(snapshot) {
//     console.log(snapshot.numChildren());
//     var key = snapshot.child(key);
//     console.log(key);
//     if (snapshot.numChildren()==1){
//         console.log("wait for your opponent")
//     }else if (snapshot.numChildren()==2){
//         console.log("Play!")
//     }else 
//         console.log("Wait your turn...")
//   });
  