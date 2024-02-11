const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./src/page-template.js");

const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);


// const OUTPUT_DIR = path.resolve('./output', "output");
// const outputPath = path.join('./output', "team.html");
// const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join('./output', "team.html");





// TODO: Write Code to gather information about the development team members, and render the HTML file.

//So use inquire to prompt the questions  

const questions = [
  {
    type: "input",
    name: 'manager',
    message: "What is your name ?"

  },
  {
    type: "input",
    name: 'id',
    message: "What is your id ?"
  },
  {
    type: "input",
    name: 'email',
    message: "What is your email ?"
  }
  ,

  {
    type: "input",
    name: 'officeNumber',
    message: "What is your office number ?"
  }
  ,
  {
    type: 'rawlist',
    name: 'menu',
    message: 'What do you want to do now ?',
    choices: ['Add an engineer', 'Add an Intern', 'Finish building the team']
  }
]


const promptUser = () =>
  inquirer.prompt(questions);


promptUser()
  .then((data) => {
    if (data.menu === 'Finish building the team') {
      process.exit();
    }
    else {
      inquirer.prompt([
        {
          type: "confirm",
          name: "choice",
          message: "Play Again?"
        }])
    }
  }
  ).catch((err) => console.log(err))

// quit(); {
//   console.log("\nGoodbye!");
//   process.exit(0);
// }




// const employee = [
//   new Manager('akila', 'questions.', 'questionsemail', 'officeNumber'),
//   new Engineer('akila', 'questions.', 'questionsemail', 'officeNumber'),
//   new Intern('akila', 'questions.', 'questionsemail', 'officeNumber')]


// writeFileAsync('index.html', render(employee))
//   .then(() => console.log('Successfully wrote to index.html'))
//   .catch((err) => console.error(err));


