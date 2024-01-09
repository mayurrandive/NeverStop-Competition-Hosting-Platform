export const temp = require("./images/temp.png");
export const logo1 = require("./images/temp.png");
export const comp1 = require("./images/comp1.png");
export const comp2 = require("./images/comp2.png");
export const comp3 = require("./images/comp3.png");
export const comp4 = require("./images/comp4.png");
export const comp5 = require("./images/comp5.png");
export const comp6 = require("./images/comp6.png");

export let comp= [];

for(let i=1; i<=6;i++){
    comp.push(require(`./images/comp${i}.png`));
}