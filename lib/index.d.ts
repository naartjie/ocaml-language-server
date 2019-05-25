import * as merlin from "./merlin";
import * as remote from "./remote";
import * as types from "./types";
export interface ISettings {
    reason: {
        codelens: {
            enabled: boolean;
            unicode: boolean;
        };
        debounce: {
            linter: number;
        };
        diagnostics: {
            merlinPerfLogging: boolean;
            tools: Array<"merlin" | "bsb" | "esy">;
        };
        path: {
            bsb: string;
            env: string;
            esy: string;
            ocamlfind: string;
            ocamlformat: string;
            ocamlmerlin: string;
            ocpindent: string;
            opam: string;
            rebuild: string;
            refmt: string;
            refmterr: string;
            rtop: string;
        };
        format: {
            ocamltool: "ocamlformat" | "ocp-indent";
            width: number | null;
        };
        server: {
            languages: Array<"ocaml" | "reason">;
        };
    };
}
export declare namespace ISettings {
    const defaults: ISettings;
    function withDefaults(overrides: typeof defaults.reason | undefined | null): typeof defaults.reason;
}
export { merlin, remote, types };
