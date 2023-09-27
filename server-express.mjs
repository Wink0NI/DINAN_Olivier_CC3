import express from "express";
import morgan from "morgan";
import createError from 'http-errors';

const host = "localhost";
const port = 8000;

const app = express();
if (app.get("env") === "development") app.use(morgan("dev"));

app.use(express.static("static"));
app.set("view engine", "ejs");

app.get("/random/:nb", async function (request, response, next) {
    if (isNaN(request.params.nb)) {
        return next(createError(400));
    }
    const length = parseInt(request.params.nb, 10);
    const numbers = Array.from({ length }).map(() => Math.floor(100 * Math.random()));
    response.render("random", { numbers, welcome: "Welcome to the Random Numbers Page!" });
});

const server = app.listen(port, host);

server.on("listening", () =>
    console.info(
        `HTTP listening on http://${host}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
    )
);

console.info(`File ${import.meta.url} executed.`);