var web3js;
var web3socket;
     App={
         web3provider : null,
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
             
             return await App.getAccount();
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

    