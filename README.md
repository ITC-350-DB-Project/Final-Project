# API

## Setup:
copy and rename the `settings.example` file to `.settings.json` and set the values to connect to the database

then run 
```bash
node run dev
```
to enter developer mode. This will automatically reload the API every time that you save a file

If you just want to start the API without devtools run
```bash
node run start
```

## Endpoints:
`/`: will list connection status

`/apt`: lists all APTs from the database

`/apt/{id}`: queries the DB for a specific APT based on APTID