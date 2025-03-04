var web3js;
var web3socket;
     App={
         web3provider : null,
         wsprovider:null,
         account:'0x0',
         subscriber:null,
         websocketprovider:null,
         init:async function(){
             return await App.initweb3();
         },
         afterRender:async function(){
            
         },
         initweb3:async function(){
             if(typeof web3 !=='undefined'){
                 App.web3provider = window.ethereum;
                 web3js=new Web3(App.web3provider);
                 
             }
             else{
                 App.web3provider= Web3.providers.HttpProvider('http://localhost:7545');
                 web3js = new Web3(App.web3provider);
             }
             await App.configureWebSocker();
             return await App.getAccount();
         },
         configureWebSocker:async function(){
            var options = {
                timeout: 30000, // ms
            
                // Useful for credentialed urls, e.g: ws://username:password@localhost:8546
                headers: {},
            
                clientConfig: {
                  // Useful if requests are large
                  maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
                  maxReceivedMessageSize: 100000000, // bytes - default: 8MiB
            
                  // Useful to keep a connection alive
                  keepalive: true,
                  keepaliveInterval: 60000 // ms
                },
            
                // Enable auto reconnection
                reconnect: {
                    auto: true,
                    delay: 5000, // ms
                    maxAttempts: 5,
                    onTimeout: false
                }
            };
            
            App.wsprovider = new Web3.providers.WebsocketProvider('ws://localhost:7545', options);
            web3socket = new Web3(App.wsprovider);
            console.log(web3socket);
         },
         getAccount: async function(){
            
            var accountInterval = setInterval(function() {
                 web3js.eth.getAccounts().then(async function(accounts){
                         if(App.account!==accounts[0]){
                                 App.account = accounts[0];
                                 App.render();   
                            
                         }                     
                 });
            },100);
             
         },
         render: async function() {
            await App.afterRender();
         }
     };

    