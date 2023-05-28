import { spawn } from "child_process";
import path from "path";

export function HtmlToPdf(html: string, filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python3", [
      path.join(__dirname, "python/html_to_pdf.py"),
      html,
      filePath,
    ]);

    pythonProcess.stderr.on("data", (data: any) => {
      reject(new Error(`Child process stderr: ${data}`));
    });

    pythonProcess.on("close", (code: any) => {
      if (code === 0) {
        resolve("PDF generated successfully");
      } else {
        reject(new Error(`Child process exited with code ${code}`));
      }
    });

    pythonProcess.on("error", (err: any) => {
      reject(new Error(`Failed to start child process: ${err}`));
    });
  });
}
