using Microsoft.EntityFrameworkCore;
using Backend.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TodoDbContext>(opts =>
    opts.UseInMemoryDatabase("TodoDb"));
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();

app.Run();
