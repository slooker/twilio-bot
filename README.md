First install NVM:

curl https://raw.githubusercontent.com/creationix/nvm/v0.23.0/install.sh | bash
source ~/.bashrc 

From there, do nvm install iojs

npm install iojs

Next install the Hapi module that runs the server

npm install hapi

Start the server like so:

iojs file.js
