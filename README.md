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
	- [Converse.ai website](https://www.converse.ai)

- BDD is aws DynamoDB 
	- [DynamoDB Console](https://)
	- Schema
![DynamoDB Schema](https://s3.eu-west-3.amazonaws.com/botgaia/github/schema_db.png "DynamoDB Schema")

- Js Functions (NodeJs 6.1) is execute with less server aws Lambda
	- [Lambda Console](https://)
	- [Lambda Best Practices](http://docs.aws.amazon.com/en_en/lambda/latest/dg/best-practices.html)

- End point is create with aws Apigateway
	- [Apigateway Console](https://)
