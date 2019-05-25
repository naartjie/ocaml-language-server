"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ocamlformat {
    constructor(session, args = []) {
        const command = session.settings.reason.path.ocamlformat;
        this.process = session.environment.spawn(command, args);
        this.process.on("error", error => session.error(`Error formatting file: ${error}`));
    }
}
exports.default = Ocamlformat;
//# sourceMappingURL=ocamlformat.js.map