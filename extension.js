// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

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
		if(!editor){
			return;
		}

		// let language = vscode.window.activeTextEditor.document.languageId;

		const hasSelection = !editor.selection.isEmpty;
		
		// check if the user selected something, otherwise display error message
		if (hasSelection) {
			
			let text = editor.document.getText(editor.selection);
			let generatedCode = generateGetterSetterJava(text);							

			// gets the current editor and appends the getters/setters 
			editor.edit(
                edit => editor.selections.forEach(
                  selection => 
                  {
                    edit.insert(selection.end, generatedCode);
                  }
                )
              );

			vscode.window.showInformationMessage('Getter/Setter were generated');
		} else {
			vscode.window.showErrorMessage('Nothing was selected!');
		}
	});

	context.subscriptions.push(generateGetterSetter);
}
exports.activate = activate;


/**
 * 
 * @param {String} text the selected text which will be used to generate the getters/setters
 * @returns {String} String that contains the generated getters/setters 
 */
function generateGetterSetterJava(text) {
	let hasSemicolon = text.includes(';');
	let selectedTextArray = text.split('\r\n').filter(e => e); //removes empty array values (line breaks)
	let generatedCode = '';
				
	for (const text of selectedTextArray) {
		let selectedText, indentSize, variableType, variableName;

		if (hasSemicolon) {
			selectedText = text.replace(';','').trim(); //removes all semicolons 
			indentSize = text.split(selectedText.charAt(0))[0]; //get the indent size for proper formatting
		} else {
			selectedText = text.trim(); 
			indentSize = text.split(selectedText.charAt(0))[0];
		}

		// java modifier: public, private, static, asset, final, ...
		let hasModifier = selectedText.split(' ').length == 3;

			if (hasModifier) {
				variableType = selectedText.split(' ')[1];
				variableName = selectedText.split(' ')[2];
			} else {
				variableType = selectedText.split(' ')[0];
				variableName = selectedText.split(' ')[1];
			}

		let code = '';
		let getter = generateGetterJava(indentSize, variableType, variableName);
		let setter = generateSetterJava(indentSize, variableType, variableName);
		
		code = getter + setter; 

		generatedCode += code; //append the code for each selected line

	}

	return generatedCode;
}

/**
 * 
 * @param {String} indentSize 
 * @param {String} variableType 
 * @param {String} variableName 
 * 
 * @returns Java Getter
 */
function generateGetterJava(indentSize, variableType, variableName) {
	let variableNameUp = variableName.charAt(0).toUpperCase() + variableName.slice(1);

	let code = 
`
\n${indentSize}public ${variableType} get${variableNameUp}() {
${indentSize}\treturn this.${variableName};
${indentSize}}`
	return code;
}

/**
 * 
 * @param {String} indentSize 
 * @param {String} variableType 
 * @param {String} variableName 
 * 
 * @returns Java Setter
 */
function generateSetterJava(indentSize, variableType, variableName) {
	let variableNameUp = variableName.charAt(0).toUpperCase() + variableName.slice(1);

	let code = 
`
${indentSize}public void set${variableNameUp}(${variableType} ${variableName}) {
${indentSize}\tthis.${variableName} = ${variableName};
${indentSize}}
`
	return code;
}


// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
