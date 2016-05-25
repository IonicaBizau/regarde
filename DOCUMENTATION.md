## Documentation

You can see below the API reference of this module.

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

