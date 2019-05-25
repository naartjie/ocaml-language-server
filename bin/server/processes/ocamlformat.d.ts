/// <reference types="node" />
import { ChildProcess } from "child_process";
import Session from "../session";
export default class Ocamlformat {
    readonly process: ChildProcess;
    constructor(session: Session, args?: string[]);
}
