import { ChildProcess } from "child_process";
import Session from "../session";

export default class Ocamlformat {
  public readonly process: ChildProcess;
  constructor(session: Session, args: string[] = []) {
    const command = session.settings.reason.path.ocamlformat;
    this.process = session.environment.spawn(command, args);
    this.process.on("error", error => session.error(`Error formatting file: ${error}`));
  }
}
