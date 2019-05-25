"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const LSP = require("vscode-languageserver-protocol");
const command = require("../command");
const support = require("../support");
function default_1(session) {
    return support.cancellableHandler(session, (event, _token) => __awaiter(this, void 0, void 0, function* () {
        const result = yield command.getTextDocument(session, event.textDocument);
        if (null == result)
            return [];
        const document = LSP.TextDocument.create(event.textDocument.uri, result.languageId, result.version, result.getText());
        let otxt = null;
        if (document.languageId === "ocaml") {
            const tool = session.settings.reason.format.ocamltool;
            if (tool === "ocamlformat")
                otxt = yield command.getFormatted.ocamlformat(session, document);
            else if (tool === "ocp-indent")
                otxt = yield command.getFormatted.ocpIndent(session, document);
        }
        if (document.languageId === "reason")
            otxt = yield command.getFormatted.refmt(session, document);
        if (null == otxt || "" === otxt)
            return [];
        const edits = [];
        edits.push(LSP.TextEdit.replace(LSP.Range.create(document.positionAt(0), document.positionAt(result.getText().length)), otxt));
        return edits;
    }));
}
exports.default = default_1;
//# sourceMappingURL=documentFormatting.js.map