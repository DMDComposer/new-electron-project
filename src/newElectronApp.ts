#! /usr/bin/env node
import { copySync } from "fs-extra";
import chalk from "chalk";
import figlet from "figlet";
import prompts from "prompts";
import { exec } from "child_process";

const template_locations = `${__dirname}/templates/`;
const cwd = process.cwd();

main ();

function Intro () {
    console.log("\n\n");
    console.log(
        chalk.cyan(
          figlet.textSync('electron:', { horizontalLayout: 'full' })
        )
      );

      console.log(
        chalk.cyan(
          figlet.textSync('templates:', { horizontalLayout: "full"})
        )
      );

      console.log(chalk.greenBright("    Select a template to generate in your current working directory."));
      console.log(chalk.yellowBright.bold("    After the copy of files is finished it can take a few seconds to install\n"));
      
}

function Success () {
    console.log(chalk.cyanBright.bold.italic("      [SUCCESS]: ") + chalk.italic.whiteBright(`\n        Created the project files inside: `) + chalk.greenBright(`${cwd}\n`));
}

function InstallFailure () {
    console.log(chalk.redBright.bold.italic("      [ERROR INSTALLING]: ") + chalk.italic.whiteBright(`\n        Could not install dependecies. This could be a issue with permisions.: `) + chalk.greenBright(`${cwd}\n`));
}

async function command (c: string) {
    return new Promise((res, rej) => {
        exec(c, (error, stdout, stderr) => {
            if (error) {
                console.log(chalk.red(`error: ${error.message}`));
                rej(error);
            }
            if (stderr) {
                console.log(chalk.grey`stderr: ${stderr}`);
                res(true);
            }
      
            res(true);
        });
    })

}

async function main () {
    Intro();

    let decision = await givePrompts();
    if (decision.template) {
        if (decision.template == "exit") return;
        copySync(template_locations + decision.template, cwd + "/");
        
        command("npm i")
        .then(Success)
        .catch(InstallFailure);
    
    } else {
        console.log(chalk.red.bold("\n\nthere was an error creating the template. Make sure you are already inside the folder when trying to begin."));
    }

}
 



async function givePrompts () {
    const response = await prompts([
        {
          type: 'select',
          name: 'template',
          message: 'Pick Template to Be Generated',
          choices: [
            { title: 'Javascript Electron Application', value: 'normal' },
            { title: 'Typescript Electron App', value: 'tsc' },
            { title: 'Typescript Sample App', value: 'tsc-sample'},
            { title: 'Exit', value: 'exit'}
          ],
        }
      ]);

      console.log("\n\n")

    return response;
}