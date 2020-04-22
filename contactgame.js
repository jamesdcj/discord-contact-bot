module.exports = class ContactGame {
	constructor(bossid) {
		this._inProgress = false;
		this._leader = null;
		this._channel = null;
		this._secretWord = '';
		this._revealLen = 0;
		this._clues = [];
		this._forfeitUsers = [];
		this._bossid = bossid;
	}

	get inProgress() {
		return this._inProgress;
	}

	set inProgress(x) {
		this._inProgress = x;
	}

	get leader() {
		return this._leader;
	}

	set leader(x) {
		this._leader = x;
	}

	get channel() {
		return this._channel;
	}

	set channel(x) {
		this._channel = x;
	}

	get secretWord() {
		return this._secretWord;
	}

	set secretWord(x) {
		this._secretWord = x;
	}

	get revealLen() {
		return this._revealLen;
	}

	set revealLen(x) {
		this._revealLen = x;
	}

	get forfeitUsers() {
		return this._forfeitUsers;
	}

	addForfeitUser(x) {
		this._forfeitUsers.push(x);
	}

	// Only allow the BOSS to be get
	get bossid() {
		return this._bossid;
	}

	get clues() {
		return this._clues;
	}

	addClue(clue) {
		this._clues.push(clue);
	}

	advanceGame() {
		this._revealLen++;
		this._clues = [];
	}

	gameOver() {
		this._channel.send(`*dab* *dab* *dab* PLAYERS WIN! ${this._leader} YOU SUCK. Their word was "${this._secretWord}"`);
		this._channel.send('Who wants to be the leader for the new game? Send !start to be the new leader');

		this.reset();
	}

	reset() {
		this._inProgress = false;
		this._leader = null;
		this._channel = null;
		this._secretWord = '';
		this._revealLen = 0;
		this._clues = [];
		this._forfeitUsers = [];
	}
};