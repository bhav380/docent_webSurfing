// import {base64url} from 'base64url';
// /Users/bhave/webDev/docent/docent_webSurfing/node_modules/base64url/dist/base64url



{

window.addEventListener('load',function(){

    //  const encode = methods[0];
    //  const decode = methods[1];

    let blackList = function(){
        let blackListForm = $('#blacklist-link-form');



        blackListForm.submit(async function(e){

          const name = $('[name="user[name]"]').val();
          const displayName = $('[name="user[displayName]"]').val();
          


            const url = $(this).attr('action');

            const i = url.lastIndexOf("/challenge");

            const nextUrl = url.slice(0,i);

            console.log(nextUrl+"/////bc");

            const userid = nextUrl.slice(20);


            console.log(userid);

            e.preventDefault();


            return fetch(''+url, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json'
                }
              })
              .then(function(response) {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error('Response not OK');
                }
              })
              .then(function(json) {
                console.log('Response JSON:', json);
                const publicKey = {
                  challenge: base64url.decode(json.challenge),
                  rp: {
                    name: 'Your RP Name' // Replace with your RP (relying party) name
                  },
                  user: {
                    id:  Uint8Array.from(userid, c => c.charCodeAt(0)), // Replace with the actual user ID
                    name: name, // Replace with the actual user name
                    displayName: displayName // Replace with the actual user display name
                  },
                  pubKeyCredParams: [],
                  authenticatorSelection: {
                    authenticatorAttachment: 'platform',
                    userVerification: 'required'
                  },
                  attestation: 'none'
                };
        
                return navigator.credentials.create({ publicKey });
                
              })
              .then(function(credential) {

                console.log("hi");
                var body = {
                  id: credential.id,
                  // response: {
                  //   attestationObject:btoa(String.fromCharCode.apply(null, new Uint8Array(credential.response.attestationObject)))
                  // }

                  response: {
                    clientDataJSON: base64url.encode(credential.response.clientDataJSON),
                    authenticatorData: base64url.encode(credential.response.authenticatorData),
                  
                  
                    signature: base64url.encode(credential.response.signature),
                    userHandle: credential.response.userHandle ? base64url.encode(credential.response.userHandle) : null
                  }
                };

                console.log(credential);
                console.log(credential.authenticatorAttachment);

                if (credential.authenticatorAttachment) {
                  console.log("333");
                  body.authenticatorAttachment = credential.authenticatorAttachment;
                }

                console.log(body.response.clientDataJSON);

                
                
                return fetch(''+nextUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(body)
                 
                });


              })
              .then(function(response) {

                console.log(response);
                return response.json();
              })
              .then(function(json) {
                console.log("hiend");
                window.location.href = json.location;
                console.log("hi");
              })
              .catch(function(error) {
                console.log(error);
              });
          

            let adhaar = document.getElementById('adhaar');
            let illegal = document.getElementById('illegal');
            let webAddress = document.getElementById('web-address'); 
            adhaar.value = '';
            illegal.value = '';
            webAddress.value = '';

        });       
        
    }

    let blackListForm = $('#blacklist-link-form');

    navigator.credentials.get({ publicKey: { authenticatorSelection: { authenticatorAttachment: 'platform' } } })
    .then(function(credential) {
      const supportedAlgorithm = credential.response.getPublicKey().algorithm.name;
      console.log('Supported Algorithm:', supportedAlgorithm);

      // Add the supported algorithm to the pubKeyCredParams array
      blackListForm.submit(function(e) {
        const publicKey = {
          ...publicKey,
          pubKeyCredParams: [{ type: 'public-key', alg: supportedAlgorithm }]
        };
        e.preventDefault();
        navigator.credentials.create({ publicKey });
      });
    })
    .catch(function(error) {
      console.error('Error retrieving supported algorithm:', error);
    });

    blackList();

});
   
   
}



// return navigator.credentials.get({
//   publicKey: {
//     challenge: base64url.decode(json.challenge),
//     allowCredentials: [
//      { type: 'public-key',id:  base64url.decode('VjXl8fuJXIAqLg-BVrR5oeLLfee6gBGKXdMxo6xtMySugJfU2HNvTJk84T1DgFYtJDpDrwL2Bg_QM4xQwVAutA') },
//      { type: 'public-key', id: base64url.decode('noMuGuaaVLubAVjuS6Z2BYrrBpajYhtjnFgvSjk0IV1LJeVrupbpnw') }
//     ]
//   }
// });
















// {
//     let blackList = function(){
//         let blackListForm = $('#blacklist-link-form');

//         blackListForm.submit(function(e){

//             e.preventDefault();
//             $.ajax({

//                 type:'post',     
//                 url: $(this).attr('action'),
//                 data: blackListForm.serialize(),
                
//                 success: function(data){

//                     let type;
//                     if(data.message=='URL Reported!'){
//                         type = 'success';
//                     }else{
//                         type = 'error';
//                     }

//                     new Noty({
//                         theme:'relax',
//                         text:data.message,
//                         type: type,
//                         layout:'topRight',
//                         timeout : 1500
//                     }).show();
                  
//                     console.log('ajax operation succesfull');   
                    
//                 },error:function(error){
//                     console.log(error.responseText);
//                 }
        
//             }); 
//             let adhaar = document.getElementById('adhaar');
//             let illegal = document.getElementById('illegal');
//             let webAddress = document.getElementById('web-address'); 
//             adhaar.value = '';
//             illegal.value = '';
//             webAddress.value = '';

//         });       
        
//     }

//     blackList();
// }



