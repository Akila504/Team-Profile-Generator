const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./src/page-template.js");

const util = require('util');




// const OUTPUT_DIR = path.resolve('./output', "output");
// const outputPath = path.join('./output', "team.html");
// const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join('./output', "team.html");



// TODO: Write Code to gather information about the development team members, and render the HTML file.

//So use inquire to prompt the questions  
const writeFileAsync = util.promisify(fs.writeFile);
const ManagerQs = [
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

const EngineerQs = [
  {
    type: "input",
    name: 'EngineerName',
    message: "What is the Engineers name ?"

  },
  {
    type: "input",
    name: 'EngineerNameId',
    message: "What is the Engineers ID ?"
  },
  {
    type: "input",
    name: 'EngineerEmail',
    message: "What is the Engineers Email ?"

  },
  {
    type: "input",
    name: 'EngineerGithub',
    message: "What is the Engineers Github?"
  },
  {
    type: 'rawlist',
    name: 'menu',
    message: 'What do you want to do now ?',
    choices: ['Add an engineer', 'Add an Intern', 'Finish building the team']
  }
]


const InternQs = [

  {
    type: "input",
    name: 'InternName',
    message: "What is the Intern's name ?"

  },
  {
    type: "input",
    name: 'InternID',
    message: "What is the Interns ID ?"
  },
  {
    type: "input",
    name: 'InternEmail',
    message: "What is the Interns Email ?"

  },
  {
    type: "input",
    name: 'School',
    message: "What is the Interns School?"
  },
  {
    type: 'rawlist',
    name: 'menu',
    message: 'What do you want to do now ?',
    choices: ['Add an engineer', 'Add an Intern', 'Finish building the team']
  }
]


const promptUser = () =>
  inquirer.prompt(ManagerQs);


function addEngineer(employee) {
  return inquirer.prompt(EngineerQs).then((engineerData) => {
    // Create Engineer instance and add to employee array 
    employee.push(new Engineer(engineerData.EngineerName, engineerData.EngineerNameId, engineerData.EngineerEmail, engineerData.EngineerGithub));

    // Prompt user for next action
    return inquirer.prompt({
      type: 'list',
      name: 'nextAction',
      message: 'What do you want to do now?',
      choices: ['Add another engineer', 'Add an intern', 'Finish building the team']
    }).then(({ nextAction }) => {
      if (nextAction === 'Add another engineer') {
        return addEngineer(employee); // Recursively call addEngineer
      } else if (nextAction === 'Add an intern') {
        return addIntern(employee); // Call addIntern if user wants to add an intern
      } else {
        return employee; // Return the updated employee array if user chooses to finish
      }
    });
  });
}

// Function to add an intern
function addIntern(employee) {
  return inquirer.prompt(InternQs).then((internData) => {
    // Create Intern instance and add to employee array
    employee.push(new Intern(internData.InternName, internData.InternID, internData.InternEmail, internData.School));

    // Prompt user for next action
    return inquirer.prompt({
      type: 'list',
      name: 'nextAction',
      message: 'What do you want to do now?',
      choices: ['Add an engineer', 'Add another intern', 'Finish building the team']
    }).then(({ nextAction }) => {
      if (nextAction === 'Add an engineer') {
        return addEngineer(employee); // Call addEngineer if user wants to add an engineer
      } else if (nextAction === 'Add another intern') {
        return addIntern(employee); // Recursively call addIntern
      } else {
        return employee; // Return the updated employee array if user chooses to finish
      }
    });
  });
}
// Start by prompting for manager details
promptUser()
  .then((managerData) => {
    const employee = [
      new Manager(managerData.manager, managerData.id, managerData.email, managerData.officeNumber)
    ];
    // Prompt for adding more employees starting with an engineer
    if (managerData.menu === 'Finish building the team') {
      return employee;
    }
    if (managerData.menu === 'Add an engineer') {
      return addEngineer(employee);
    }

  })
  .then((employee) => {
    // Write employee data to HTML file
    return writeFileAsync(outputPath, render(employee));
  })
  .then(() => {
    console.log('Successfully wrote to index.html');
  })
  .catch((err) => {
    console.error(err);
  });