import express from "express";
import cors from "cors";
import fs from "fs";
import { exec, spawn } from "child_process";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/run", (req, res) => {

    const code = req.body.code;

    // Save user code
    fs.writeFileSync("temp.c", code);

    // console.log(process.env.COMPILE_PATH);
    // Compile command
    const command =
    `set PATH=${process.env.COMPILE_PATH};%PATH% && gcc temp.c graphics.c -IC:/msys64/ucrt64/include/SDL2 -LC:/msys64/ucrt64/lib -lSDL2 -lm -o temp.exe`;

    console.log("RUNNING GCC...");

    exec(command, (compileError, stdout, stderr) => {

        // Compile Error
        if (compileError) {

            console.log(stderr);

            return res.json({
                success: false,
                output: stderr || compileError.message
            });
        }

        console.log("COMPILE SUCCESS");

        // Full exe path
        const exePath = path.resolve("temp.exe");

        console.log(exePath);

        // Open graphics window
        const child = spawn(exePath, [], {
            detached: true
        });

        child.on("error", (err) => {
            console.log("SPAWN ERROR:", err);
        });

        // Send response
        res.json({
            success: true,
            output: "Graphics Window Opened Successfully 😭🔥"
        });

    });

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});