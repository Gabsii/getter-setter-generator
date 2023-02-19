/*
 * @Author: GJTY 1205995361@qq.com
 * @Date: 2022-08-04 14:43:58
 * @LastEditors: GJTY 1205995361@qq.com
 * @LastEditTime: 2022-08-04 17:00:52
 * @FilePath: \Dpc:\Users\12059\.vscode\extensions\gabsii.getter-setter-generator-1.4.0\lang.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports ={

    java: {
        getter: `
\nindentSizepublic variableType getvariableNameUp() {
indentSize\treturn this.variableName;
indentSize}`, 
        setter: `
indentSizepublic void setvariableNameUp(variableType variableName) {
indentSize\tthis.variableName = variableName;
indentSize}
`
    },
    php: {
        getter: `
\nindentSize/**
indentSize * Getter for variableNameUp
indentSize *
indentSize * @return [type]
indentSize */
indentSizepublic function getvariableNameUp()
indentSize{
indentSize    return $this->variableName;
indentSize}`,
        setter: `
\nindentSize/**
indentSize * Setter for variableNameUp
indentSize * @var [type] variableName
indentSize *
indentSize * @return self
indentSize */
indentSizepublic function setvariableNameUp($variableName)
indentSize{
indentSize    $this->variableName = $variableName;
indentSize    return $this;
indentSize}
`
    },
    python: {
        getter: 
`\n\nindentSize@property\nindentSizedef variableNameUp(self):
indentSize    return self.variableName
indentSize`,
        setter: 
`\nindentSize@variableNameUp.setter\nindentSizedef variableNameUp(self, variableNameUp):
indentSize    self.variableName = variableNameUp
`
    },
    cpp: {
        getter: `
\nindentSizevariableType getvariableNameUp() {
indentSize\treturn this->variableName;
indentSize}`,
        setter: `
indentSizevoid setvariableNameUp(variableType variableName) {
indentSize\tthis->variableName = variableName;
indentSize}
`
    },
    javascript: {
        getter: `
\nindentSizefunction getvariableNameUp() {
indentSize\treturn this.variableName;
indentSize}`,
        setter: `
\nindentSizesetvariableNameUp(variableName) {
indentSize\tthis.variableName = variableName;
indentSize}`
    },
    typescript: {
        getter: `
\nindentSizegetvariableNameUp() {
indentSize\treturn this.variableName;
indentSize}`,
        setter: `
\nindentSizesetvariableNameUp(variableName) {
indentSize\tthis.variableName = variableName;
indentSize}`
    }
}