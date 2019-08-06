# getter-setter-generator README

This extension generates get and set methods from class variable declarations.

- [getter-setter-generator README](#getter-setter-generator-readme)
  - [Features](#features)
    - [Simply call the Extension with `CTRL + ALT + D`](#simply-call-the-extension-with-ctrl--alt--d)
  - [Planned features](#planned-features)
  - [Release Notes](#release-notes)
    - [1.3.0](#130)
    - [1.2.0](#120)
    - [1.1.0](#110)
    - [1.0.0](#100)
  - [Known issues](#known-issues)
  - [Authors and Collaborators](#authors-and-collaborators)
  - [License](#license)
  - [Contribution](#contribution)

## Features

This extension allows you to automatically generate getters and setters with one single command.

* Auto indentation detection. Your code won't break.
* Supports multiple variables at once
* Generate Getter or Setter separately
* Generates a Getter/Setter code documentation. Automatically!

### Simply call the Extension with `CTRL + ALT + D`
![Generate Getter/Setter](https://raw.githubusercontent.com/gabsii/getter-setter-generator/master/images/getter_setter.gif)
or just use the Command Palette and search for `Generate Getter/Setter`

## Planned features

- [ ] More Language Support
  - [X] Java 
  - [X] JavaScript/TypeScript
  - [X] C++
  - [ ] C#
  - [X] Python
  - [ ] Go
  - [X] PHP
  - [ ] Ruby
  - [ ] React
- [X] Separate Commands for Getter/Setter
- [ ] Context Menu 
- [ ] Generate Getter/Setter without selection
- [X] Automatically generate Code Documentation

## Release Notes

### 1.3.0

* Added JavaScript Support
* Added TypeScript Support
* Updated PHP Code Style/Documentation (thanks for your submissions)
* Separate Commands for Getter and Setter method

### 1.2.0

* Added Python Support
* Added C++ Support

### 1.1.0

* Added PHP Support
* New Known Issue (-> Constructor Variables)

### 1.0.0

* Initial release of getter-setter-generator for VS Code

## Known issues

* Make sure whole lines are selected for indentation purposes
* Problems with constructor variables  

## Authors and Collaborators

* Lukas Samir Gabsi
* [The Katze](https://github.com/TheKatze) for his knowledge on C++/C#

## License
GPLv3 © [Gabsii](https://github.com/Gabsii)

## Contribution
Feel free to send me a PR or an issue to improve the code :)

**Enjoy!**
