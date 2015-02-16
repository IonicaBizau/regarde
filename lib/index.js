// Dependencies
var Ul = require("ul")
  , Exec = require("child_process").exec
  ;

/**
 * Regarde
 * Creates a new instance of regarde.
 *
 * @name Regarde
 * @function
 * @param {String|Object} cmd The string representing the command that should be watched or an object containing the following fields:
 *
 *  - `cmd` (String): The command that should be watched.
 *  - `interval` (Number): The interval in seconds.
 *  - `out` (Stream): The `Regarde` instance.
 *
 * @param {Number} interval The interval in seconds.
 * @param {Stream} out The output stream (default: `process.stdout`).
 * @return {Regarde} The `Regarde` instance.
 */
var Regarde = module.exports = function (cmd, interval, out) {

    if (this.constructor !== Regarde) {
        return new Regarde(cmd, interval, out);
    }

    if (typeof cmd === "string") {
        cmd = {
            cmd: cmd
        };
    }

    Ul.merge(cmd, {
        interval: interval || 1
      , out: out || process.stdout
    });

    this.cmd = cmd.cmd;
    this.out = cmd.out;

    this.output = { err: "", data: "" };
    this.interval = setInterval(this.run.bind(this), cmd.interval * 1000);
    this.run();
};

/**
 * run
 * Updates the output in the output stream.
 *
 * @name run
 * @function
 * @return {Regarde} The `Regarde` instance.
 */
Regarde.prototype.run = function () {
    this.clear(this.output.err.split("\n").length + this.output.data.split("\n").length - 2);
    this.exec(function (err, data) {
        this.output.err = err || "";
        this.output.data = data || "";
    }.bind(this));
    return this;
};

/**
 * exec
 * Executes the provided command.
 *
 * @name exec
 * @function
 * @param {String} cmd
 * @param {String} cmd The command that should be executed.
 * @param {Function} callback The callback function.
 * @return {Exec} The Exec process.
 */
Regarde.prototype.exec = function (cmd, callback) {
    if (typeof cmd === "function") {
        callback = cmd;
        cmd = this.cmd;
    }
    callback = callback || function () {};
    cmd = cmd || this.cmd;

    var proc = Exec(cmd)
      , err = ""
      , out = ""
      ;

    proc.stdout.pipe(this.out);
    proc.stderr.pipe(this.out);

    proc.stdout.on("data", function (chunk) {
        out += chunk.toString();
    });

    proc.stderr.on("data", function (chunk) {
        err += chunk.toString();
    });

    proc.on("error", function (e) {
        callback(e);
    });

    proc.on("close", function () {
        callback(err, out);
    });
    return proc;
};

/**
 * clear
 * Moves the cursor at the start.
 *
 * @name clear
 * @function
 * @param {Number} lines How many lines to clear from output stream.
 * @return {Regarde} The `Regarde` instance.
 */
Regarde.prototype.clear = function (lines) {
    this.out.moveCursor(0, -lines);
};
