using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace OfTheDay
{
	public class HttpFunctions
	{
		private readonly GoogleSheets _googleSheets;

		public HttpFunctions(GoogleSheets googleSheets)
		{
			_googleSheets = googleSheets;
		}

		[FunctionName("OfTheDay")]
		public async Task<IActionResult> OfTheDay([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req, ILogger log)
		{
			log.LogInformation("C# HTTP trigger function processed a request.");

			await _googleSheets.OfTheDay();

			string responseMessage = "Hello, World!";
			return new OkObjectResult(responseMessage);
		}

		[FunctionName("AllMusic")]
		public async Task<IActionResult> AllMusic([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req, ILogger log)
		{
			var records = await _googleSheets.AllMusic();
			return new OkObjectResult(records);
		}
	}
}
