# e-shop-js-only

How to run the program:
- If you don't have `http-server` or `live-server` extension in vsCode then instal either of them.
- `json-server` is needed for local db.

## launching db
### `json-server`
1. Install `json-server` by typing `npm i -g json-server`
2. Go to root/db/ and there run the command: `json-server --watch db.json`
3. That's it! You can check it out on `http://localhost:3000`

## launching frontend
### `http-server` way
1. Install `http-server` by typing `npm install -g http-server`
2. Change into working directory, where `index.html` lives
3. Start your http server by issuing `http-server -c-1`
4. Go to written port, might be `http://127.0.0.1:8080/`
5. Enjoy!

### `live-server` way
1. Install `live-server` extension to vsCode from here: [Live server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Open project with vsCode.
3. Open index.html file.
4. Right click and select "Open with live server".
5. Enjoy!
