import express from "express";
import morgan from "morgan";
import createError from 'http-errors';
import logger from "loglevel";

const host = "localhost";
const port = 8000;
logger.setLevel(logger.levels.WARN);

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

app.use((request, response, next) => {
    logger.debug(`default route handler : ${request.url}`);
    return next(createError(404));
});

app.use((error, _request, response, _next) => {
    logger.debug(`default error handler: ${error}`);
    const status = error.status ?? 500;
    const stack = app.get("env") === "development" ? error.stack : "";
    const result = { code: status, message: error.message, stack };
    return response.render("error", result);
});

server.on("listening", () =>
    logger.warn(
        `HTTP listening on http://${host}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
    )
);

logger.info(`File ${import.meta.url} executed.`);