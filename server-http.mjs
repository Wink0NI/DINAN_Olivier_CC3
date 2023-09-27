import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

async function requestListener(request, response) {
    response.setHeader("Content-Type", "text/html");
    const urlParts = request.url.split("/");
    const basePath = urlParts[1];

    try {
        switch (basePath) {
            case "":
            case "index.html": {
                const contents = await fs.readFile("index.html", "utf8");
                response.writeHead(200);
                response.end(contents);
                break;
            }
            case "random.html": {
                const nb = Number.parseInt(urlParts[2]); // Extract the number from the URL

                if (Number.isNaN(nb)) {
                    response.writeHead(400); // Bad Request
                    response.end("<html><p>400: BAD REQUEST</p></html>");
                } else {
                    let nb_random = "";
                    for (let index = 0; index < nb; index++) {
                        nb_random += `<p>${Math.floor(100 * Math.random())}</p>`;
                    }
                    response.writeHead(200);
                    response.end(`<html>${nb_random}</html>`);
                }
                break;
            }
            default: {
                response.writeHead(404);
                response.end("<html><p>404: NOT FOUND</p></html>");
                break;
            }
        }
    } catch (error) {
        console.error(error);
        response.writeHead(500);
        response.end("<html><p>500: INTERNAL SERVER ERROR</p></html>");
    }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log("NODE_ENV =", process.env.NODE_ENV);
    console.log(`Server is running on http://${host}:${port}`);
});