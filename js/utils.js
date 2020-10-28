function commafy(num) {
    return num.toString().toLocaleString()
}

function getInputValue(inputId) {
    return String(window.document.getElementById(inputId.toString()).value)
}