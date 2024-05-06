const express = require("express");

const app = express();
const port = 3012;

const games = {};

function generateCode() {
	var code = Math.random().toString(36).substring(2, 8);
	if (games[code]) {
		return generateCode();
	}
	return code;
}

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
	console.log(generateCode());
});

app.get("/:code", (req, res) => {
	const code = req.params.code;
	if (games[code]) {
		res.send(games[code]);
	} else {
		res.status(404).send("Game not found");
	}
});

app.post("/:ip", (req, res) => {
	const ip = req.params.ip;
	const code = generateCode();
	games[code] = ip;
	res.send(code);
	console.log(games);
});

app.post("/clear", (req, res) => {
	games = {};
	res.send("Games cleared");
});

module.exports = { app, generateCode, games };
