import { exec as childExec } from "child_process";

export function exec(cmd, cwd = process.cwd()) {
  return new Promise((resolve, reject) => {
    const process = childExec(cmd, { cwd, stdio: "inherit" });

    process.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Erro ao executar: ${cmd}`));
    });
  });
}
