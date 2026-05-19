import express from "express";
import cors from "cors";
import fs from "fs";
import { exec } from "child_process";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/run", (req, res) => {

    const code = req.body.code;

    // save code
    fs.writeFileSync("temp.c", code);

    // compile command
    const command = `gcc temp.c -o temp.exe`;

    exec(command, (compileError, stdout, stderr) => {

        // compile error
        if (compileError) {
            return res.json({
                success: false,
                output: stderr
            });
        }

        // run exe
        exec("temp.exe", (runError, runStdout, runStderr) => {

            if (runError) {
                return res.json({
                    success: false,
                    output: runStderr
                });
            }

            res.json({
                success: true,
                output: runStdout || "Program Executed Successfully"
            });

        });

    });

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});