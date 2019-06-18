'use strict';

const SHA256 = require("crypto-js/sha256");

class Blockchain {
    constructor(){
        this.chain = [];
        this.createBlock({previousHash : 0, proof : 1});
    }
    createBlock({ previousHash, proof }){
        const block = {
            index : this.chain.length + 1,
            timestamp : (+new Date()).toString(),
            data : Math.random(),
            proof : proof,
            previous_hash : previousHash
        }
        this.chain.push(block);
        return block;
    }
}