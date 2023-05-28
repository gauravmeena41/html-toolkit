// src/index.ts
import { spawn } from "child_process";
import path from "path";
function HtmlToPdf(html, filePath) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python3", [
      path.join(__dirname, "python/html_to_pdf.py"),
      html,
      filePath
    ]);
    pythonProcess.stderr.on("data", (data) => {
      reject(new Error(`Child process stderr: ${data}`));
    });
    pythonProcess.on("close", (code) => {
      if (code === 0) {
        resolve("PDF generated successfully");
      } else {
        reject(new Error(`Child process exited with code ${code}`));
      }
    });
    pythonProcess.on("error", (err) => {
      reject(new Error(`Failed to start child process: ${err}`));
    });
  });
}
export {
  HtmlToPdf
};
