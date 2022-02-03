1. Run 'git clone https://github.com/23technologies/grav-user-setup.git user' to clone this repo into a folder called 'user'
2. Run 'git remote set-url origin https://github.com/path/to/your/github/repo' to pair it with your new github repo
3. Adjust the placeholder in 'config/plugins/git-sync.yaml' to set your credentials for the git-sync plugin
4. Adjust the placeholder in 'config/site.yaml' as you wish
5. Copy the whole 'user' folder and replace it with the default one on your webserver **(not neccessary for 23t environment)**
6. Run 'mkdir data' and 'chmod...' in the 'user' folder on your webserver to create a data folder with the right permissions which GRAV requires to run **(not neccessary for 23t environment)**
6. Visit 'your.domain/admin' and create a new GRAV user
7. Run 'git add.', 'git commit', 'git push' etc. to sync new changes with your github repo and click 'git-sync' button in GRAV dashboard to sync it also with your webserver (You also can make changes in GRAV dashboard and then click 'git-sync' to sync the changes to your github repo and then pull it locally with 'git pull')
8. For starting with your own GRAV theme follow the instructions in 'README.md' file you find in 'themes/your-theme/'