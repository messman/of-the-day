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
		private readonly ILogger<HttpFunctions> _log;

		public HttpFunctions(GoogleSheets googleSheets, ILogger<HttpFunctions> log)
		{
			_googleSheets = googleSheets;
			_log = log;
		}

		[FunctionName("OfTheDay")]
		public async Task<IActionResult> OfTheDay([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req)
		{
			bool seeTomorrow = req.Query["tomorrow"] == "1";
			var data = await _googleSheets.OfTheDay(seeTomorrow);
			_log.LogInformation("Query for OfTheDay - SeeTomorrow={seeTomorrow}", seeTomorrow);
			return new OkObjectResult(data);
		}

		[FunctionName("AllMusic")]
		public async Task<IActionResult> AllMusic([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req)
		{
			var records = await _googleSheets.AllMusic();
			_log.LogInformation("Query for AllMusic");
			return new OkObjectResult(records);
		}
	}
}
