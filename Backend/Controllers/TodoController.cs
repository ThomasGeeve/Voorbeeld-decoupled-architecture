using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Route("api/todos")]
public class TodoController(TodoDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<TodoItem>>> GetAll()
    {
        return await db.Todos.OrderBy(t => t.CreatedAt).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetById(int id)
    {
        var todo = await db.Todos.FindAsync(id);
        if (todo is null) return NotFound();
        return todo;
    }

    [HttpPost]
    public async Task<ActionResult<TodoItem>> Create(TodoItem todo)
    {
        todo.Id = 0;
        todo.CreatedAt = DateTime.UtcNow;
        db.Todos.Add(todo);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = todo.Id }, todo);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, TodoItem updated)
    {
        var todo = await db.Todos.FindAsync(id);
        if (todo is null) return NotFound();

        todo.Title = updated.Title;
        todo.IsCompleted = updated.IsCompleted;
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var todo = await db.Todos.FindAsync(id);
        if (todo is null) return NotFound();

        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
