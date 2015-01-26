First install NVM:

* curl https://raw.githubusercontent.com/creationix/nvm/v0.23.0/install.sh | bash
* source ~/.bashrc 


From there, do nvm install iojs

* nvm install iojs

-- If for some reason nvm install iojs doesn't work, have them log out then back into the server

Next install the Hapi module that runs the server

* npm install hapi

Start the server like so:

* iojs index.js
