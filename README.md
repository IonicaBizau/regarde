![](http://i.imgur.com/RywSCbL.png)

# `$ regarde`
A tiny tool and library to watch commands.

## Installation

```sh
$ npm install -g regarde
```

## Usage
```sh
$ regarde -h
regarde --help
A tiny tool and library to watch commands.

usage: regarde [command] [options]

command:                  The command to watch.
options:
  -h --help               Displays this help.
  -n, --interval <secs>   Seconds to wait between updates.

examples:
    regarde 'ls'

Documentation can be found at https://github.com/IonicaBizau/regarde
```

## Example
### Using as executable
```sh
# Shows the number of nano seconds
$ regarde 'date +%s%N' -n 0.1
```

## Using as library

```js
var Regarde = require("regarde");
Regarde("date +%s%N", 0.1)
```

## Documentation
### `Regarde(cmd, interval, out)`
Creates a new instance of regarde.

#### Params
- **String|Object** `cmd`: The string representing the command that should be watched or an object containing the following fields:
 - `cmd` (String): The command that should be watched.
 - `interval` (Number): The interval in seconds.
 - `out` (Stream): The `Regarde` instance.

- **Number** `interval`: The interval in seconds.
- **Stream** `out`: The output stream (default: `process.stdout`).

#### Return
- **Regarde** The `Regarde` instance.

### `run()`
Updates the output in the output stream.

#### Return
- **Regarde** The `Regarde` instance.

### `exec(cmd, cmd, callback)`
Executes the provided command.

#### Params
- **String** `cmd`:
- **String** `cmd`: The command that should be executed.
- **Function** `callback`: The callback function.

#### Return
- **Exec** The Exec process.

### `clear(lines)`
Moves the cursor at the start.

#### Params
- **Number** `lines`: How many lines to clear from output stream.

#### Return
- **Regarde** The `Regarde` instance.

## How to contribute
1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
