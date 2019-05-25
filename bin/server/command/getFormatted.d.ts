import * as LSP from "vscode-languageserver-protocol";
import Session from "../session";
export declare function ocamlformat(session: Session, doc: LSP.TextDocument, range?: LSP.Range): Promise<null | string>;
export declare function ocpIndent(session: Session, doc: LSP.TextDocument): Promise<null | string>;
export declare function ocpIndentRange(session: Session, doc: LSP.TextDocument, range: LSP.Range): Promise<number[]>;
export declare function refmt(session: Session, doc: LSP.TextDocument, range?: LSP.Range): Promise<null | string>;
