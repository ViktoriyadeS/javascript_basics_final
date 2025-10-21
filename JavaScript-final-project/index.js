'use strict';

const mockData = require('./mockData.js').data;
const prompt = require('prompt-sync')();

console.log('Starting to create user profile');
let myUserProfile = {};

//mock user for matching 
/*
myUserProfile = {
  first_name: 'vika',
  last_name: 'princess',
  age: 40,
  gender: 'F',
  location: 'city',
  gender_interest: 'M',
  min_age_interest: 40,
  max_age_interest: 60
}
*/


//First name
let firstName = '';
while (!firstName.trim()) {
  firstName = prompt("What is your first name? ");
}
myUserProfile.first_name = firstName.trim();

//Last name
let lastName = '';
while (!lastName.trim()) {
  lastName = prompt("What is your last name? ");
}
myUserProfile.last_name = lastName.trim();

//Age (must be a number >= 18)
let age;
while (true) {
  age = Number(prompt("How old are you? "));
  if (!isNaN(age) && age >= 18) break;
  console.log("You must be 18 or older. Please enter a valid age.");
}
myUserProfile.age = age;

//Gender (only M, F, X)
let gender = '';
while (true) {
  gender = prompt("What is your gender? (M = Male, F = Female, X = Not specified): ").trim().toLowerCase();
  if (["m", "f", "x"].includes(gender) && gender.length === 1) break;
  console.log("Invalid input. Please type M, F, or X.");
}
myUserProfile.gender = gender.toUpperCase();

//Location (only city/rural)
let location = '';
while (true) {
  location = prompt("Are you located in the city or rural area? (city/rural): ").trim().toLowerCase();
  if (["city", "rural"].includes(location)) break;
  console.log("Invalid input. Please type 'city' or 'rural'.");
}
myUserProfile.location = location;

//Gender interest
let genderInterest = '';
while (true) {
  genderInterest = prompt("Which gender are you interested in? (F/M/X): ").trim().toLowerCase();
  if (["m", "f", "x"].includes(genderInterest)) break;
  console.log("Invalid input. Please type F, M, or X.");
}
myUserProfile.gender_interest = genderInterest.toUpperCase();

//Minimum age of interest
let minAge;
while (true) {
  minAge = Number(prompt("What is the minimum age that your potential partner should have? "));
  if (!isNaN(minAge) && minAge >= 18) break;
  console.log("Invalid age. Minimum must be 18 or older.");
}
myUserProfile.min_age_interest = minAge;

//Maximum age of interest
let maxAge;
while (true) {
  maxAge = Number(prompt("What is the maximum age your potential partner should be? "));
  if (!isNaN(maxAge) && maxAge >= minAge) break;
  console.log(`Invalid input. Maximum must be a number and at least ${minAge}.`);
}
myUserProfile.max_age_interest = maxAge;

console.log("Done creating user profile:");
console.log(myUserProfile);
console.log("Start matching...")
const matchUsers = (data, user) => {
    let count = 0;
    let matched = [];
    const numMatchedProfiles = data.forEach((item) => { 
        if(item.age >= user.min_age_interest && item.age <= user.max_age_interest){
            //check if user age is in range
            if(user.age >= item.min_age_interest && user.age <= item.max_age_interest){
                //check gender
                if(user.gender_interest === item.gender){
                    if(item.gender_interest === user.gender){
                        if(user.location === item.location){
                            count += 1;
                            matched.push({ first_name: item.first_name, last_name: item.last_name, age: item.age , location: item.location})
                        }
                    }
                }
            }
        }
    })
    console.log(`Found ${count} matches`);
    console.log(matched)
};

matchUsers(mockData,myUserProfile)

