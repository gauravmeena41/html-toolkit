import { spawn, ChildProcess, StdioOptions } from "child_process";
import path from "path";

export async function HtmlToPdf(
  html: string,
  filePath: string
): Promise<string> {
  try {
    const pythonProcess: ChildProcess = spawn(
      "python3",
      [
        process.cwd() + "/node_modules/html-toolkit/python/html_to_pdf.py",
        html,
        filePath,
      ],
      {
        stdio: ["pipe", "pipe", "pipe"] as StdioOptions, // add type to stdio options
      }
    );

    if (pythonProcess.stderr !== null) {
      // add null check for stderr using '!=='
      pythonProcess.stderr.on("data", (data: Buffer) => {
        throw new Error(`Child process stderr: ${data.toString()}`);
      });
    } else {
      throw new Error("Child process has no stderr property.");
    }

    return new Promise((resolve, reject) => {
      pythonProcess.on("close", (code: number) => {
        if (code === 0) {
          resolve("PDF created successfully.");
        } else {
          reject(new Error(`Child process exited with code ${code}`));
        }
      });

      pythonProcess.on("error", (err: Error) => {
        reject(new Error(`Failed to start child process: ${err.message}`));
      });
    });
  } catch (error) {
    throw error;
  }
}
