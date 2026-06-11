using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data;

public class TodoDbContext : DbContext
{
    public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options) { }

    public DbSet<TodoItem> Todos => Set<TodoItem>();
}
