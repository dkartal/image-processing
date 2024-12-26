
### Getting started

1.  Make sure Node.js is installed

        node --version

2.  Make sure npm is installed

        npm --version

3.  Create the Environment File

        touch .env

    Add the followings

        PORT=3000
        FULL_IMAGES_PATH="assets/full"
        THUMBS_IMAGES_PATH="assets/thumbs"
        TEST_IMAGES_PATH="src/tests/assets/full"
        TEST_THUMBS_PATH="src/tests/assets/thumbs"

4.  Install dependencies

        npm install

5.  Lint the code

        npm run lint

6.  Format the code

        npm run format

7.  Build the app

        npm run build

8.  Run the tests

        npm run test

9.  Run the server

        npm run start

10. Copy and paste the following to your browser to execute a GET request

        http://localhost:3000/api/images?filename=cat.jpg&width=30&height=30

11. Feel free to add more images to full directory and resize images.