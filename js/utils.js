function commafy(num) {
    return num.toString().trim().replace(/\B(?=(\d{3})+(?!\d))/g, ",").toLocaleString();
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
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
function encodeId(id) {
    return id.toString().replace("\ ", "-").trim();
}
function decodeId(id) {
    return id.toString().replace("-", "\ ").trim();
}