document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady()
{
    console.log(navigator.camera);
	//alert("Device Ready");
    document.getElementById("camera").addEventListener("click",cameraTakePicture);
}

var image,text;

function cameraTakePicture()
{
    //alert("Opening Camera Please Capture Clear Picture of Card!");
    navigator.camera.getPicture(onSuccess, onFail, 
    {
        quality:50,
        destinationType: Camera.DestinationType.DATA_URL
    });
    function onSuccess(imageData)
    {
    //    if(imageData)
	//		alert("done"); //working : getting base64 image.
        sendImageToServer(imageData);//under testing 
        document.getElementById("cardImage").src ="data:image/jpeg;base64" + imageData;  //displaying image issue
    
    }
    
    function onFail(message)
    {
        alert('Failed because:' + message);
    }
}


function sendImageToServer(imageData) //i want to send the image data to this api and get the results back
{
////'alert("Function Started!")
var url = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDrxqAfizrJS1Otg05fQXDYKwpjxXKsOwg';
//var header = {'Content-Type': 'application/json'};
var body = {
        'requests': [{
            'image': {
                'content': imageData,
            },
            'features': [{
                'type': 'TEXT_DETECTION',
                'maxResults': 1,
            }]

        }]
    };
var response = jQuery.post(url,body);
console.log(response);
alert(response.textAnnotations);
//    text = response['responses'][0]['textAnnotations'][0]['description'] if len(response['responses'][0]) > 0 else ''
}




function extract_entities(text){
	alert("Ext_Ent");
	var url = 'https://language.googleapis.com/v1beta1/documents:analyzeEntities?key=AIzaSyDrxqAfizrJS1Otg05fQXDYKwpjxXKsOwg';
    //var header = {'Content-Type': 'application/json'};
    var body = {
        "document": {
            "type": "PLAIN_TEXT",
            "language": "EN",
            "content": text
        },
        "encodingType": "UTF8"
    };
    var response = JQuery.post(url,body);
	alert(response.status);
}
	
function extract_req_entities(){
	var ent = extract_entities(text)
    var required_entities = {'ORGANIZATION': '', 'PERSON': '', 'LOCATION': ''}
    var l=ent.length;
	for (i=0;i<l;i++)
		{
			t = ent['type'];
			if (JQuery.inArray(t,required_entities))
			{
				required_entities[t] += ent['name'];
			}
		}
		return required_entities;
}//post request to google nlp server followed by classified response



function confirmContactInfo()
{
    //confirm details with user
}

function saveContact()
{
    //save contact to phone
}   