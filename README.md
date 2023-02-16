# GraphQL API

## Getting started

To start the API locally run the following command:

```
$> npm install && &&npm build && npm start
```

You can also run it in dev mode:

```
$> npm install && npm run dev
```

Or you can use docker-compose directly:

```
$> docker-compose up
```

Once it's up and running, you can access explorer from [Apollo Server]() at the
address on which the server runs and start to explore the schema.

## Context

This API demonstrates some ways to layer an application with GraphQL. It's
important to keep the separation of concerns in mind when working with software
design. It has many advantages, some of the notable ones are:

- It keeps your code concise and easy to understand for other developers
- It's better to map domain (business) knowledge
- It makes it less prone to bugs since every piece of code has its own
  responsibility
- It's easier to write relevant unit tests and get to a high percentage of
  coverage

## Capabilities

This API has the following capabilities:

- GraphQL server
- Logging with Winston and integrated with google cloud logging
- Tracing with open telemetry and integrated with google cloud tracer
- Healthcheck with Terminus
- In-memory data store for the data it serves

## Architecture

This architecture is influenced by Uncle Bob's Clean architecture and also
Domain Driven Design, if you never heard of these I strongly encourage you to
jump into it.

Here's a quick rundown of the different layers:

- `api`: the root directory of the implementation of the API
- `api/common`: this directory, although named vaguely, contains some common
  types and helper functions reused across the modules of the application.
- `api/infrastructure`: this module contains all the code related to 3rd party
  dependencies such as database, logging, tracing, etc...
- `api/domain`: is where all the code related to the domain this API handles
  lives. You will find entity definitions, services implementing the logic and
  repository interfaces defining what needs to be accessed from the storage.
- `api/adapters`: this directory contains the specific implementations for
  repositories and other relevant interfaces.
- `api/transport`: this is where the transport layer implementation lives. In
  this example there's only one which is GraphQL, but it's possible to split it
  into different ones if you want to add another transport capability such as a
  REST API or a gRPC server.

It's important to restrict the layers to specific aspects of your application.
On thing I find hard when a project is growing is to make sure responsibilities
don't get mixed. Having a proper file structure in addition to a good
understanding of the context and the role of the service will make it easier to
keep that in check. It might also be a sign that your application's
responsibility is not clear enough and might have to be broken down to smaller
pieces or redefined.

### Resource identifier

One thing to notice is the `api/common/id.ts` file. This file defines a unique
type of resource identifier to be used across the layers. The reason behind this
is that depending on your data storage, identifiers might have specificities
that make it impossible to use without platform specific code. Having this
"translation" layer makes it possible to abstract that logic and use it
transparently across the layers.

This might not be a textbook practice, but identifiers will be essential within
your infrastructure no matter where and how your data is stored.

## Working with GraphQL

GraphQL makes it easy to work with TypeScript, it offers code generation
capabilities that help keep your server and client implementation consistent,
avoiding runtime errors thanks to transpilation errors that'd flag any issues
beforehand.

To handle code generation, the [graphql-codegen]() CLI is making it easy to
generate types for your types and resolvers. Once you made changes to the schema
and your server is running, you can run:

```
$> npm run codegen
```

This will update the generated types and let you know if there are any breaking
changes in your code.

### Error handling

Error handling in GraphQL can be tricky, one way to do it is to create unions
for your returned types like so:

```graphql
  type ErrorUserNotFound {
    message: String!
  }

  type User {
    id: String!
    firstName: String!
    lastName: String!
  }

  type UserResponse = User | ErrorUserNotFound

  type Query {
    user(id: String!): UserResponse
  }
```

## Possible improvements

There are many ways to improve this service, a non-exhaustive list would be:

- Separate the resolvers and schemas into individual files: in my opinion,
  resolvers should be as small as possible, so having them separated by entity
  instead of individual files can also be a valid way to do it, it makes it
  easier to open it and understand what it does all in one place.
- Better test coverage with e2e testing. It's omitted here because it's not the
  focus of this demonstration.
