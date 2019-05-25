"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepmerge = require("deepmerge");
const merlin = require("./merlin");
exports.merlin = merlin;
const remote = require("./remote");
exports.remote = remote;
const types = require("./types");
exports.types = types;
var ISettings;
(function (ISettings) {
    ISettings.defaults = {
        reason: {
            codelens: {
                enabled: true,
                unicode: true,
            },
            debounce: {
                linter: 500,
            },
            diagnostics: {
                merlinPerfLogging: false,
                tools: ["merlin"],
            },
            format: {
                ocamltool: "ocamlformat",
                width: null,
            },
            path: {
                bsb: "./node_modules/bs-platform/lib/bsb.exe",
                env: "env",
                esy: "esy",
                ocamlfind: "ocamlfind",
                ocamlformat: "ocamlformat",
                ocamlmerlin: "ocamlmerlin",
                ocpindent: "ocp-indent",
                opam: "opam",
                rebuild: "rebuild",
                refmt: "refmt",
                refmterr: "refmterr",
                rtop: "rtop",
            },
            server: {
                languages: ["ocaml", "reason"],
            },
        },
    };
    function withDefaults(overrides) {
        return deepmerge(ISettings.defaults.reason, overrides || {}, {
            arrayMerge(_, source) {
                return source;
            },
        });
    }
    ISettings.withDefaults = withDefaults;
})(ISettings = exports.ISettings || (exports.ISettings = {}));
//# sourceMappingURL=index.js.map