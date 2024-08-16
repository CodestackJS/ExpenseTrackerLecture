using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : ControllerBase
    {

        private readonly AppDbContext _context;

        public ExpenseController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<IEnumerable<Expense>> GetExpense()
        {
            var expenses = await _context.Expenses.AsNoTracking().ToListAsync();
            return expenses;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Expense expense)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _context.Expenses.AddAsync(expense);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateExpense(int id, Expense expense)
        {
            if(id != expense.Id)
            {
                return BadRequest();
            }
            _context.Entry(expense).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok();
        }
        
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteExpense(int id)  
        {
            var expense = await _context.Expenses.FindAsync(id);

            if (expense is null)
            {
                return NotFound();
            }

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();
            return Ok(expense);
        }



    }

}