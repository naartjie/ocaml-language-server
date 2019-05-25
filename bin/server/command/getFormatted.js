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
const parser_1 = require("../parser");
const processes = require("../processes");
function ocamlformat(session, doc, range) {
    return __awaiter(this, void 0, void 0, function* () {
        if (null != range) {
            session.connection.console.warn("Selection formatting not support from ocamlformat");
            return null;
        }
        const text = doc.getText();
        const ocamlformat = new processes.Ocamlformat(session, ["--name", doc.uri, "-"]).process;
        ocamlformat.stdin.write(text);
        ocamlformat.stdin.end();
        const otxt = yield new Promise(resolve => {
            let buffer = "";
            ocamlformat.stdout.on("error", (error) => {
                session.error(`Error formatting file: ${error}`);
                resolve(null);
            });
            ocamlformat.stdout.on("data", (data) => (buffer += data.toString()));
            ocamlformat.stdout.on("end", () => resolve(buffer));
        });
        ocamlformat.unref();
        return otxt;
    });
}
exports.ocamlformat = ocamlformat;
function ocpIndent(session, doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const text = doc.getText();
        const ocpIndent = new processes.OcpIndent(session, []).process;
        ocpIndent.stdin.write(text);
        ocpIndent.stdin.end();
        const otxt = yield new Promise(resolve => {
            let buffer = "";
            ocpIndent.stdout.on("error", (error) => {
                session.error(`Error formatting file: ${error}`);
                resolve(null);
            });
            ocpIndent.stdout.on("data", (data) => (buffer += data.toString()));
            ocpIndent.stdout.on("end", () => resolve(buffer));
        });
        ocpIndent.unref();
        return otxt;
    });
}
exports.ocpIndent = ocpIndent;
function ocpIndentRange(session, doc, range) {
    return __awaiter(this, void 0, void 0, function* () {
        const text = doc.getText();
        const args = ["--indent-empty", `--lines=${range.start.line}-${range.end.line}`, "--numeric"];
        const ocpIndent = new processes.OcpIndent(session, args).process;
        ocpIndent.stdin.write(text);
        ocpIndent.stdin.end();
        const output = yield new Promise((resolve, reject) => {
            let buffer = "";
            ocpIndent.stdout.on("error", (error) => reject(error));
            ocpIndent.stdout.on("data", (data) => (buffer += data.toString()));
            ocpIndent.stdout.on("end", () => resolve(buffer));
        });
        ocpIndent.unref();
        const indents = [];
        const pattern = /\d+/g;
        let match = null;
        while (null != (match = pattern.exec(output))) {
            const digits = match.shift();
            const indent = parseInt(digits, 10);
            indents.push(indent);
        }
        return indents;
    });
}
exports.ocpIndentRange = ocpIndentRange;
let lastDiagnostics = [];
function refmt(session, doc, range) {
    return __awaiter(this, void 0, void 0, function* () {
        if (null != range) {
            session.connection.console.warn("Selection formatting not support for Reason");
            return null;
        }
        const text = doc.getText();
        if (/^\s*$/.test(text))
            return text;
        const refmt = new processes.ReFMT(session, doc).process;
        refmt.stdin.write(text);
        refmt.stdin.end();
        const otxt = yield new Promise((resolve, reject) => {
            let buffer = "";
            let bufferError = "";
            refmt.stdout.on("error", (error) => reject(error));
            refmt.stdout.on("data", (data) => (buffer += data.toString()));
            refmt.stdout.on("end", () => resolve(buffer));
            refmt.stderr.on("data", (data) => (bufferError += data.toString()));
            refmt.stderr.on("end", () => {
                const diagnostics = parser_1.refmt.parseErrors(bufferError);
                if (diagnostics.length !== 0 || diagnostics.length !== lastDiagnostics.length) {
                    session.connection.sendDiagnostics({
                        diagnostics,
                        uri: doc.uri,
                    });
                }
                lastDiagnostics = diagnostics;
            });
        });
        refmt.unref();
        return /^\s*$/.test(otxt) ? null : otxt.trim();
    });
}
exports.refmt = refmt;
//# sourceMappingURL=getFormatted.js.map