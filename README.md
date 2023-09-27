# DINAN_Olivier_CC3

<h1>CC3 devweb-tp5</h1>

<h2>Partie 1 : serveur HTTP natif Node.js</h2>

<h3>Question 1.1 donner la liste des en-têtes de la réponse HTTP du serveur.</h3>
<pre><code>
    Response Headers:
    HTTP/1.1 200 OK
    Connection: keep-alive
    Date: Wed, 20 Sep 2023 06:15:30 GMT
    Keep-Alive: timeout=5
    Transfer-Encoding: chunked
</code></pre>

<pre><code>
    <B>HTTP/1.1 200 OK:</B> La ligne de statut HTTP qui indique que la réponse est au format HTTP/1.1, que le code de statut est "200 OK". Cela signifie que la requête du client a été traitée avec succès, et la réponse contient les données demandées.
    <B>Connection: keep-alive:</B> Cela indique que la connexion HTTP doit être maintenue ouverte (keep-alive) pour une utilisation future. Cela permet au client et au serveur de réutiliser la même connexion pour d'autres requêtes, ce qui peut améliorer les performances en évitant de rétablir une nouvelle connexion pour chaque requête.
    <B>Date: Wed, 20 Sep 2023 06:15:30 GMT:</B> Cet en-tête spécifie la date et l'heure à laquelle la réponse a été générée par le serveur. Cela peut être utile pour la mise en cache et la synchronisation.
    <B>Keep-Alive: timeout=5:</B> Cet en-tête indique la durée maximale pendant laquelle la connexion doit être maintenue ouverte (en secondes) en l'absence d'activité. Dans ce cas, la connexion sera fermée si aucune activité n'a lieu pendant 5 secondes.
    <B>Transfer-Encoding: chunked:</B> Cet en-tête indique que le corps de la réponse est encodé en morceaux (chunks). Cela signifie que le serveur enverra la réponse en plusieurs morceaux plutôt qu'en une seule pièce. Cela peut être utilisé pour les réponses de taille inconnue ou pour une diffusion progressive.
</code></pre>

<h3>Question 1.2 donner la liste des en-têtes qui ont changé depuis la version précédente.</h3>
<pre><code>
    Les en-têtes avec un fichier JSON:
        Connection: keep-alive
        # Content-Length: 20
        # Content-Type: application/json
        Date: Wed, 20 Sep 2023 06:27:18 GMT
        Keep-Alive: timeout=5
</code></pre>

<pre><code>
    Les en-têtes qui ont changé depuis la version précédente:
        <B>Content-Length: 20 :</B>Un nouvel en-tête indiquant la longueur du contenu de la réponse en octets.
        <B>Content-Type: application/json :</B>Un en-tête qui spécifie que le type de contenu de la réponse est au format JSON.
</code></pre>

<h3>Question 1.3 que contient la réponse reçue par le client ?</h3>
<pre><code>
     La réponse reçue par le client contient le contenu du fichier "index.html" (avec réponse HTTP 200) si la lecture du fichier réussit. Si la lecture du fichier échoue pour une raison quelconque, une erreur est affichée dans la console, mais aucune réponse n'est envoyée au client.
</code></pre>

<h3>Question 1.4 quelle est l'erreur affichée dans la console ? Retrouver sur https://nodejs.org/api le code d'erreur affiché.</h3>
<pre><code>
    [Error: ENOENT: no such file or directory, open 'C:\Users\Utilisateur\Downloads\CC1 dev web\DINAN_Olivier_CC3\index.html'] {
    errno: -4058,
    code: 'ENOENT',
    syscall: 'open',
    path: 'C:\\Users\\Utilisateur\\Downloads\\CC1 dev web\\DINAN_Olivier_CC3\\index.html'
    }
    ENOENT (No such file or directory): Commonly raised by fs operations to indicate that a component of the specified pathname does not exist. No entity (file or directory) could be found by the given path.
    Cela veut dire que dans cette situation, le fichier index.html est introuvable dans le dossier DINAN_Olivier_CC3.
</code></pre>

<h3>Question 1.5 donner le code de requestListener() modifié avec gestion d'erreur en async/await.</h3>
<pre><code>
    async function requestListener(_request, response) {
        try {
            const contents = await fs.readFile("index.html", "utf8");
            response.setHeader("Content-Type", "text/html");
            response.writeHead(200);
            response.end(contents);
        } catch (error) {
            console.error(error);
            response.writeHead(500);
            return response.end(`(<)html>(<)p>500: INTERNAL SERVER ERROR(<)/p>(<)/html>`);
        }
    }
    (<) dans le but d'éviter la confusion du site avec les balises html.
</code></pre>

<h3>Question 1.6 indiquer ce que cette commande a modifié dans votre projet.</h3>
<pre><code>
    Ces commandes ont ajouté deux packages dans le projet, l'un pour pouvoir démarrer le projet en mode production (cross-env) et l'autre pour pouvoir démarrer le projet en mode développement (nodemon) et a également rajouté le dossier node_modules dans le dossier DINAN_Olivier_CC3.
</code></pre>