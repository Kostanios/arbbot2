# datadog-reporting-tool

## How to use

```bash
 # command fetch hour and write data to aws bucket if such does not exist
 npm run start fetch-hour
```

```bash
 # you can provide date and hour parameters for previous command
 # that means your get data for a specific hour
 # parameters are set based on your timezone, but final data will be converted to utc
 # example:
 npm run start fetch-hour 2023-1-1 2
```

```bash
# command fetch hour and write data to aws bucket
npm run start fetch-hour -f
```

```bash
# command fetch all hours of previous day in current timezone from aws bucket,
# if at least 1 hour not exist fetch them, and in the end exit with code 1
# if all fetched hours exist, parse them to day file and push to bucket
npm run start publish-day
```

```bash
# you can provide date and hour parameters for previous date and hour example:
# that means your start to fetch specific date and time.
 # parameters are set based on your timezone, but final data will be converted to utc
 # example:
npm run start publish-day 2023-1-1 1
```

```bash
# command rewrite all hours and day file
npm run start publish-day -f
```

```bash
npm run test:e2e # run e2e tests
```

```bash
npm run test:unit # run unit tests
```
