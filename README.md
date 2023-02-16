Mise en place du projet: Algorithme J1939

1.  Installation de PNPM : https://pnpm.io/fr/installation la commande devrait ressembler à "npm install -g pnpm".
    (PNPM est un gestionnaire de packages rapide et économe en espace disque).

2.  Téléchargement des paquets: Dans le terminal faire la commande "pnpm i".

3.  Exécuter la commande "pnpm run dev".

4.  Le message suivant apparaît dans la console "ready - started server on 0.0.0.0:3000, url: http://localhost:3000".
    Cela indique que le projet est disponible à l'URL : http://localhost:3000.

5.  Pour utiliser l'algorithme, se rendre sur la page "http://localhost:3000" puis cliquer sur le bouton "UPLOAD J1939 SNIFFER". Sélectionner le fichier "allFrames.txt" qui se situe à la racine du projet. L'algorithme vous affiche le nombre d'appareils communicants sur le BUS, ainsi que le type de données transmises.
