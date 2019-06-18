'use strict';

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const blockchain = require("./blockchain");

class BlockchainServer{

constructor(){
    this.port = process.env.PORT || 4000;
    this.host = "localhost";
    this.app = express();
    this.http = http.BlockchainServer(this.app);
}
appConfig() {
    this.app.use(bodyParser.json());
    this.app.use(require("express").static("client"));
}
/*start app routing*/ 
includeRoutes(app){

    app.get("/mine_block",function(req,res){
        const previousBlock = blockchain.getLastBlock();
        const proof = blockchain.proofOfWork(previousBlock.proof);
        const previousHash = blockchain.generateHash(previousHash);
        const block = blockchain.createBlock({
            previousHash: previousHash,
            proof: proof
        });
        const jsonResponse = {
            message : 'Mined a new block',
            index : block.index,
            timestamp: block.timestamp,
            data: block.data,
            previous_hash: block.previous_hash
        }
        response.status(200).json(jsonResponse);
    });
    app.get("**", function(req,res){
        res.status(200).json({message:'404 page not found'});
    });
}
/**end app routing */
appExecute(){
    this.appConfig();
    this.includeRoutes(this.app);
    this.http.listen(this.port, this.host, ()=>{
        console.log('listening on http://${this.host}:${this.port}');
    });
}
}

const app = new BlockchainServer();
app.appExecute();