using System;
using System.Collections.Generic;
using System.Linq;

namespace OfTheDay
{
	public class OfTheDayData
	{
		public KeyVal KeyVal { get; set; }

		public List<string> ChecklistDone { get; set; }
		public List<string> ChecklistToDo { get; set; }

		public List<DailyRecord> DailyRecords { get; set; }
		public List<MusicRecord> MusicRecords { get; set; }
	}

	public class KeyVal
	{
		public string ImportantInformation { get; set; }
		public string BadInformation { get; set; }
		public string StartDate { get; set; }
		public string WorkingOn { get; set; }
		public string LookingForwardTo { get; set; }

		public static KeyVal FromRows(IList<IList<object>> rows)
		{
			return new KeyVal()
			{
				ImportantInformation = rows.ElementAtOrDefault(0)?.ToStringSafe(1),
				BadInformation = rows.ElementAtOrDefault(1)?.ToStringSafe(1),
				StartDate = rows.ElementAtOrDefault(2)?.ToStringSafe(1),
				WorkingOn = rows.ElementAtOrDefault(3)?.ToStringSafe(1),
				LookingForwardTo = rows.ElementAtOrDefault(4)?.ToStringSafe(1)
			};
		}
	}

	public class SharedDayRecord
	{
		public string Day { get; set; }
		public string DayAsText { get; set; }
		public int DayNumber { get; set; }
		public string SpecialEvent { get; set; }
	}

	public class DailyRecord : SharedDayRecord
	{
		public string Location { get; set; }
		public string Note { get; set; }
		public string Schedule { get; set; }
		public string Quote { get; set; }
		public string QuoteBy { get; set; }
		public string YouTubeLink { get; set; }
		public string YouTubeLinkTitle { get; set; }
		public string YouTubeLinkDescription { get; set; }
		public string HowDidItGo { get; set; }

		public static DailyRecord FromRow(IList<object> row)
		{
			return new DailyRecord()
			{
				Day = row.ToStringSafe(0),
				DayAsText = row.ToStringSafe(1),
				DayNumber = row.ToStringSafe(2).TryParseInt(-1),
				SpecialEvent = row.ToStringSafe(3),

				Location = row.ToStringSafe(4),
				Note = row.ToStringSafe(5),
				Schedule = row.ToStringSafe(6),
				Quote = row.ToStringSafe(7),
				QuoteBy = row.ToStringSafe(8),
				YouTubeLink = row.ToStringSafe(9),
				YouTubeLinkTitle = row.ToStringSafe(10),
				YouTubeLinkDescription = row.ToStringSafe(11),
				HowDidItGo = row.ToStringSafe(12)
			};
		}
	}

	public class MusicRecord : SharedDayRecord
	{
		public bool IsFavorite { get; set; }
		public string Title { get; set; }
		public string Artist { get; set; }
		public string SpotifyLink { get; set; }
		public string YouTubeLink { get; set; }
		public bool IsYouTubePreferred { get; set; }
		public string GeniusLink { get; set; }
		public string Description { get; set; }
		public string Quote { get; set; }

		public static MusicRecord FromRow(IList<object> row)
		{
			return new MusicRecord()
			{
				Day = row.ToStringSafe(0),
				DayAsText = row.ToStringSafe(1),
				DayNumber = row.ToStringSafe(2).TryParseInt(-1),
				SpecialEvent = row.ToStringSafe(3),

				IsFavorite = !string.IsNullOrEmpty(row.ToStringSafe(4)),
				Title = row.ToStringSafe(5),
				Artist = row.ToStringSafe(6),
				SpotifyLink = row.ToStringSafe(7),
				YouTubeLink = row.ToStringSafe(8),
				IsYouTubePreferred = !string.IsNullOrEmpty(row.ToStringSafe(9)),
				GeniusLink = row.ToStringSafe(10),
				Description = row.ToStringSafe(11),
				Quote = row.ToStringSafe(12)
			};
		}
	}
}