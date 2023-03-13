# Guide for new Websites with GRAV CMS

## Dependencies
- Local machine
    - Docker and docker compose (https://docs.docker.com/engine/install/)
    - Node and npm (https://nodejs.org/en/download/)
    - Gulp client (https://gulpjs.com/docs/en/getting-started/quick-start)
    - Git (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Getting started
1. Create a file called `docker-compose.yaml`
2. Copy the following code into the `docker-compose.yaml` and adjust the volumes path in line 7 to the directory where your `docker-compose.yaml` is in and save it
```
version: `3`
volumes:
  grav:
services:
  grav:
    volumes:
      - /path/to/local/volume:/config
    image: lscr.io/linuxserver/grav
    restart: always
    container_name: grav
    ports:
      - "8080:80"
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Berlin
```
3. In Terminal go into the directory of the `docker-compose.yaml` and run `docker-compose up -d` to start the container
4. Go into the new `www` directory and delete the `user` folder
5. Create a new Github Repository for your website
6. In Terminal go into the `www` directory and run `git clone LINK-OF-GRAV-CORE-USER-SETUP-GITHUB-REPO user` and `git remote set-url origin https://github.com/path/to/your/github/repo` for cloning the core-user-setup and binding it with your new github repo
7. Adjust the placeholder in `config/plugins/git-sync.yaml` with your credentials for the git-sync plugin
8. Adjust the placeholder in `config/site.yaml` as you wish
9. Now you can continue either in the backend via your localhost (http://localhost:8080) or in the code editor in the `www/user` folder and make your desired changes
10. If you want to use an already existing theme, you can either use the quark theme (https://github.com/getgrav/grav-theme-quark), which is installed by default or install another one (https://getgrav.org/downloads/themes). Then you can also safely delete the `your-theme` folder in `www/user/themes`
11. If you want to create your own theme instead of using an existing one read the following lines and keep the `your-theme` folder in `www/user/themes`

## Creating your own theme
1. Open the `system.yaml` in `www/user/config` and insert your desired theme name
2. In Terminal go to `www/user/themes/your-theme` and run `npm install` to get the dependencies
3. Rename `your-theme` folder, `your-theme.php` and `your-theme.yaml` and the placeholder in it consistent
4. Adjust the placeholder in `blueprints.yaml` as you wish
5. In Terminal go to `www/user/themes/your-theme/`
6. For automatic compiling of your scss, js, images, fonts files whenever you make a change and live streaming of your project run `gulp watch`. You can exit with ctrl+c
7. For manual compiling of your scss, js, images, fonts files run `gulp build`
8. For manual compiling of specific files run `gulp stream-fonts`, `gulp stream-js`, `gulp convert-images`
9. For manual cleaning the complete dist folder or specific one in it run `gulp clean-all`, `gulp clean-images`, `gulp clean-fonts`, `gulp clean-css`, `gulp clean-js`
10. If you want to commit your changes go back to `www/user/` and run `git add .` then `git commit -s -m "description of your changes"` and `git push``
11. If you want to enable the changes made on your local machine to the real website, restart the deployment FURTHER INSTRUCTIONS COMING HERE