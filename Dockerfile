FROM cypress/base
RUN node --version
RUN npm --version
WORKDIR /home/node/app
# copy our test application
COPY package.json package-lock.json ./
COPY app ./app
# copy Cypress tests
COPY cypress.json cypress ./
COPY cypress ./cypress

# avoid many lines of progress bars during install
# https://github.com/cypress-io/cypress/issues/1243
ENV CI=1

# install NPM dependencies and Cypress binary
RUN npm install --save-dev cypress
# check if the binary was installed successfully
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run