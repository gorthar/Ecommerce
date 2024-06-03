using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API;

[Route("api/errors")]
[ApiController]

public class ErrorsController : ControllerBase
{
    [HttpGet("not-found")]
    public ActionResult GetNotFoundRequest()
    {
        return NotFound();
    }

    [HttpGet("server-error")]
    public ActionResult GetServerError()
    {
        Console.WriteLine("********************This is a server error**********************");
        throw new Exception("This is a server error");

    }
    [HttpGet("bad-request")]
    public ActionResult GetBadRequest()
    {
        return BadRequest(new ProblemDetails
        {
            Status = 400,
            Title = "This is a bad request",
            Detail = "This is a bad request"
        });
    }
    [HttpGet("bad-request/{id}")]
    public ActionResult GetNotFoundRequest(int id)
    {
        return BadRequest("This is a bad with id");
    }

    [HttpGet("unauthorized")]
    public ActionResult GetUnauthorizedRequest()
    {
        return Unauthorized();
    }

    [HttpGet("validation-error")]
    public ActionResult GetValidationError()
    {
        ModelState.AddModelError("Name", "This field is required");
        ModelState.AddModelError("Price", "This field is required");
        ModelState.AddModelError("Description", "This field is required");
        ModelState.AddModelError("Category", "This field is required");
        ModelState.AddModelError("Brand", "This field is required");
        ModelState.AddModelError("Stock", "This field is required");
        ModelState.AddModelError("ProductType", "This field is required");
        ModelState.AddModelError("Password", "This field is required");
        return ValidationProblem();
    }

}
