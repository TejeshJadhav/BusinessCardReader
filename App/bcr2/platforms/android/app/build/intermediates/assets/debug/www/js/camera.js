document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady()
{
    console.log(navigator.camera);
    document.getElementById("camera").addEventListener("click",cameraTakePicture);
}
var image;
function cameraTakePicture()
{
    alert("Opening Camera Please Capture Clear Picture of Card!");
    navigator.camera.getPicture(onSuccess, onFail, 
    {
        quality:50,
        destinationType: Camera.DestinationType.DATA_URL
    });
    function onSuccess(imageData)
    {
        alert(imageData);  //working getting encrypted image.
        document.getElementById("cardImage").src ="data:image/jpeg;base64" + imageData;  //displaying image issue
    
    }
    
    function onFail(message)
    {
        alert('Failed because:' + message);
    }
}
function sendImageToServer()
{
    //post request to google vision server followed by response text
}
function sendTextToServer()
{
    //post request to google nlp server followed by classified response
}
function confirmContactInfo()
{
    //confirm details with user
}
function saveContact()
{
    //save contact to phone
}