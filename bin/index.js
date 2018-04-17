#!/usr/bin/env node
'use sctrict';
const filesSystem = require('fs');

const chalk = require('chalk');
const argv = require('yargs').argv;

const createDirectory = () =>{
    let nameFile = '';

    /**
     * the directory from witch the script was called:
     * @param path
     */
    const path = process.cwd();


    /**
     * This method only create a file with extension .html and .css if the flag is --ui
     * if the flag is --logic it'll create a file with extension .js
     */

    if (argv.name && argv.ui) {

        nameFile = argv.name;
        const HTMLFile = `<!DOCTYPE html>\n<html lang = "en" >\n\t<head>\n\t\t<meta charset="utf-8">\n\t\t<title>${nameFile}</title>\n\t</head>\n\t<body>\n\t\t<h1></h1>\n\t\t<script type="text/javascript" src="${nameFile}.js"></script>\n\t</body>\n</html>`;        
        const CSSFile = `${nameFile}{\n}`;
        filesSystem.writeFileSync(`${path}/service-${nameFile}.html`, HTMLFile, { 'Content-Type': 'text/html' });
        filesSystem.writeFileSync(`${path}/service-${nameFile}.css`, CSSFile, { 'Content-type': 'CSS' });
        console.log(chalk.blue(`The files ui has been created sucessfully in: ${path}/`));

    }else if(argv.name && argv.logic){
        nameFile = argv.name;
        const JavaScriptFile = `'use strict';\n(function ${nameFile}(){\n\n}());`;
        filesSystem.writeFileSync(`${path}/service-${nameFile}.js`, JavaScriptFile, { 'Content-type': 'Javascript' });
        console.log(chalk.blue(`The file js has been created sucessfully in: ${path}/`));
    }else{
        console.log(chalk.red('Not File name assigned'));
    }
    
};

module.exports = createDirectory;

