
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://neuraapp-d16f5.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("users");
// Attach an asynchronous callback to read the data at our posts reference
ref.on("value", function (snapshot) {
    console.log(snapshot.val());
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

//SALVA
var usersRef = ref.child("users");
usersRef.set({
    alanisawesome: {
        date_of_birth: "June 23, 1912",
        full_name: "Alan Turing"
    },

});

usersRef.push({
    gracehop: {
        date_of_birth: "December 9, 1906",
        full_name: "Grace Hopper"
    }
})

//ATUALIZA
var hopperRef = usersRef.child("gracehop");
hopperRef.update({
    "nickname": "Amazing Grace"
});

usersRef.set({}) //set sobrescreve a informacao do banco