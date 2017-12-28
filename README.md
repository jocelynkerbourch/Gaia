# Gaia

![Gaia](https://s3.eu-west-3.amazonaws.com/botgaia/gaia_200px.png "Gaia")

#### Slack Bot for Heores.

## Commands

#### User commands

 - Ask 5 questions and give you advice
```
 > Give me a tips
```
 - Displays the list of features
```
> What are your features
```

#### Administrator commands

- Add a question
```
 > Add question
```
 - List all question
```
 > Give me the list of questions
```
- Add a tips
```
> Add tips
```
 - List all tips
```
 > Give me the list of tips
```
- Displays the usage stats of the bot
```
> Give me stats
```


## Develpement

- Slack connnection and scenario create with Converse.ai
	- [Converse.ai website](http://www.converse.ai/)

- BDD is aws DynamoDB 
	- [DynamoDB Console (eu west 3)](https://eu-west-3.console.aws.amazon.com/dynamodb/home?region=eu-west-3#tables:)
	- Schema
![DynamoDB Schema](https://s3.eu-west-3.amazonaws.com/botgaia/github/schema_db.png?v2 "DynamoDB Schema")

- Js Functions (NodeJs 6.1) is execute with less server aws Lambda
	- [Lambda Console (eu west 3)](https://eu-west-3.console.aws.amazon.com/lambda/home?region=eu-west-3#/functions)
	- [Lambda Best Practices](http://docs.aws.amazon.com/en_en/lambda/latest/dg/best-practices.html)

- End point is create with aws API Gateway
	- [AAPI Gateway Console (eu west 3)](https://eu-west-3.console.aws.amazon.com/apigateway/home?region=eu-west-3#/apis/nzsflv862b/resources)

- Assets in aws s3 buckets
	- [S3 Console (eu west 3)](https://s3.console.aws.amazon.com/s3/buckets/botgaia/?region=eu-west-3&tab=overview)
