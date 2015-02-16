var Ul = require("ul")
  , Exec = require("child_process").exec
  ;

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

    var output = { err: "", data: "" };
    this.interval = setInterval(function () {
        this.clear(output.err.split("\n").length + output.data.split("\n").length - 2);
        this.run(function (err, data) {
            output.err = err || "";
            output.data = data || "";
        });
    }.bind(this), cmd.interval * 1000);
};

Regarde.prototype.run = function (cmd, callback) {
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

Regarde.prototype.clear = function (lines) {
    this.out.moveCursor(0, -lines);
};
