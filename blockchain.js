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
    /**last block of the blockchain */
    getLastBlock(){
        return this.chain[this.chain.length - 1] !== undeined ? this.chain[this.chain.length - 1] : null;
        }
        /** nounce block  */
    proofOfWork(previousProof){
        let newProof = 1;
        let checkProof = false;
        while(!checkProof){
            const blockHash = SHA256((Math.pow(newProof, 5) - Math.pow(previousProof, 5)).toString()).toString();
            if(blockHash.substring(0,5)==='00000'){
                checkProof = true;
            }else{
                newProof++;
            }
        }
        return newProof;
    }
    generateHash(block){
        return SHA256(JSON.stringify(block)).toString();
    }

    isChainValid(){
        const chain = this.chain;
        let previousBlock = chain[0];
        let blockIndex = 1;
        while(blockIndex < chain.length){
            const currentBlock = chain[blockIndex];
            if(currentBlock.previous_hash !== this.generateHash(previousBlock)){
                return false;

            }
            const previousProof =  previousBlock.proof;
            const currentProof = currentBlock.proof;
            const blockHash = SHA256((Math.pow(currentProof, 5) - Math.pow(previousProof, 5)).toString()).toString();
            if(blockHash.substring(0, 5) !== '00000'){
                return false;
            } 
            previousBlock = currentBlock;
            blockIndex += 1; 
            }
            return true;
        }
    }

