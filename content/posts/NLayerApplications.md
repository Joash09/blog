+++
title = "Building N-layer applications with ORMs"
author = ["Joash Naidoo"]
date = 2021-09-09T00:00:00+02:00
tags = ["software", "architecture", "n-layer", "web"]
draft = false
+++

Software, especially in business, is almost always done with teams of developers. Software is only getting more complicated and with each developer producing hundreds of lines of code a day each addressing a different problem. It is easy to see how this will become difficult to manage. N-Layer applications is a software design pattern to separate the different "concerns" of an application into more organized layers.&nbsp;[^fn:1] Although, making applications modular is often a subconscious practice for developers, it is worthwhile to define a formal way as to how to separate the different concerns of the project.

<!--more-->

It is worth mentioning that the N-layer design pattern is a general guideline on how to architect your projects. It can be adapted to how your project works and for small projects it is often overkill. You may adopt a simpler 3-layer approach or simple MVC model, for instance. I am discussing these 5 layers as they are what I have been exposed to professionally.

In the case of a full stack web application we can divide the objectives into these categories:

| Layer                             | Description                                                                               |
|-----------------------------------|-------------------------------------------------------------------------------------------|
| Business (Core)                   | Defines the classes which you will use to model "business logic" (see below)              |
| Infrastructure (EntityFramework)  | Responsible for managing everything related to the database (Discussed further with ORMs) |
| Application Service (Application) | Mediates between the business logic and the presentation layer                            |
| Distributed Service (Web Host)    | Web API controllers are defined here (i.e. expose RESTful endpoints)                      |
| Presentation (Front-end)          | Front application which the user interacts with                                           |


### What is the difference between business, application and distributed service layers? {#what-is-the-difference-between-business-application-and-distributed-service-layers}

This boils down to what is meant by business logic. It is loosely defined on the internet, but an example of business logic, in my view, may be modeling a bank account as a class. Alongside the name and balance properties, a withdraw method could also defined to ensure the balance cannot fall below zero.

As the name suggests, the application layer implements logic relating to the functionality of the application itself. For instance a search function which joins and filters entities. Following the bank account example, creating a bank account requires creating a user account entity. On creation we may also want to send a one time pin to their email address for validation. The code to realize this will also be handled in the application layer.

Finally, the distributed service layer is where the controllers for the back end are defined. Another way of looking at the application service layer is as an abstraction which helps keep the controllers clean. Controllers should never be implementing any business/validation logic or be interacting with repositories directly.


### Brief intro to Object Relational Mappers (ORMs) {#brief-intro-to-object-relational-mappers--orms}

Object Orientated Programmers think in terms of objects. The objects are defined by classes which contain properties associated with the object. Relational Databases think in terms of tables of records. Each record has fields associated with that record.

Business applications require both relational databases to store the data as well as being able to convert that data to "code objects" so that the developers can use them in software. An Object Relational Mapper (ORM) tool which does exactly as the name suggests; map objects to relational records and vice versa. This tool hence can significantly simplify the life of the developers working with both code and relational data.

Here I will outline the basic procedure to get Microsoft’s [EntityFramework Core](https://docs.microsoft.com/en-us/ef/core/) (the open source version of the arguably most popular ORM tool: EntityFramework).
I will specifically look at how developers can define their relational data as object orientated classes and how the ORM automatically creates its corresponding database relations. Furthermore, I will be using a PostgreSQL database which requires the [Npgsql](https://www.npgsql.org/) add-on.


## N-Layer Project Setup {#n-layer-project-setup}

This write up will outline the process of creating a N-layer application from an empty ASP.NET project. Please note .NET 6 was used as of writing.


### Setup Project Structure {#setup-project-structure}

```bash
dotnet new web -o MyProject.Web.Host # Create a new ASP.NET Core project

dotnet new classlib -o <layer_name> # define Core, Application and Infrastructure layers
cd <layer_name>
dotnet add <this_project.csprj> reference <path/to/other_layer.csprj> # Reference to the other layers

dotnet tool install --global dotnet-ef # Download EntityFramework Core as a global tool (used across multiple projects)

# In Web.Host and EntityFramework project layers add the following packages
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL # Add support for PostgreSQL to EF Core
dotnet add package Microsoft.EntityFrameworkCore.Design
```


### Define entities. (An object which will have an associated table in database) {#define-entities-dot--an-object-which-will-have-an-associated-table-in-database}

Entities are defined in the Core layer. Each entity will have a corresponding class associated with it. Check the [documentation](https://www.npgsql.org/doc/types/basic.html) to see how C# types map to PostgreSQL types. For defining relationships between entities, see Section below.

```java
public class Blog {

        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }

        // Include other business logic here like constructors and methods for changing the specific property values
}
```


### Define DB context and register entities with DB context {#define-db-context-and-register-entities-with-db-context}

The infrastructure layer handles communication between the database and the application. In order to connect to the database, we must first define a database context. Within the database context, we also define the tables to be created using the entities defined in the domain layer. Any additional configuration, such as defining PostgreSQL enums or overriding property names or foreign keys are also defined here. In the infrastructure project, add the DbContext class below.

```java
using Microsoft.EntityFrameworkCore;
using MyProject.Core;

public class MyProjectDbContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }

    public MyProjectDbContext(DbContextOptions<MyProjectDbContext> options): base(options) {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        // Any additional information needed when creating database relations
    }
}
```


### Add DB context to services {#add-db-context-to-services}

Register the DBContext with the Web.Host application's Program.cs file. In order to connect to the database, ASP.NET looks for a connection string label (which you have defined) in the appsettings.json file in the root of the Web.Host project. At this point, you need to ensure that you have created database and updated your appsettings.json file accordingly.

```java
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MyProjectDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DBConnection")));

var app = builder.Build();
// ...
```

appsettings.json will include:

```json
{
  "ConnectionStrings": {
    "DBConnection": "Server=localhost;Database=myprojectdb;Port=5432;User Id=postgres;",
  },
}
```


### Manage Database Migrations {#manage-database-migrations}

Migrations are like version control for the structure of your database. Say you want to add a new column to a table, you would first create a migration with this change. The migration not only holds the code to update the table with your new column but also holds the code to roll back the database before the change was made; just in case something breaks. Migrations are represented as .cs program files in the EntityFramework layer under the ./Migrations folder. Creating a migration does not automatically change the database. These program files can be inspected and manually altered, if needs be, before applying the migration.

```bash
dotnet ef migrations add <Name of Migration> -s ../MyProject.Web.Host # add migration with defining startup project
dotnet ef database update -s ../MyProject.Web.Host # update database pointing to startup project
```


#### Rolling back migrations {#rolling-back-migrations}

If you apply a migration and decide you want to revert it, see the following steps. Also be aware of destructive database changes such as removing a column or altering its type. Once the data is lost it cannot be recovered.

```bash
dotnet ef migrations list # list all migrations applied and pending
dotnet ef database update <previous_migration> # Update the database to any previous migration desired
dotnet ef migration remove # Remove last create migration. You can only remove migrations one at a time
```


### Creating repository blueprint {#creating-repository-blueprint}

It should be noted you definitely can interact directly with the database just with the DBContext but creating an additional repository abstraction for database interactions is a [recommended](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-implementation-entity-framework-core#using-a-custom-repository-versus-using-ef-dbcontext-directly) design pattern. You would rather have a layer that sits between you and the actual database access so that when you are interacting with the database you do not need to worry about implementing the connection to the database each time. Implementing a repository starts by implementing an abstract RepositoryBase class, as shown below. Methods may be added as you see fit. We'll see how to actually use the repository pattern for a specific entity in the next section.

```java
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

// Code adapted from https://code-maze.com/net-core-web-development-part4/
public abstract class RepositoryBase<T> where T: class{

    private readonly MyProjectDbContext _context;

    public RepositoryBase(MyProjectDbContext context) {
        _context = context;
    }

    public IQueryable<T> FindAll() {
        return _context.Set<T>().AsNoTracking();
    }

    public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression) {
        return _context.Set<T>().Where(expression).AsNoTracking();
    }

    public T Create(T entity) {
        return _context.Set<T>().Add(entity).Entity;
    }

    public void Update(T entity) {
        _context.Set<T>().Update(entity);
    }

    public void Delete(T entity){
        _context.Set<T>().Remove(entity);
    }

}
```


### Implementing repository in application service layer {#implementing-repository-in-application-service-layer}

The application layer mediates between the presentation layer and the business logic.

What are dependency injections? This is a technique whereby a class requests dependencies (other objects) which are instantiated as **singletons.** This is useful as it removes the requesting object’s responsibility of managing those dependencies themselves.

```java
public class BlogApplicationService {

    private readonly RepositoryBase<Blog> _blogRepository;

    public BlogApplicationService(RepositoryBase<Blog> blogRepository) {
        _blogRepository = blogRepository;
    }

    public Blog Create(Blog newBlog) {
        // Any application logic can be inserted here
        // Silly examples include ensuring there is only one blog posted per day
        var createdBlog = _blogRepository.Create(newBlog);
        // Or after creating call external service to notify subscribe users
        return createdBlog;
    }

    public Blog? Get(int id) {
        return _blogRepository.FindByCondition(b => b.BlogId == id).FirstOrDefault();
    }
}
```


### Data Transfer Objects (DTOs) and AutoMapper {#data-transfer-objects--dtos--and-automapper}

It should be apparent that sending "raw" entities to the API poses a security risk. Consider for example a User entity with a password field which we don't want to pass to the presentation layer when fetching a user profile. To implement **data hiding**, we implement Data Transfer Objects which contain only the relevant information we want to pass to the presentation layer and omitting the rest.

Following this, we see DTOs are tightly related to the entities themselves. Data we want to include in the DTO will probably share the same property name as the entity. AutoMapper is a package which makes the conversion between DTOs and entities easier by matching property names or custom defined rules defined in a mapping profile.

Install the AutoMapper tool:

```bash
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection # install in the application service layer
```

Create mapping profile. The simplest is letting AutoMapper automatically match the name of the object properties to convert types. It is possible to create any custom configuration you may desire. Below we create a profile for mapping a Blog object to a BlogDto object, both of which is defined in the application service layer.

```java
public class BlogDto {
        // Omitting the ID property
        public string Title { get; set; }
        public string Body { get; set; }
}
```

```java
using AutoMapper;

public class BlogProfile : Profile {
    public BlogProfile() {
        CreateMap<BlogDto, Blog>() // CreateMap<destination, source>
            .ReverseMap(); // Let the mapping work both ways (i.e. from BlogDto to Blog)
    }
}
```

We must register the AutoMapper profiles with the main application (i.e. Web Host's Program.cs)

```java
using AutoMapper;

var builder = WebApplication.CreateBuilder(args);
// ...

// AutoMapper
var config = new MapperConfiguration(cfg => {
    cfg.AddProfile(new BlogProfile()); // Profile defined in application layer
});
var mapper = config.CreateMapper();
builder.Services.AddSingleton(mapper);

// ...
var app = builder.Build();
// ...
```

Lastly, update application service to return DTO opposed to "raw" entity. Mapping is done by injecting the IMapper interface and calling .Map&lt;destination&gt;(source)

```java
using AutoMapper;

public class BlogApplicationService {

    private readonly IMapper _mapper;
    private readonly RepositoryBase<Blog> _blogRepository;

    public BlogApplicationService(
        IMapper mapper,
        RepositoryBase<Blog> blogRepository
    ) {
        _mapper = mapper;
        _blogRepository = blogRepository;
    }

    public BlogDto Create(BlogDto newBlog) {

        // Any application logic can be inserted here
        // Silly examples include ensuring there is only one blog posted per day

        var createdBlog = _blogRepository.Create(_mapper.Map<Blog>(newBlog));

        // Or after creating call external service to notify subscribe users

        return _mapper.Map<BlogDto>(createdBlog);

    }

    public BlogDto? Get(int id) {
        var blog = _blogRepository.FindByCondition(b => b.BlogId == id).FirstOrDefault();
        return _mapper.Map<BlogDto>(blog);
    }

}
```


### Creating controllers {#creating-controllers}

The presentation layer exposes RESTful endpoints for which our front end will use to interact with the rest of the back end. The controller will specifically call the appropriate application service method and implement not business logic. Also remember the controller will only work with DTOs for data hiding.

Despite having a clean controller, you may still feel the separation of the application service and the distributed service layers unnecessary. I do too. The AspBoilerplate project has an automatic way of registering the application service methods as controllers as well but implementing this is outside the scope of this write up.

```java
using Microsoft.AspNetCore.Mvc;

[Route("api/blog")]
[ApiController]
public class BlogController : ControllerBase {

    private readonly BlogApplicationService _blogApplicationService;

    public BlogController(BlogApplicationService blogApplicationService) {
        _blogApplicationService = blogApplicationService;
    }

    [HttpPost]
    public BlogDto Create(BlogDto blog) {
        return _blogApplicationService.Create(blog); // Clean controller with application logic in application service layer
    }

    [HttpGet("{id}")]
    public BlogDto? GetBlog(int id) {
        return _blogApplicationService.Get(id);
    }

}
```


### Enabling SwaggerUI {#enabling-swaggerui}

The API endpoints exposed is to be used by the front end application. It is important for these APIs to be thoroughly documented for the front end team to use it. SwaggerUI facilitates this process by providing a web based page describing each of the endpoints, their input parameters and return values. Furthermore, it is possible to "try out" these endpoints within the web browser without a front end application developed yet.

SwaggerUI is part of the ASP.NET's Swashbuckle tooling for the OpenAPI specification. Alongside the Swashbuckle implementation of the OpenAPI specification, NSWAG is another implementation that could be used by the front end to automatically generate code to consume our API. This will not be covered here.

[Documentation](https://docs.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-6.0&tabs=netcore-cli) for enabling Swashbuckle's SwaggerUI is summarized as follows:

```bash
dotnet add package Swashbuckle.AspNetCore # add to Web Host layer
```

Register Swashbuckle as a service in Program.cs

```java
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<MyProjectDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("BloggingContext")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(); // <--- register as service

var app = builder.Build();

// VVV enable SwaggerUI for development environments
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI(options => {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
            options.RoutePrefix = string.Empty;
    }); // <-- options to serve SwaggerUI documentation on URL root
}

// ...

app.Run();
```


### Final project structure {#final-project-structure}

```bash
NLayerTutorial/
├── MyProject.Application
│   ├── Blogs
│   │   ├── BlogApplicationService.cs
│   │   ├── DTO
│   │   │   └── BlogDto.cs
│   │   └── MappingProfiles
│   │       └── BlogProfile.cs
│   ├── MyProject.Application.csproj
├── MyProject.Core
│   ├── Entities
│   │   └── Blog.cs
│   ├── MyProject.Core.csproj
├── MyProject.Infrastructure
│   ├── Migrations
│   │   ├── 20220811131745_Init.cs
│   │   ├── 20220811131745_Init.Designer.cs
│   │   └── MyProjectDbContextModelSnapshot.cs
│   ├── MyProjectDbContext.cs
│   ├── MyProject.Infrastructure.csproj
│   └── Repositories
│       ├── IRepository.cs
│       └── RepositoryBase.cs
└── MyProject.Web.Host
    ├── appsettings.Development.json
    ├── appsettings.json
    ├── Controllers
    │   └── BlogController.cs
    ├── MyProject.Web.Host.csproj
    ├── Program.cs
    └── Properties
        └── launchSettings.json
```


## Defining different types of relations with EntityFramework {#defining-different-types-of-relations-with-entityframework}

Earlier, we created an entity which has no relationship with any other entity. In relational database design there are three types of relationships between entities (tables). They are defined as follows:


### One to one {#one-to-one}

```java
public class EntityA {
        Public int id { get; set; }
        Public string name { get; set; }
}
public class EntityB {
        Public int id { get; set; }
        Public string name { get; set; }
}
```


### One to many {#one-to-many}

```java
public class EntityA {
        Public int id { get; set; }
        Public string name { get; set; }
}

public class EntityB {
        Public int id { get; set; }
        Public string name { get; set; }
        Public IList<EntityA> CollectionOfEntities { get; set; }
}
```


### Many to Many. {#many-to-many-dot}

Note: EntityFramework Core does not support this relationship out of the box. Instead we can get around this by creating 2 one to many relationships in both ways. Furthermore an intermediary entity will need to be created to represent the “joining table” required for a many to many relationship.

```java
public class EntityA {
        Public int id { get; set; }
        Public string name { get; set; }
        Public IList<EntityAEntityB> CollectionOfEntitiesB { get; set; }
}

public class EntityB {
        Public int id { get; set; }
        Public string name { get; set; }
        Public IList<EntityAEntityB> CollectionOfEntitiesA { get; set; }
}

public class EntityAEntityB { }
```


## Additional Resources {#additional-resources}

-   Framework N-Tier web application design with ASP.NET Core: <https://aspnetboilerplate.com/Pages/Documents/NLayer-Architecture>
-   Repository Pattern: <https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design>

[^fn:1]: Layers and Tiers are often used interchangeably, however tiers are used to denoted a physical separation (i.e. different parts of the application running on different hardware) versus a logical separation.
