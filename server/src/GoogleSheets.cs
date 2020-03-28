using System;
using System.IO;
using System.Threading.Tasks;
using Google.Apis.Sheets.v4;
using Google.Apis.Auth.OAuth2;
using System.Threading;
using Google.Apis.Util.Store;
using Google.Apis.Services;
using Google.Apis.Sheets.v4.Data;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Google.Apis.Util;

namespace OfTheDay
{
	public class GoogleSheets
	{
		private readonly ILogger _log;
		public GoogleSheets(ILogger log, IConfiguration configuration)
		{
			_log = log;
		}

		static string[] Scopes = { SheetsService.Scope.SpreadsheetsReadonly };
		static string ApplicationName = "agm-OfTheDay";

		private SheetsService _sheetsService;
		private SheetsService CreateService()
		{
			if (_sheetsService != null)
			{
				return _sheetsService;
			}

			ServiceAccountCredential credential;

			string jsonFile = Settings.GoogleCredentialsJsonPath;
			using (var stream = new FileStream(jsonFile, FileMode.Open, FileAccess.Read))
			{
				credential = (ServiceAccountCredential)GoogleCredential.FromStream(stream).UnderlyingCredential;

				var initializer = new ServiceAccountCredential.Initializer(credential.Id)
				{
					User = Settings.GetValue(Settings.ServiceAccountAddressKey),
					Key = credential.Key,
					Scopes = Scopes
				};
				credential = new ServiceAccountCredential(initializer);
			}

			// Create Google Sheets API service.
			_sheetsService = new SheetsService(new BaseClientService.Initializer()
			{
				HttpClientInitializer = credential,
				ApplicationName = ApplicationName,
			});
			return _sheetsService;
		}

		public async Task<OfTheDayData> GetData()
		{
			SheetsService service = CreateService();
			string sheetID = Settings.GetValue(Settings.SheetIDKey);

			var request = service.Spreadsheets.Values.BatchGet(sheetID);
			request.Ranges = new Repeatable<string>(new List<string>() { "KeyVal!A1:C2", "KeyVal!A1:C2" });

			var response = await request.ExecuteAsync();
			var values = response.ValueRanges;

			return new OfTheDayData()
			{
				KeyVal = new KeyVal()
				{
					StartDate = DateTime.UtcNow
				}
			};
		}
	}
}