using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace OfTheDay
{
	public class HttpOfTheDay
	{
		private readonly GoogleSheets _googleSheets;

		public HttpOfTheDay(GoogleSheets googleSheets)
		{
			_googleSheets = googleSheets;
		}

		[FunctionName("OfTheDay")]
		public async Task<IActionResult> Run(
			[HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
			ILogger log)
		{
			log.LogInformation("C# HTTP trigger function processed a request.");

			await _googleSheets.GetData();

			string responseMessage = "Hello, World!";
			return new OkObjectResult(responseMessage);
		}
	}
}
