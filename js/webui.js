// **** WEBRTC UI **** //

var video;
var bandwidth;
var conference;
var pin;
var id_selfview;
var id_muteaudio;
var id_mutevideo;
var cleanup;
var class_mute_on = "participant_action fa fa-microphone-slash fa-fw red";
var class_mute_off = "participant_action fa fa-microphone fa-fw green";


var rtc = null;

var trans = Array();
trans['BUTTON_MUTEAUDIO'] = "Mute Mic";
trans['BUTTON_UNMUTEAUDIO'] = "Unmute Mic";
trans['BUTTON_MUTEVIDEO'] = "Mute Video";
trans['BUTTON_UNMUTEVIDEO'] = "Unmute Video";
trans['BUTTON_FULLSCREEN'] = "Fullscreen";
trans['BUTTON_NOPRES'] = "No Presentation Active";
trans['BUTTON_SHOWPRES'] = "View Presentation";
trans['BUTTON_HIDEPRES'] = "Hide Presentation";
trans['BUTTON_SHOWSELF'] = "Show Selfview";
trans['BUTTON_HIDESELF'] = "Hide Selfview";
trans['BUTTON_SCREENSHARE'] = "Share Screen";
trans['BUTTON_STOPSHARE'] = "Stop Sharing";
trans['HEADING_ROSTER_LIST'] = "Participants";
trans['TITLE_HOSTS'] = "Hosts";
trans['TITLE_GUESTS'] = "Guests";

/* ~~~ SETUP AND TEARDOWN ~~~ */


function finalise(event) {
    rtc.disconnect();
    video.src = "";
}

function remoteDisconnect(reason) {
    cleanup();
    alert(reason);
    window.removeEventListener('beforeunload', finalise);
    window.close();
}

function doneSetup(videoURL, pin_status) {
    console.log("PIN status: " + pin_status);
    rtc.connect(pin);
}

function connected(videoURL) {
    video.poster = "";
    if (typeof(MediaStream) !== "undefined" && videoURL instanceof MediaStream) {
        video.srcObject = videoURL;
    } else {
        video.src = videoURL;
    }
}


function muteAudioStreams() {
    if (!id_muteaudio.classList.contains("inactive")) {
        muteAudio = rtc.muteAudio();
        id_muteaudio.classList.toggle('selected');
        if (muteAudio) {
            id_muteaudio.textContent = trans['BUTTON_UNMUTEAUDIO'];
        } else {
            id_muteaudio.textContent = trans['BUTTON_MUTEAUDIO'];
        }
    }
}



function initialise(node, conference, userbw, name, userpin) {
    video = document.getElementById("video");
    id_selfview = document.getElementById('id_selfview');
    id_muteaudio = document.getElementById('id_muteaudio');
    id_mutevideo = document.getElementById('id_mutevideo');
    id_fullscreen = document.getElementById('id_fullscreen');
    id_screenshare = document.getElementById('id_screenshare');
    id_presentation = document.getElementById('id_presentation');

    console.log("Video: " + video);
    console.log("Bandwidth: " + userbw);

    pin = userpin;
    bandwidth = parseInt(userbw);
    //name = decodeURIComponent(username).replace('+', ' ');

    rtc = new PexRTC();

    window.addEventListener('beforeunload', finalise);

    rtc.onSetup = doneSetup;
    rtc.onConnect = connected;
    //rtc.onError = handleError;
    rtc.onDisconnect = remoteDisconnect;
    //rtc.onHoldResume = holdresume;
    //rtc.onRosterList = updateRosterList;
    //rtc.onPresentation = presentationStartStop;
    //rtc.onPresentationReload = loadPresentation;
    //rtc.onScreenshareStopped = unpresentScreen;
    //rtc.onPresentationConnected = loadPresentationStream;
    //rtc.onPresentationDisconnected = remotePresentationClosed;


    rtc.makeCall(node, conference, name, bandwidth);
}

// function initialise(node, conference, userbw, name, userpin) {
//    video = document.getElementById("video");
//    console.log("Bandwidth: " + userbw);
//    console.log("Conference: " + conference);

//    bandwidth = parseInt(userbw);

//    rtc = new PexRTC();

//    window.addEventListener('beforeunload', finalise);

 //   rtc.onSetup = doneSetup;
 //   rtc.onConnect = connected;
 //   rtc.onError = remoteDisconnect;
 //   rtc.onDisconnect = remoteDisconnect;

 //   rtc.makeCall(node, conference, name, bandwidth);
// }



//var vid = document.getElementById("video");

//function enableMute() { 
 // vid.muted = true;
//} 

//function disableMute() { 
//  vid.muted = false;
//} 

//function checkMute() { 
 // alert(vid.muted);
//} 


