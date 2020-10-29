function commafy(num) {
    return num.toString().trim().toLocaleString()
}

function getInputValue(inputId) {
    return String(window.document.getElementById(inputId.toString().trim()).value).trim()
}

function humanifyHeight(h) {
    const height = parseFloat(h);
    const ft = Math.floor(height / 12);
    const inches = height % 12;
    return ft !== 0 ? `${commafy(ft)} ft ${inches} inches`: `${inches} inches`;
}