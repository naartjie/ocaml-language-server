import * as LSP from "vscode-languageserver-protocol";
import * as command from "../command";
import Session from "../session";

export default function(session: Session): LSP.RequestHandler<LSP.TextDocumentIdentifier, string[], void> {
  return event => command.getMerlinFiles(session, null, event);
}
