import express from "express";
import cors from "cors";
import fs from "fs";
import { exec, spawn } from "child_process";
import path from "path";
import dotenv from "dotenv";
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

app.post("/run", (req, res) => {

    const code = req.body.code;

    // Save user code
    fs.writeFileSync("temp.c", code);

    // Compile command
    console.log(process.env.COMPILE_COMMAND);
    const command = process.env.COMPILE_COMMAND;

    // console.log("RUNNING GCC...");

    exec(command, (compileError, stdout, stderr) => {

        // Compile Error
        if (compileError) {

            // console.log(stderr);

            return res.json({
                success: false,
                output: stderr || compileError.message
            });
        }

        // console.log("COMPILE SUCCESS");

        // exe full path
        const exePath = path.join(process.cwd(), "temp.exe");

        // Open graphics window
        spawn(exePath, [], {
            detached: true,
            stdio: "ignore"
        }).unref();

        // Response to frontend
        res.json({
            success: true,
            output: "Graphics Window Opened Successfully 😭🔥"
        });

    });

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});