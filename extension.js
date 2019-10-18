// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const lang = require('./lang.js');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "getter-setter-generator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let generateGetterSetter = vscode.commands.registerCommand('extension.generateGetterSetter', function () {
		// get the currently open file
		const editor = vscode.window.activeTextEditor;


		// if no editor is open, do nothing
		if (!editor) {
			return;
		}

		let language = vscode.window.activeTextEditor.document.languageId;

		const hasSelection = !editor.selection.isEmpty;

		// check if the user selected something, otherwise display error message
		if (hasSelection) {

			let text = editor.document.getText(editor.selection);
			let generatedCode;

			if (language === 'java' || language === 'php' || language === 'python' || language === 'cpp' || language === 'javascript' || language === 'typescript' ) {
				generatedCode = generateGetterSetterAutomatically(text, "both", language);			
			} else {
				vscode.window.showInformationMessage('Language currently unsupported, please submit an Issue for this package!')
			}

			// gets the current editor and appends the getters/setters 
			editor.edit(
				edit => editor.selections.forEach(
					selection => {
						edit.insert(selection.end, generatedCode); // C# -> replace selection
					}
				)
			);

			vscode.window.showInformationMessage('Getter/Setter were generated');
		} else {
			vscode.window.showErrorMessage('Nothing was selected!');
		}
	});

	let generateGetter = vscode.commands.registerCommand('extension.generateGetter', function () {
		// get the currently open file
		const editor = vscode.window.activeTextEditor;


		// if no editor is open, do nothing
		if (!editor) {
			return;
		}

		let language = vscode.window.activeTextEditor.document.languageId;

		const hasSelection = !editor.selection.isEmpty;

		// check if the user selected something, otherwise display error message
		if (hasSelection) {

			let text = editor.document.getText(editor.selection);
			let generatedCode;

			if (language === 'java' || language === 'php' || language === 'python' || language === 'cpp' || language === 'javascript' || language === 'typescript' ) {
				generatedCode = generateGetterSetterAutomatically(text, "getter", language);			
			} else {
				vscode.window.showInformationMessage('Language currently unsupported, please submit an Issue for this package!')
			}

			// gets the current editor and appends the getters/setters 
			editor.edit(
				edit => editor.selections.forEach(
					selection => {
						edit.insert(selection.end, generatedCode); // C# -> replace selection
					}
				)
			);

			vscode.window.showInformationMessage('Getter were generated');
		} else {
			vscode.window.showErrorMessage('Nothing was selected!');
		}
	});

	let generateSetter = vscode.commands.registerCommand('extension.generateSetter', function () {
		// get the currently open file
		const editor = vscode.window.activeTextEditor;


		// if no editor is open, do nothing
		if (!editor) {
			return;
		}

		let language = vscode.window.activeTextEditor.document.languageId;

		const hasSelection = !editor.selection.isEmpty;

		// check if the user selected something, otherwise display error message
		if (hasSelection) {

			let text = editor.document.getText(editor.selection);
			let generatedCode;

			if (language === 'java' || language === 'php' || language === 'python' || language === 'cpp' || language === 'javascript' || language === 'typescript' ) {
				generatedCode = generateGetterSetterAutomatically(text, "setter", language);			
			} else {
				vscode.window.showInformationMessage('Language currently unsupported, please submit an Issue for this package!')
			}


			// gets the current editor and appends the getters/setters 
			editor.edit(
				edit => editor.selections.forEach(
					selection => {
						edit.insert(selection.end, generatedCode); // C# -> replace selection
					}
				)
			);

			vscode.window.showInformationMessage('Setter were generated');
		} else {
			vscode.window.showErrorMessage('Nothing was selected!');
		}
	});


	context.subscriptions.push(generateGetterSetter);
	context.subscriptions.push(generateGetter);
	context.subscriptions.push(generateSetter);
}
exports.activate = activate;

/**
 * @typedef {"both" | "getter" | "setter"} returnableType 
 */

function generateGetterSetterAutomatically(text, returnableType, language){
	let selectedTextArray = text.split('\r\n').filter(e => e); //removes empty array values (line breaks)
	let generatedCode = '';

	for (const text of selectedTextArray) {

		if(text.startsWith('@') && language === 'java'){
			continue;
		}

		let selectedText, indentSize, variableType, variableName;

		selectedText = text.replace(';', '').trim(); //removes all semicolons 
		indentSize = text.split(selectedText.charAt(0))[0]; //get the indent size for proper formatting


		if (language === 'java') {
			let hasModifier = selectedText.split(' ').length == 3;
	
			if (hasModifier) {
				variableType = selectedText.split(' ')[1];
				variableName = selectedText.split(' ')[2];
			} else {
				variableType = selectedText.split(' ')[0];
				variableName = selectedText.split(' ')[1];
			}
		} else if (language === 'php'){
			let isConstructorVariable = selectedText.includes('$this->');
	
			if (isConstructorVariable) {
				variableName = selectedText.split('>')[1].split(' ')[0];
			} else {
				variableName = selectedText.split('$')[1];
			}
		} else if (language === 'python'){
			let isConstructorVariable = selectedText.includes('self.');
	
			if (isConstructorVariable) {
				variableName = selectedText.split('.')[1].split(' ')[0];
			} else {
				variableName = selectedText.split('=')[0].trim();
			}
		} else if (language === 'cpp'){
			variableType = selectedText.split(' ')[0];
			variableName = selectedText.split(' ')[1];	
		} else if (language === 'javascript' || language === 'typescript'){
			let isConstructorVariable = selectedText.includes('.');
	
			if (isConstructorVariable) {
				variableName = selectedText.split('.')[1].split(' ')[0];
			} else {
				variableName = selectedText.split(':')[0];
			}		
		}
		
		if (variableName === null || variableName === undefined) {
			vscode.window.showErrorMessage('Faulty Selection. Please make sure you select a variable.')
			return; 
		}

		variableName.trim();
		variableType && variableType.trim();
		
		let code = '';
		let langObject = lang[language];
		let variableNameUp = variableName.charAt(0).toUpperCase() + variableName.slice(1);

		if (returnableType === "both") {
			let getterPlain = langObject.getter
			let setterPlain = langObject.setter				
		
			let getter = getterPlain.replace(/indentSize/g, indentSize).replace(/variableType/g, variableType).replace(/variableNameUp/g, variableNameUp).replace(/variableName/g, variableName);
			let setter = setterPlain.replace(/indentSize/g, indentSize).replace(/variableType/g, variableType).replace(/variableNameUp/g, variableNameUp).replace(/variableName/g, variableName);

			code = getter + setter;		
		} else if (returnableType === "getter"){
			let getterPlain = langObject.getter		
			let getter = getterPlain.replace(/indentSize/g, indentSize).replace(/variableType/g, variableType).replace(/variableNameUp/g, variableNameUp).replace(/variableName/g, variableName);
			
			code = getter;			
		} else if (returnableType === "setter"){
			let setterPlain = langObject.setter
			let setter = setterPlain.replace(/indentSize/g, indentSize).replace(/variableType/g, variableType).replace(/variableNameUp/g, variableNameUp).replace(/variableName/g, variableName);

			code = setter;			
		}
		generatedCode += code; //append the code for each selected line
	}
	return generatedCode;
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
