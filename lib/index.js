#! /usr/bin/env node

'use sctrict';
const filesSystem = require('fs');
const path = require('path');

const chalk = require('chalk');
const argv = require('yargs').argv;
const callerPath = require('caller-path');

/**
 * @param arrayPromise array of promises
 * @description This method create eject all the array of promises
 */
const PromiseWriteFile = (arrayPromise) => {
    Promise.all(arrayPromise)
        .then((values) => {
            console.log(chalk.green('Create Templates Successfull'));
        }).catch((error) => {
        console.log(chalk.red('Did not create the templates'));
    });
};

/**
 * @param HTMLFile the html file that is created
 * @param javaSciptFile the javascript file that is created
 * @param CSSFile the css file that is created
 * @description This method create the files that are required by the user by using the flags --ui or --logic
 */
const CreateFiles = (argv, HTMLFile, javaScriptFile, CSSFile, testFile, testFileSinon) => {
    try {
        if (argv.name) {
            if (argv.logic && argv.ui) {
                PromiseWriteFile([WriteFile(HTMLFile, 'text/html', 'html',`front_modules/${argv.name}`,argv.name), WriteFile(javaScriptFile, 'Javascript', 'js',`front_modules/${argv.name}`,argv.name), WriteFile(CSSFile, 'CSS', 'css',`front_modules/${argv.name}`,argv.name), WriteFile(testFile, 'Javascript', 'test.js','test',argv.name), WriteFile(testFileSinon, 'Javascript', 'sinon.js','test/sinonObjects',argv.name)]);
            } else if (argv.ui) {
                PromiseWriteFile([WriteFile(HTMLFile, 'text/html', 'html',`front_modules/${argv.name}`,argv.name), WriteFile(CSSFile, 'CSS', 'css',`front_modules/${argv.name}`,argv.name)]);
            } else if (argv.logic) {
                PromiseWriteFile([WriteFile(javaScriptFile, 'Javascript', 'js',`front_modules/${argv.name}`,argv.name), WriteFile(CSSFile, 'CSS', 'css',`front_modules/${argv.name}`,argv.name), WriteFile(testFile, 'Javascript', 'test.js','test',argv.name), WriteFile(testFileSinon, 'Javascript', 'sinon.js','test/sinonObjects',argv.name)]);
            } else {
                console.log(chalk.red('Not param received'));
            }
        } else {
            console.log(chalk.red('Not File name assigned'));
        }
    } catch (error) {
        /* istanbul ignore next */
        console.log(chalk.red(error));
    }
};

/**
 * @param string string to analice
 * @param substring String to search and be replace
 * @param nameArgv String to replace substring
 * @description  replace a get substring to nameArgv in a string
 * @returns treat string
 */
const ReplaceString = (string, substring, nameArgv) => {
    while (string.search(substring) !== -1) {
        string = string.replace(substring, nameArgv);
    }
    return string;
};

/**
 * @param nameFile it's the name of the file, it's assigned by the user
 * @description  method that allow read the data of the templates to create the files
 * @returns a promise, if reject returns the error otherwise returns resolve and read the files
 */
const ReadFile = (nameFile, nameArgv) => {
    const parseDirectory = path.parse(callerPath());
    return new Promise((resolve, reject) => {
        try{
            const data = filesSystem.readFileSync(`${parseDirectory.dir}/../templates/${nameFile}.txt`, 'utf8');
            resolve(ReplaceString(data, '<name>', nameArgv));
        }catch(error){
            /* istanbul ignore next */
            reject(error);
        }
    });
};

/**
 * @param contentFile it's the content inside the file
 * @param contentType it's the type of the content
 * @param abbrevation it's the file extension of the file
 * @description method that create the files that are requerid
 * @returns a reject if something bad happen, if everything is ok retunrs a resolve and create all the files that are required
 */
const WriteFile = (contentFile, contentType, abbreviation,nameFolder,nameFile) => {
    return new Promise((resolve, reject) => {
        try {
            filesSystem.writeFileSync(`${process.cwd()}/${nameFolder}/${nameFile}.${abbreviation}`, contentFile, {'Content-type': `${contentType}`});
            resolve(true);
        }catch (error) {
            /* istanbul ignore next */
            reject(error);
        }
    });
};

/**
 * @description method that create a directory inside of front_modules directory
 * @param firstDir this directive is the front_modules
 * @param name is the name to module (directory) to created
 * @returns a reject if something bad happen, if everything is ok returns a resolve and create a empty directory
 */
const WriteDirectory = (firstDir, name) => {
    return new Promise((resolve, reject) => {
        try {
            filesSystem.mkdirSync(`${process.cwd()}/${firstDir}/${name}`);
            resolve(true);
        } catch (error) {
            /* istanbul ignore next */
            if (error.code === 'EEXIST') {
                resolve(true);
            }
            /* istanbul ignore next */
            reject(error);
        }
    });
};

const WriteDirectories = (name, firstDir) => {
    return new Promise((resolve, reject) => {
        if (fsExistsSync(`${process.cwd()}/${firstDir}`)===false) {
            try {
                filesSystem.mkdirSync(`${process.cwd()}/${firstDir}`);
            } catch (error) {
                reject(error);
            }
        }
        WriteDirectory(firstDir, name)
            .then(data => {
                resolve(true);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const fsExistsSync = (myDir) => {
    return new Promise((resolve, reject) => {
        try {
            filesSystem.accessSync(myDir);
            resolve(true);
        } catch (error) {
            /* istanbul ignore next */
            reject(error);
        }
    });

};

/**
 * @description method that allow to create all the logic,
 * @returns a promise, if something is wrong show an error otherwise create the files and the directory
 */

const ReadAllFiles = (name) => {
    templateHTML = ReadFile('templateHTML', name);
    templateJS = ReadFile('templateJS', name);
    templateCSS = ReadFile('templateCSS', name);
    templateTEST = ReadFile('templateTEST', name);
    templateSINON = ReadFile('templateSINON', name);

    return [templateHTML, templateJS, templateCSS,templateTEST, templateSINON];
};

const CreateDirectory = (argv) => {
    let {HTMLFile, javaScriptFile, CSSFile} = '';

    let arrayPromises = ReadAllFiles(argv.name);
    arrayPromises.push(WriteDirectories(argv.name, 'front_modules'));
    arrayPromises.push(WriteDirectories('sinonObjects', 'test'));
    Promise.all(arrayPromises)
        .then((values) => {
            CreateFiles(argv, values[0], values[1], values[2], values[3], values[4]);
        }).catch((error) => {
        console.log(chalk.red(error));
    });
};


module.exports = {
    CreateDirectory,
    ReadAllFiles,
    WriteFile,
    WriteDirectories,
    WriteDirectory,
    ReadFile,
    ReplaceString,
    CreateFiles,
    PromiseWriteFile,
    fsExistsSync
};
