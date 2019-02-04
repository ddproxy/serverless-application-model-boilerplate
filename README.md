# sam-stereotype
NodeJS boilerplate handler, dispatch, and framework for AWS SAM

## Handlers
### SNS

Extracts the `event.Records[0].Sns.Message` to `event.packet`

```javascript
const { snsHandler } = require('sam-stereotype');

exports.handler = snsHandler((event, context, callback) => {
  if (event.packet) {
    callback(null, `Successfully received packet: ${event.packet}`);
  }
  callback(null, `Failed to receive packet: ${event}`);
});
```

### Other
Still working on the additional trigger handlers, while they exist, they shouldn't be used yet.

Available:

- S3
- Schedule

In Progress:

- SQS
- Kinesis
- IOT
- Dynamo
- Cloudwatch Logs
- Cloudwatch Events
- API
- Alexa

## Dispatch
### SNS

Streamlines the SNS Publish process

```javascript
const { snsDispatch } = require('sam-stereotype');

exports.handler = (event, context, callback) => {
  snsDispatch('my-sns-arn', 'my-message')
    .then(()=> {
      callback(null, 'Successfully dispatched SNS Message');
    })
    .catch(e => callback(null, `Failed to dispatch SNS Message: ${e.stack}`));
};
```

### SES

Streamlines the SES Publish process

```javascript
const { sesDispatch } = require('sam-stereotype');

exports.handler = (event, context, callback) => {
  sesDispatch(
      'myDestination@test.com',
      'myFrom@test.com',
      'Subject',
      'Message with <b>HTML</b>'
  )
    .then(()=> {
      callback(null, 'Successfully dispatched SES Message');
    })
    .catch(e => callback(null, `Failed to dispatch SES Message: ${e.stack}`));
};
```

### Other
Available:

- Dynamo
- S3

## Build Framework
The build framework is a suggested Makefile and Webpack config.

Either configuration file can be used independently but the Makefile's `compile` requires `webpack` to be installed. You can use your own webpack config, read `make compile` for more information.

### Makefile
Include the Makefile and variables in your Makefile for the suite of shortcuts.

```makefile
include ./node_modules/sam-stereotype/Makefile

# S3 Bucket to upload Lambdas - Must exist before running any commands
BUCKET = sam-stereotype
# Key prefix: s3:/sam-stereotype/stereotype-files
BUCKET_PREFIX = stereotype-files
# Cloudformation stack name
STACK = sam-stereotype-stack
```

- `make compile`

Compile will run webpack and copy a `package.json` file located in the `./src/` directory into each `./dist/` directory. When using the bundled webpack.config your lambda's would be compiled into the following directory structure.

```bash
./dist
  ./testLambda
    ./index.js
    ./package.json
  ./anotherLambda
    ./index.js
    ./pacakge.json
```

- `make validate`

Validate will run `sam validate`

- `make build`

Build will run `sam build`. The build command assumes a `template.yaml` or `template.yml` file is in the project root.

- `make package`

Package will run `build` as well as `sam package` and output the template file to `deployment.yaml` 

- `make deploy`

Deploy will run `sam deploy` with the `deployment.yaml` to the defined stack name.

- `make push`

Push will run compile, validate, build, package, and deploy.

- `make down`

Down will delete the cloudformation stack.

### Webpack
Require the webpack.config.js to perform lambda packing.

```javascript
// webpack.config.js
module.exports = require('sam-stereotype/webpack.config');
``` 

The webpack configuration assumes there is a `./src/lambda` directory with single file lambda's. Each lambda is packaged into the `./dist/{fileName}` directory as `index.js`.

If you are using `make compile`, you need to create a `package.json` file in the `./src` directory to be included in each `./dist/{lambda}` directory. `package.json` is required in each dist directory for `package` to run properly.

Your `template.yaml` file can include the dist lambda:

```yaml
Resources:
  TestSNS:
    Type: AWS::Serverless::Function
    Properties:
      Runtime: nodejs8.10
      Handler: index.handler
      Description: Single SNS event handler test
      CodeUri: ./dist/testSns
      FunctionName: testSns
      Timeout: 15
```