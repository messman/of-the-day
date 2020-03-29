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

		private static Cell DailyFromCell = new Cell("Daily", 'A', 3);
		private static string ChecklistRangeText = new Cell("Checklist", 'A', 2).ToRange('B', 11).ToText();
		private static string KeyValRangeText = new Cell("KeyVal", 'A', 1).ToRange('B', 5).ToText();

		public async Task<OfTheDayData> OfTheDay(bool seeTomorrow)
		{
			try
			{
				SheetsService service = CreateService();
				int dayNumber = await DayNumber(service);

				int extraRows = 0;
				// Remove one for 0-based counting.
				int fromRowOffset = dayNumber - 1;
				// Remove another because we are getting yesterday as well.
				if (dayNumber > 1)
				{
					extraRows++;
					fromRowOffset--;
				}
				// Add one back if we are looking at tomorrow.
				if (seeTomorrow)
				{
					fromRowOffset++;
				}

				Cell dailyFromCell = DailyFromCell.Clone();
				dailyFromCell.Row += fromRowOffset;
				string dailyRangeText = dailyFromCell.ToRangeAdditive('M', extraRows).ToText();

				Cell musicFromCell = MusicFromCell.Clone();
				musicFromCell.Row += fromRowOffset;
				string musicRangeText = musicFromCell.ToRangeAdditive('M', extraRows).ToText();

				var request = service.Spreadsheets.Values.BatchGet(_sheetID);
				request.Ranges = new Repeatable<string>(new List<string>() { dailyRangeText, musicRangeText, ChecklistRangeText, KeyValRangeText });

				var response = await request.ExecuteAsync();
				var values = response.ValueRanges;

				var resultData = new OfTheDayData();

				// 0 and 1 - Day and Music records
				{
					var dayRecordsValues = values[0];
					ThrowIfEmptyResult(dayRecordsValues.Values, "day records");
					var musicRecordsValues = values[1];
					ThrowIfEmptyResult(musicRecordsValues.Values, "music records");

					int todayRecordIndex = 0;
					// If only one record, it's today (instead of including yesterday)
					if (dayRecordsValues.Values.Count > 1 && musicRecordsValues.Values.Count > 1)
					{
						resultData.Yesterday = DailyRecord.FromRow(dayRecordsValues.Values[0]);
						resultData.YesterdayMusic = MusicRecord.FromRow(musicRecordsValues.Values[0]);
						todayRecordIndex = 1;
					}
					resultData.Today = DailyRecord.FromRow(dayRecordsValues.Values[todayRecordIndex]);
					resultData.TodayMusic = MusicRecord.FromRow(musicRecordsValues.Values[todayRecordIndex]);
				}

				// 2 - Checklist records
				{
					var checklistRecordsValues = values[2];
					ThrowIfEmptyResult(checklistRecordsValues.Values, "checklist records");

					var toDo = new List<string>();
					var done = new List<string>();
					foreach (var row in checklistRecordsValues.Values)
					{
						var toDoItem = row.ToStringSafe(0);
						if (!string.IsNullOrEmpty(toDoItem))
						{
							toDo.Add(toDoItem);
						}
						var doneItem = row.ToStringSafe(1);
						if (!string.IsNullOrEmpty(doneItem))
						{
							done.Add(doneItem);
						}
					}
					resultData.ChecklistToDo = toDo;
					resultData.ChecklistDone = done;
				}

				// 3 - KeyVal records
				{
					var keyValRecordsValues = values[3];
					ThrowIfEmptyResult(keyValRecordsValues.Values, "keyVal records");
					resultData.KeyVal = KeyVal.FromRows(keyValRecordsValues.Values);
				}

				return resultData;
			}
			catch (Exception e)
			{
				_log.LogError(e, "Could not get all daily information");
				throw;
			}
		}

		private static Cell MusicFromCell = new Cell("Music", 'A', 3);
		public async Task<IEnumerable<MusicRecord>> AllMusic()
		{
			try
			{
				SheetsService service = CreateService();
				int dayNumber = await DayNumber(service);
				string range = MusicFromCell.ToRangeAdditive('M', dayNumber - 1).ToText();
				var response = await service.Spreadsheets.Values.Get(_sheetID, range).ExecuteAsync();
				ThrowIfEmptyResult(response.Values, "all music");

				return response.Values.Select(row => MusicRecord.FromRow(row));
			}
			catch (Exception e)
			{
				_log.LogError(e, "Could not get all music");
				throw;
			}
		}

		private static string DayNumberRangeText = new Cell("Daily", 'B', 1).ToText();
		private async Task<int> DayNumber(SheetsService service)
		{
			try
			{
				var response = await service.Spreadsheets.Values.Get(_sheetID, DayNumberRangeText).ExecuteAsync();
				ThrowIfEmptyResult(response.Values, "number of days");
				int dayNumber = ((string)response.Values[0][0]).TryParseInt(-1);
				if (dayNumber < 1)
				{
					throw new Exception($"Error retrieving number of days: {dayNumber}");
				}
				return dayNumber;
			}
			catch (Exception e)
			{
				_log.LogError(e, "Could not get number of days");
				throw;
			}
		}

		private static void ThrowIfEmptyResult<T>(IList<T> values, string dataType)
		{
			if (values == null || values.Count == 0)
			{
				throw new Exception($"Empty result when fetching {dataType}");
			}
		}
	}
}