1. Run 'npm install' to get the dependencies
2. Rename 'your-theme' folder, 'your-theme.php' and 'your-theme.yaml' and the placeholder in it consistent
3. Adjust the placeholder in 'blueprints.yaml' as you wish
4. Insert your theme name in '~/config/system.yaml' at 'pages/theme:'
5. Run 'gulp' in your theme folder to compile your scss files into the css-compiled folder
6. To sync your changes with your github repo and your webserver go back to your 'user' folder and follow the instructions at line 7 in the paramount 'README.md'
7. Start coding your own GRAV theme 🚀

**If you're new to GRAV read the [documentation](https://learn.getgrav.org)**

## Instructions

### All modules
+ Frontmatter (seperated part at the top of the markdown page sites)
    - title = defines title of the module which also will be used as the headline if you set "headline: true" and the name of the anchor for navigation.
    - visible = if "title" is defined this option can enable that the module will be shown and reachable in the navigation (available attributes: true, false)
    - animation = defines the animation how the module will be shown up (check available attributes [here](https://michalsnik.github.io/aos/)).
    - position = important for the right top and bottom margin of the module (available attributes: module-first, module-after-swiper, module-between, module-last).

### Image module
+ Frontmatter
    - link = sets a individual link on the image (for example: https://your.domain).