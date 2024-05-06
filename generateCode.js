games = require("./games");

function generateCode() {
	var code = Math.random().toString(36).substring(2, 8);
	if (games[code]) {
		return generateCode();
	}
	return code;
}

module.exports = generateCode;
