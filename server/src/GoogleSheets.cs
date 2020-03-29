using System;
using System.IO;
using System.Threading.Tasks;
using Google.Apis.Sheets.v4;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Google.Apis.Util;
using System.Linq;

namespace OfTheDay
{
	public class GoogleSheets
	{
		private readonly ILogger _log;
		private readonly string _sheetID;
		public GoogleSheets(ILogger log)
		{
			_log = log;
			_sheetID = Settings.GetValue(Settings.SheetIDKey);
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

		public async Task<OfTheDayData> OfTheDay()
		{
			SheetsService service = CreateService();
			var request = service.Spreadsheets.Values.BatchGet(_sheetID);
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

		private static Cell AllMusicFromCell = new Cell("Music", 'A', 3);
		public async Task<IEnumerable<MusicRecord>> AllMusic()
		{
			try
			{
				SheetsService service = CreateService();
				int numberOfDays = await NumberOfDays(service);
				string range = AllMusicFromCell.ToRange('M', numberOfDays).ToText();
				var response = await service.Spreadsheets.Values.Get(_sheetID, range).ExecuteAsync();
				if (response.Values == null || response.Values.Count == 0)
				{
					throw new Exception($"Empty result when fetching all music");
				}

				return response.Values.Select(row => MusicRecord.FromRow(row));
			}
			catch (Exception e)
			{
				_log.LogError(e, "Could not get all music");
				throw;
			}
		}

		private static string NumberOfDaysRangeText = new Cell("Daily", 'B', 1).ToText();
		private async Task<int> NumberOfDays(SheetsService service)
		{
			try
			{
				var response = await service.Spreadsheets.Values.Get(_sheetID, NumberOfDaysRangeText).ExecuteAsync();
				if (response.Values == null || response.Values.Count == 0)
				{
					throw new Exception($"Empty result when fetching number of days");
				}
				int numberOfDays = ((string)response.Values[0][0]).TryParse(-1);
				if (numberOfDays < 1)
				{
					throw new Exception($"Error retrieving number of days: {numberOfDays}");
				}
				return numberOfDays;
			}
			catch (Exception e)
			{
				_log.LogError(e, "Could not get number of days");
				throw;
			}
		}
	}
}